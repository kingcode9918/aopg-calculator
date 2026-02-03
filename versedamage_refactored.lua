--[[
	VERSED DAMAGE SYSTEM - REFACTORED

	This module handles all damage calculations for the game, including:
	- Base damage calculations with Haki modifiers
	- Title-based damage buffs and debuffs
	- Race-specific modifiers and effects
	- Mode transformations (Berserk, Kaioken, etc.)
	- Equipment and accessory bonuses
	- Status effects (burn, freeze, bleed, etc.)
	- Counter mechanics
	- Reward and quest tracking
]]

local DamageModule = {}

-- ============================================================================
-- SERVICES AND DEPENDENCIES
-- ============================================================================

local rs = game:GetService("ReplicatedStorage")

local hitbox = require(game.ServerScriptService.Hitbox.Main)
local sounds = require(game.ReplicatedStorage.Modules:FindFirstChild("SoundHandler"))
local TitleNewTable = require(rs.Modules.NewTitles)
local DamageBuff = require(script.DamageBuffs)

-- ============================================================================
-- CONSTANTS
-- ============================================================================

-- Damage Type Constants
local DAMAGE_TYPE = {
	SWORD = "Sword",
	SPECIAL = "Special",
	STRENGTH = "Strength"
}

-- Mode Damage Multipliers
local MODE_MULTIPLIERS = {
	BERSERK = 1.25,
	KAIOKEN = 1.45,
	TRANSPARENT_WORLD = 2,
	PLATINUM_DRAGON_LORD_C = 2,
	RAGNA_MODE = 1.20,
	ADOLLA_LINK = 1.75,
	LEGENDARY_SAIYAN = 3.75,
	SANJI_MODE_WITH_SANJI = 1.35,
	RUBBER_MODE_SPECIAL = 1.3,
	THE_KNIGHT_MODE_SPECIAL = 1.3,
	GUTS_MODE_SWORD_STRENGTH = 1.7,
	PADORU_V2_MODE = 1.75,
	FEMTO_MODE_SWORD_STRENGTH = 2,
	ICHIGO_MODE = 1.2
}

-- Title-Based Damage Multipliers (Offensive)
local TITLE_OFFENSE_MULTIPLIERS = {
	["Ruler of Death"] = {Special = 2.15},
	["Destruction King"] = {Special = 2},
	["The Legendary Super Saiyan"] = {Special = 1.95},
	["God of Gods"] = {Sword = 1.70, Special = 1.85},
	["Emperor Of Roses"] = {Special = 2.05},
	["Emperor Of Dreams"] = {Special = 2.05},
	["Bloody Moon"] = {Sword = 1.90},
	["Knight King"] = {Sword = 1.85},
	["10th Division Captain"] = {Sword = 1.5},
	["Corrupted Savior"] = {Sword = 1.90, Special = 1.90},
	["The Bird Of Hermes"] = {Sword = 1.85, Strength = 1.90},
	["Silver Sword Saint Reaper"] = {Sword = 2},
	["Hero Of Wrought"] = {Sword = 1.25},
	["Pirate Hunter"] = {Sword = 1.35},
	["Dark Slayer"] = {Sword = 1.45, Strength = 1.70},
	["Upper Rank Three"] = {Strength = 1.75},
	["The Struggler"] = {Sword = 1.55, Strength = 1.60},
	["Falcon of Darkness"] = {Sword = 1.50, Special = 1.50},
	["SSS+ Rank Master"] = {All = 1.15},
	["Sternritter A"] = {Sword = 1.3, Special = 1.1},
	["Over Heaven"] = {Special = 1.5},
	["Infernal Punk Marine"] = {Special = 1.2},
	["Devil's Footprints"] = {Special = 1.85},
	["Future Pirate King"] = {Special = 1.4},
	["The Starving Skeleton"] = {Sword = 1.4},
	["Easter Master"] = {Special = 1.4}
}

-- Title-Based Damage Resistance (Defensive)
local TITLE_DEFENSE_MULTIPLIERS = {
	["Ruler of Death"] = 0.60,
	["Over Heaven"] = 0.80,
	["Bloody Moon"] = 1.30,
	["Knight King"] = 1.20,
	["Jack Of All Flame"] = 1.80,
	["Black Leg"] = 0.70,
	["Emperor Of Dreams"] = 0.50,
	["The Bird Of Hermes"] = 0.50,
	["Devil's Footprints"] = 0.50,
	["Destruction King"] = 1.50,
	["The Legendary Super Saiyan"] = 0.50,
	["Silver Sword Saint Reaper"] = 0.25,
	["10th Division Captain"] = 0.60,
	["Pirate Hunter"] = 0.85,
	["Upper Rank Three"] = 0.80,
	["Future Pirate King"] = 0.80,
	["GutsMode"] = 0.20
}

-- Equipment Damage Multipliers
local EQUIPMENT_MULTIPLIERS = {
	["Momonga's Red Orb"] = {Special = 1.75},
	["Brand of Sacrifice"] = {Strength = 1.5, DefenseTaken = 1.40},
	["Black Leg"] = {Strength = 1.75},
	["Golden Earrings"] = {All = 1.25},
	["Kamish Necklace"] = {Sword = 1.4},
	["John-Smith Mask"] = {Special = 1.4},
	["Ashen Ring"] = {Sword = 1.7}
}

-- Race Damage Multipliers (Offensive)
local RACE_OFFENSE_MULTIPLIERS = {
	Demonic = 1.75,
	Vampire = 1.7,
	Truthseeker = 2.5,
	Arrancar = {Special = 1.5},
	Reaper = {Sword = 1.5},
	Angelica = 1.25,
	Vessel = 1.5,
	Dullahan = {Day = 0.667, Night = 2}, -- 1/1.5 for day, 2 for night
	Dragonic = 2.25,
	Contractor = 2,
	["Fallen Angel"] = 2.75,
	Ghoul = 2.5,
	Player = function(systemLevel) return 1 + (0.03 * systemLevel) end,
	Mahoraga = 2.75,
	Birkan = 2.85
}

-- Race Damage Resistance (Defensive)
local RACE_DEFENSE_DIVISORS = {
	Quincy = {Stat0 = 66.5, StatPlus = 1.5},
	Saiya = {Stat0 = 68.5, StatPlus = 3.5},
	["Half Cyborg"] = {Stat0 = 69, StatPlus = 4},
	Slime = {Stat0 = 70, StatPlus = 5},
	Shadow = {Stat0 = 0.01, StatPlus = 100} -- Special: heals instead
}

-- Wisp Type Multipliers
local WISP_MULTIPLIERS = {
	Warrior = {Sword = 1.15, Strength = 1.15},
	Mage = {Special = 1.35},
	Ultimatum = {All = 1.25}
}

-- Damage Over Time Constants
local DOT_CONFIG = {
	BURN_TICKS = 5,
	BURN_TICK_INTERVAL = 0.5,
	FREEZE_DURATION = 3,
	BLEED_TICKS = 5,
	BLEED_TICK_INTERVAL = 0.5,
	CUTTING_TICKS = 5,
	CUTTING_TICK_INTERVAL = 0.05
}

-- Haki Constants
local HAKI_CONFIG = {
	BASE_MULTIPLIER = 1.25,
	GRADE_BONUS = 0.15,
	SPECIAL_GRADE_BONUS = 0.10
}

-- Boss Lists for Quest Tracking
local BOSS_LISTS = {
	FIRE_BASED_SKILLS = {
		"Shinra Kusakabe", "Arthur Boyle", "Flame", "Flame [Cyan]",
		"Magma", "Tanjiro", "Rengoku", "Yoriichi", "Sanji", "Benimaru", "Joker"
	},
	CORRUPTED_BOSSES = {
		"Sukuna", "Gojo", "Toji", "Saber", "Starkk", "Maki",
		"Corrupted Sukuna", "Corrupted Gojo", "Corrupted Toji",
		"Corrupted Saber", "Corrupted Starkk", "Corrupted Maki"
	},
	FIRE_QUEST_BOSSES = {"Shinra", "Joker", "Benimaru"},
	PADORU_BOSSES = {
		["Ragna"] = "Ragna",
		["Enels"] = "Enel",
		["Son Of Rowan"] = "Son Of Rowan [Lv.???]",
		["Gilgamesh's"] = "Gilgamesh [Lv.???]",
		["King Of Curses"] = "King Of Curses [Lv.???]",
		["Gojos"] = "Gojo [Lv.???]",
		["Hakaris"] = "Hakari Gambler [Lv.???]",
		["Anos"] = "Anos",
		["Demon Anos"] = "Demon Anos",
		["Evil Eyes"] = "Evil Eyes [Lv.???]",
		["TYBW Ichigos"] = "Ichigo TYBW"
	}
}

-- ============================================================================
-- HELPER FUNCTIONS - PLAYER DATA ACCESS
-- ============================================================================

-- Safely get player from character
local function getPlayer(char)
	return game.Players:GetPlayerFromCharacter(char)
end

-- Get player data hierarchy
local function getPlayerData(player)
	if not player then return nil end
	return player:FindFirstChild("PlayerData")
end

local function getPlayerInfo(playerData)
	if not playerData then return nil end
	return playerData:FindFirstChild("Info")
end

local function getPlayerStats(playerData)
	if not playerData then return nil end
	return playerData:FindFirstChild("Stats")
end

local function getPlayerBuffs(playerData)
	if not playerData then return nil end
	return {
		buff = playerData:FindFirstChild("Buff"),
		buff2 = playerData:FindFirstChild("Buff2"),
		buff3 = playerData:FindFirstChild("Buff3")
	}
end

-- Get title value
local function getTitle(playerInfo)
	if not playerInfo then return nil end
	local titleValue = playerInfo:FindFirstChild("Title")
	return titleValue and titleValue.Value or nil
end

-- Get race value
local function getRace(playerData)
	if not playerData then return nil end
	local raceValue = playerData:FindFirstChild("Race")
	return raceValue and raceValue.Value or nil
end

-- Get equipment value
local function getEquipment(playerData)
	if not playerData then return nil end
	local equipValue = playerData:FindFirstChild("Equipment")
	return equipValue and equipValue.Value or nil
end

-- Get wisp type value
local function getWispType(playerData)
	if not playerData then return nil end
	local wispValue = playerData:FindFirstChild("Wisp Type")
	return wispValue and wispValue.Value or nil
end

-- ============================================================================
-- HELPER FUNCTIONS - DAMAGE CALCULATION
-- ============================================================================

-- Calculate base damage with Haki modifier
local function calculateBaseDamage(damage, char, info, playerData, hakiGradeMultiplier)
	if not info then return damage end

	local damageMultiplier = info:FindFirstChild("Damage Multiplier")
	local damageMultiplier2 = info:FindFirstChild("Damage Multiplier 2")

	if not damageMultiplier or not damageMultiplier2 then return damage end

	local totalMultiplier = damageMultiplier.Value + damageMultiplier2.Value

	if char:FindFirstChild("HakiActive") then
		local hakiGrade = playerData and playerData:FindFirstChild("Haki Grade")
		local gradeValue = hakiGrade and hakiGrade.Value or 0
		return damage * totalMultiplier * HAKI_CONFIG.BASE_MULTIPLIER + (hakiGradeMultiplier * gradeValue)
	else
		return damage * totalMultiplier
	end
end

-- Calculate stat-based damage (when stats > 0)
local function calculateStatDamage(damage, val, stat, buffs, char, info, playerData)
	if not stat or not buffs or not info then return damage end

	local statValue = stat:FindFirstChild(val)
	if not statValue then return damage end

	local buff1 = buffs.buff and buffs.buff:FindFirstChild(val.." Buff")
	local buff2 = buffs.buff2 and buffs.buff2:FindFirstChild(val.." Buff2")
	local buff3 = buffs.buff3 and buffs.buff3:FindFirstChild(val.." Buff3")

	local totalStat = statValue.Value
	if buff1 then totalStat = totalStat + buff1.Value end
	if buff2 then totalStat = totalStat + buff2.Value end
	if buff3 then totalStat = totalStat + buff3.Value end

	local damageWithStats = damage + (damage * (totalStat / 75))

	return calculateBaseDamage(damageWithStats, char, info, playerData, 0.15)
end

-- ============================================================================
-- HELPER FUNCTIONS - MULTIPLIER APPLICATION
-- ============================================================================

-- Apply title-based offensive multipliers
local function applyTitleOffenseMultipliers(damage, title, damageType)
	if not title or not TITLE_OFFENSE_MULTIPLIERS[title] then return damage end

	local multipliers = TITLE_OFFENSE_MULTIPLIERS[title]

	-- Check specific damage type
	if multipliers[damageType] then
		damage = damage * multipliers[damageType]
	end

	-- Check for "All" damage types
	if multipliers.All then
		damage = damage * multipliers.All
	end

	return damage
end

-- Apply title-based defensive multipliers (for enemy)
local function applyTitleDefenseMultipliers(damage, enemyTitle)
	if not enemyTitle or not TITLE_DEFENSE_MULTIPLIERS[enemyTitle] then return damage end
	return damage * TITLE_DEFENSE_MULTIPLIERS[enemyTitle]
end

-- Apply equipment multipliers
local function applyEquipmentMultipliers(damage, equipment, damageType)
	if not equipment or not EQUIPMENT_MULTIPLIERS[equipment] then return damage end

	local multipliers = EQUIPMENT_MULTIPLIERS[equipment]

	if multipliers[damageType] then
		damage = damage * multipliers[damageType]
	end

	if multipliers.All then
		damage = damage * multipliers.All
	end

	return damage
end

-- Apply wisp type multipliers
local function applyWispMultipliers(damage, wispType, damageType)
	if not wispType or not WISP_MULTIPLIERS[wispType] then return damage end

	local multipliers = WISP_MULTIPLIERS[wispType]

	if multipliers[damageType] then
		damage = damage * multipliers[damageType]
	end

	if multipliers.All then
		damage = damage * multipliers.All
	end

	return damage
end

-- Apply mode-based multipliers
local function applyModeMultipliers(damage, char, damageType)
	-- Berserk Mode
	if char:FindFirstChild("Berserk") then
		damage = damage * MODE_MULTIPLIERS.BERSERK
	end

	-- Kaioken Mode
	if char:FindFirstChild("Kaioken") then
		damage = damage * MODE_MULTIPLIERS.KAIOKEN
	end

	-- Transparent World
	if char:FindFirstChild("Transparent World") then
		damage = damage * MODE_MULTIPLIERS.TRANSPARENT_WORLD
	end

	-- Platinum Dragon Lord C
	if char:FindFirstChild("Platinum Dragon Lord C") then
		damage = damage * MODE_MULTIPLIERS.PLATINUM_DRAGON_LORD_C
	end

	-- Ragna Mode
	if char:FindFirstChild("RagnaMode") then
		damage = damage * MODE_MULTIPLIERS.RAGNA_MODE
	end

	-- Adolla Link
	if char:FindFirstChild("Adolla Link") then
		damage = damage * MODE_MULTIPLIERS.ADOLLA_LINK
	end

	-- Sanji Mode with Sanji character
	if char:FindFirstChild("SanjiMode") and char:FindFirstChild("Sanji") then
		damage = damage * MODE_MULTIPLIERS.SANJI_MODE_WITH_SANJI
	end

	-- Rubber Mode (Special only)
	if char:FindFirstChild("RubberMode") and damageType == DAMAGE_TYPE.SPECIAL then
		damage = damage * MODE_MULTIPLIERS.RUBBER_MODE_SPECIAL
	end

	-- The Knight Mode (Special only)
	if char:FindFirstChild("TheKnightMode") and damageType == DAMAGE_TYPE.SPECIAL then
		damage = damage * MODE_MULTIPLIERS.THE_KNIGHT_MODE_SPECIAL
	end

	-- Guts Mode (Sword or Strength)
	if char:FindFirstChild("GutsMode") and (damageType == DAMAGE_TYPE.SWORD or damageType == DAMAGE_TYPE.STRENGTH) then
		damage = damage * MODE_MULTIPLIERS.GUTS_MODE_SWORD_STRENGTH
	end

	-- Padoru V2 Mode
	if char:FindFirstChild("PadoruV2Mode") then
		damage = damage * MODE_MULTIPLIERS.PADORU_V2_MODE
	end

	-- Femto Mode (Sword or Strength)
	if char:FindFirstChild("FemtoMode") and (damageType == DAMAGE_TYPE.SWORD or damageType == DAMAGE_TYPE.STRENGTH) then
		damage = damage * MODE_MULTIPLIERS.FEMTO_MODE_SWORD_STRENGTH
	end

	-- Ichigo Mode
	if char:FindFirstChild("Ichigo-Mode") then
		damage = damage * MODE_MULTIPLIERS.ICHIGO_MODE
	end

	-- Saiya Rage
	if char:FindFirstChild("SaiyaRage") then
		damage = damage * 1.5
	end

	-- Fighter Zone
	if char:FindFirstChild("Fighter Zone") then
		damage = damage * 1.5
	end

	-- Vizard Buff
	if char:FindFirstChild("Vizard Buff") then
		damage = damage * 1.5
	end

	-- Los Lobos
	if char:FindFirstChild("Los Lobos") then
		damage = damage * (stat and stat:FindFirstChild(damageType).Value == 0 and 3 or 15)
	end

	return damage
end

-- Apply race-based offensive multipliers
local function applyRaceOffenseMultipliers(damage, race, damageType)
	if not race or not RACE_OFFENSE_MULTIPLIERS[race] then return damage end

	local multiplier = RACE_OFFENSE_MULTIPLIERS[race]

	-- Handle function-based multipliers (e.g., Player race)
	if type(multiplier) == "function" then
		return damage -- Handled separately in main function
	end

	-- Handle table-based multipliers (specific damage types)
	if type(multiplier) == "table" then
		if multiplier[damageType] then
			damage = damage * multiplier[damageType]
		elseif multiplier.Day or multiplier.Night then
			-- Dullahan - handled separately based on time
			return damage
		end
	else
		-- Handle numeric multipliers (all damage types)
		damage = damage * multiplier
	end

	return damage
end

-- ============================================================================
-- HELPER FUNCTIONS - STATUS EFFECTS
-- ============================================================================

-- Apply burn effect (Damage over Time)
local function applyBurnEffect(hum, char, info, playerData, damageMultiplier)
	if hum.Parent:FindFirstChild("Burn") then return end

	local cd = Instance.new("BoolValue")
	cd.Name = "Burn"
	cd.Parent = hum.Parent
	game.Debris:AddItem(cd, 2)

	game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "Burn", hum.Parent)

	local burnDamage = calculateBaseDamage(damageMultiplier, char, info, playerData, 0.15)

	task.spawn(function()
		for i = 1, DOT_CONFIG.BURN_TICKS do
			if hum.Health <= 0 then break end
			hum:TakeDamage(burnDamage)

			if char:FindFirstChild("DamageCounter") then
				char:FindFirstChild("DamageCounter").Value = char:FindFirstChild("DamageCounter").Value + burnDamage
			end

			task.wait(DOT_CONFIG.BURN_TICK_INTERVAL)
		end
	end)
end

-- Apply freeze effect
local function applyFreezeEffect(hum, duration)
	game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "Freeze", hum.Parent, duration)

	local stunValue = Instance.new("BoolValue")
	stunValue.Name = "OnStuck"
	stunValue.Parent = hum.Parent
	game.Debris:AddItem(stunValue, duration)

	sounds.PlaySound(hum.Parent.HumanoidRootPart, "Misc", "Freeze")
end

-- Apply bleed effect
local function applyBleedEffect(hum, char)
	local bleedValue = Instance.new("BoolValue")
	bleedValue.Name = "Bleed Out"
	bleedValue.Parent = hum.Parent
	game.Debris:AddItem(bleedValue, 5)
end

-- Apply stun effect
local function applyStunEffect(target, duration)
	local stunValue = Instance.new("BoolValue")
	stunValue.Name = "OnStuck"
	stunValue.Parent = target
	game.Debris:AddItem(stunValue, duration)
end

-- ============================================================================
-- HELPER FUNCTIONS - SPECIAL ABILITIES
-- ============================================================================

-- Handle Ainz buff (Overlord)
local function handleAinzBuff(damage, char, user)
	if not char:FindFirstChild("Ainz") or not user then return damage end

	local playerData = getPlayerData(user)
	if not playerData then return damage end

	local equippedAccessory = playerData:FindFirstChild("Accessorys")
	local equippedRelic = playerData:FindFirstChild("Equipment")

	local buff = 0

	if equippedAccessory and equippedAccessory.Value == "Ring of Nazarick" then
		buff = buff + 0.25
	end

	if equippedRelic and equippedRelic.Value == "Momonga's Red Orb" then
		buff = buff + 0.25
	end

	return damage * (1 + buff)
end

-- Handle Momonga's Red Orb stun chance
local function handleMomongaOrbStunChance(hum, equipment)
	if equipment ~= "Momonga's Red Orb" then return end

	local randomChance = math.random(1, 10)
	if randomChance == 1 then
		applyStunEffect(hum.Parent, 1)
	end
end

-- Handle Toshiro Mode freeze
local function handleToshiroFreeze(char, hum, user, damageType)
	if not user or not user.Character:FindFirstChild("ToshiroMode") then return end
	if damageType ~= DAMAGE_TYPE.SWORD then return end
	if char:FindFirstChild("Freezer") then return end

	local freezeMarker = Instance.new("BoolValue")
	freezeMarker.Name = "Freezer"
	freezeMarker.Parent = char
	game.Debris:AddItem(freezeMarker, 0.5)

	applyFreezeEffect(hum, 3)
end

-- Handle fire-based skills burn
local function handleFireSkillsBurn(char, hum, info, playerData)
	local hasFireSkill = char:FindFirstChild("Shinra Kusakabe") or
	                     char:FindFirstChild("Joker") or
	                     char:FindFirstChild("Benimaru")

	if hasFireSkill then
		applyBurnEffect(hum, char, info, playerData, 3.5)
	end
end

-- Handle Legendary Saiyan race multiplier
local function handleLegendarySaiyanRace(damage, race)
	if race == "Legendary Saiyan" then
		return damage * MODE_MULTIPLIERS.LEGENDARY_SAIYAN
	end
	return damage
end

-- Handle counter mechanics
local function handleCounterMechanics(char, hum, user, HaveEnemySppotted)
	-- Ichigo Counter
	if HaveEnemySppotted and HaveEnemySppotted.Character:GetAttribute("IchigoCounter") then
		HaveEnemySppotted.Character:SetAttribute("IchigoCounter", nil)

		applyStunEffect(char, 3)
		applyStunEffect(HaveEnemySppotted.Character, 1)

		sounds.PlaySound(char.PrimaryPart, "Ichigo (TYBW)", "obama hav dih")

		task.delay(1.3, function()
			local grade = HaveEnemySppotted:FindFirstChild("InventoryData"):FindFirstChild("Sword"):FindFirstChild("Ichigo (TYBW)".." Grade").Value
			hitbox.Hitbox(HaveEnemySppotted.Character, "Sword", "IchigoTYBW", Vector3.new(20, 30, 20), CFrame.new(0, 2, 0), 5 + (grade * 2.5), char, 0.02)
		end)

		task.delay(1.8, function()
			local grade = HaveEnemySppotted:FindFirstChild("InventoryData"):FindFirstChild("Sword"):FindFirstChild("Ichigo (TYBW)".." Grade").Value
			hitbox.Hitbox(HaveEnemySppotted.Character, "Sword", "IchigoTYBW", Vector3.new(20, 30, 20), CFrame.new(0, 2, 0), 10 + (grade * 2.5), char, 0.02)
		end)

		game.ReplicatedStorage.Remotes.Effects:FireAllClients("Ichigo (TYBW)", "IchigoTYBW_C", HaveEnemySppotted.Character, HaveEnemySppotted.Character.HumanoidRootPart.CFrame, char)
		return true
	end

	-- Goku Counter
	if HaveEnemySppotted and HaveEnemySppotted.Character:GetAttribute("GokuCounter1") then
		HaveEnemySppotted.Character:SetAttribute("GokuCounter1", nil)
		sounds.PlaySound(char.HumanoidRootPart, "GokuHit", "GokuC")
		HaveEnemySppotted.Character.PrimaryPart.CFrame = char.PrimaryPart.CFrame + (char.PrimaryPart.CFrame.LookVector * -10)

		applyStunEffect(char, 2)
		applyStunEffect(HaveEnemySppotted.Character, 1)

		task.delay(0.7, function()
			hitbox.Hitbox(HaveEnemySppotted.Character, "Special", "YhwachSTR", Vector3.new(15, 20, 50), CFrame.new(0, 2, 25), 750, nil, 0.04)
		end)

		game.ReplicatedStorage.Remotes.Effects:FireAllClients("Goku SSJB", "C", HaveEnemySppotted.Character, char.HumanoidRootPart.CFrame)
		return true
	end

	-- Hit Counter
	if HaveEnemySppotted and HaveEnemySppotted.Character:GetAttribute("HitCounter1") then
		HaveEnemySppotted.Character:SetAttribute("HitCounter1", nil)
		applyStunEffect(char, 3)
		sounds.PlaySound(char.HumanoidRootPart, "GokuHit", "HitV")
		HaveEnemySppotted.Character.PrimaryPart.CFrame = char.PrimaryPart.CFrame + (char.PrimaryPart.CFrame.LookVector * -10)

		task.delay(0.4, function()
			hitbox.Hitbox(HaveEnemySppotted.Character, "Special", "YhwachSTR", Vector3.new(20, 20, 40), CFrame.new(0, 2, 20), 555, nil, 0.04)
		end)

		game.ReplicatedStorage.Remotes.Effects:FireAllClients("Hit", "V", HaveEnemySppotted.Character, char.HumanoidRootPart.CFrame)
		return true
	end

	return false
end

-- Handle special invincibility mechanics
local function handleInvincibilityMechanics(hum, char, damage, val, effect, HaveStand, x)
	-- Full invincibility
	if hum.Parent:FindFirstChild("Invencible") then
		if HaveStand then
			return damage
		else
			return 0
		end
	end

	-- Yhwach Mode invincibility (reflects 10% damage)
	if hum.Parent:FindFirstChild("ModeYhwachInvencible") and not HaveStand then
		x.TakeDamage(char.Humanoid, damage * 0.10, hum.Parent, val, effect)
		return 0
	end

	-- Jugram Skill (reflects full damage)
	if hum.Parent:FindFirstChild("JugramSkill") and not HaveStand then
		x.TakeDamage(char.Humanoid, damage, hum.Parent, val, effect)
		return 0
	end

	return damage
end

-- ============================================================================
-- HELPER FUNCTIONS - REWARD SYSTEM
-- ============================================================================

-- Track player damage contribution
local function trackPlayerDamage(hum, user, damage)
	if not hum.Parent:FindFirstChild("Players") then return end

	local playersFolder = hum.Parent:FindFirstChild("Players")
	local playerDamageValue = playersFolder:FindFirstChild(user.Name)

	if not playerDamageValue then
		local newValue = Instance.new("IntValue")
		newValue.Name = user.Name
		newValue.Value = damage
		newValue.Parent = playersFolder
	else
		playerDamageValue.Value = playerDamageValue.Value + damage
	end
end

-- Setup reward tracking
local function setupRewardTracking(user, hum, rewardFunction)
	if not _G.GlobalsReward2 then
		_G.GlobalsReward2 = {}
	end

	if not _G.GlobalsReward2[user] then
		_G.GlobalsReward2[user] = {}
	end

	local tableUser = _G.GlobalsReward2[user]

	if not table.find(tableUser, hum) then
		table.insert(tableUser, hum)

		hum.HealthChanged:Connect(function()
			rewardFunction()
		end)

		hum.Died:Once(function()
			rewardFunction()
		end)
	end
end

-- Handle quest rewards
local function handleQuestRewards(user, hum, char, HaveEnemySppotted, val)
	-- Quest tracking logic (simplified)
	if not user then return end

	-- Track Overlord kills (magic damage)
	if (val == DAMAGE_TYPE.SWORD or val == DAMAGE_TYPE.SPECIAL) and not hum.Parent:FindFirstChild("KillMagic") then
		local marker = Instance.new("BoolValue")
		marker.Name = "KillMagic"
		marker.Parent = hum.Parent

		local overlordQuests = user.Quest2DataSettings.Overlord
		local killsMagic = overlordQuests:FindFirstChild("KillsMagic")
		if killsMagic then
			killsMagic.Value = killsMagic.Value + 1
		end
	end

	-- Handle Giorno quest
	if char and char.Name == "Giorno" and HaveEnemySppotted then
		if HaveEnemySppotted.Quest2DataSettings["Mafia Boss Drip"].Value == 0 and
		   HaveEnemySppotted.Character:FindFirstChild("The World") then
			HaveEnemySppotted.Quest2DataSettings["Mafia Boss Drip"].Value = 1
			game.ReplicatedStorage.Remotes:FindFirstChild("UI"):FireClient(HaveEnemySppotted, "Text", "yes we re one step closer")
		end
	end

	-- Additional quest tracking would go here
end

-- Handle PVP rewards
local function handlePVPRewards(user, hum, HaveEnemySppotted)
	if hum.Health > 0 or not hum.Parent:FindFirstChild("OnTarget") then return end
	if hum.Parent:FindFirstChild("Reward") then return end

	local marker = Instance.new("BoolValue")
	marker.Name = "Reward"
	marker.Parent = hum.Parent

	local enemy = getPlayer(hum.Parent)
	if not enemy or not enemy:FindFirstChild("leaderstats") then return end

	local reputationLoss = enemy:FindFirstChild("leaderstats"):FindFirstChild("Reputation").Value / 10

	enemy:FindFirstChild("leaderstats"):FindFirstChild("Reputation").Value =
		enemy:FindFirstChild("leaderstats"):FindFirstChild("Reputation").Value - reputationLoss
	user:FindFirstChild("leaderstats"):FindFirstChild("Reputation").Value =
		user:FindFirstChild("leaderstats"):FindFirstChild("Reputation").Value + reputationLoss

	game.ReplicatedStorage.Remotes:FindFirstChild("UI"):FireClient(user, "GetReputation", nil, reputationLoss, enemy.Name)
	game.ReplicatedStorage.Remotes:FindFirstChild("UI"):FireClient(enemy, "LostReputation", nil, reputationLoss, user.Name)

	local killedMarker = Instance.new("BoolValue")
	killedMarker.Name = "Killed"
	killedMarker.Parent = enemy
	task.delay(300, function()
		if killedMarker then killedMarker:Destroy() end
	end)
end

-- ============================================================================
-- HELPER FUNCTIONS - COMBAT STATE MANAGEMENT
-- ============================================================================

-- Set combat state
local function setCombatState(char, hum, user, HaveEnemySppotted)
	-- Track enemy aggro
	if hum.Parent:FindFirstChild("Enemy") then
		local enemyFolder = hum.Parent:FindFirstChild("Enemy")
		local existingMarker = enemyFolder:FindFirstChild(user.Name)

		if existingMarker then
			existingMarker:Destroy()
		end

		local marker = Instance.new("BoolValue")
		marker.Name = user.Name
		marker.Parent = enemyFolder
		game.Debris:AddItem(marker, 5)
	end

	-- Set OnTarget marker
	local targetMarker = Instance.new("BoolValue")
	targetMarker.Name = "OnTarget"
	targetMarker.Parent = hum.Parent
	game.Debris:AddItem(targetMarker, 5)

	-- Handle PVP combat timers
	local playerGottenChar = getPlayer(hum.Parent)
	local playerGottenChar2 = getPlayer(char)

	if not playerGottenChar or not playerGottenChar2 then return end

	char:FindFirstChild("InCombat").Value = true
	hum.Parent:FindFirstChild("InCombat").Value = true

	-- Cancel existing combat timers
	if typeof(_G[playerGottenChar]) == "thread" then
		task.cancel(_G[playerGottenChar])
	end
	if typeof(_G[playerGottenChar2]) == "thread" then
		task.cancel(_G[playerGottenChar2])
	end

	-- Set new combat timers (20 seconds)
	_G[playerGottenChar] = task.delay(20, function()
		if hum and hum:IsDescendantOf(workspace) then
			hum.Parent:FindFirstChild("InCombat").Value = false
		end
	end)

	_G[playerGottenChar2] = task.delay(20, function()
		if char and char:IsDescendantOf(workspace) then
			char:FindFirstChild("InCombat").Value = false
		end
	end)
end

-- Update damage counter
local function updateDamageCounter(char, hum, damage, isHidanPassive)
	if isHidanPassive then
		if hum.Parent:FindFirstChild("DamageCounter") then
			hum.Parent:FindFirstChild("DamageCounter").Value = hum.Parent:FindFirstChild("DamageCounter").Value + damage
		end
		if hum.Parent:FindFirstChild("Combo") then
			hum.Parent:FindFirstChild("Combo").Value = hum.Parent:FindFirstChild("Combo").Value + 1
		end
	else
		if char:FindFirstChild("DamageCounter") then
			char:FindFirstChild("DamageCounter").Value = char:FindFirstChild("DamageCounter").Value + damage
		end
		if char:FindFirstChild("Combo") then
			char:FindFirstChild("Combo").Value = char:FindFirstChild("Combo").Value + 1
		end
	end
end

-- ============================================================================
-- HELPER FUNCTIONS - RACE-SPECIFIC EFFECTS
-- ============================================================================

-- Handle Demonic race bleed
local function handleDemonicRace(hum, race, damage)
	if race ~= "Demonic" then return damage end
	applyBleedEffect(hum, nil)
	return damage * RACE_OFFENSE_MULTIPLIERS.Demonic
end

-- Handle Vampire race lifesteal
local function handleVampireRace(char, race, damage)
	if race ~= "Vampire" then return damage end
	char:FindFirstChild("Humanoid").Health = char:FindFirstChild("Humanoid").Health + (damage * 0.05)
	return damage * RACE_OFFENSE_MULTIPLIERS.Vampire
end

-- Handle Ghoul race lifesteal
local function handleGhoulRace(char, race, damage)
	if race ~= "Ghoul" then return damage end
	char:FindFirstChild("Humanoid").Health = char:FindFirstChild("Humanoid").Health + (damage / 10)
	return damage * RACE_OFFENSE_MULTIPLIERS.Ghoul
end

-- Handle Angelica race lightning strike
local function handleAngelicaRace(hum, char, race, info, playerData)
	if race ~= "Angelica" then return end

	local strikeChance = math.random(1, 5)
	if strikeChance == math.random(1, 5) and not char:FindFirstChild("Strike") then
		local marker = Instance.new("BoolValue")
		marker.Name = "Strike"
		marker.Parent = char
		game.Debris:AddItem(marker, 0.5)

		game.ReplicatedStorage.Remotes.Effects:FireAllClients("Effects", "Strike", hum.Parent)
		applyStunEffect(hum.Parent, 2)

		local strikeDamage = calculateBaseDamage(25, char, info, playerData, 0.15)
		hum:TakeDamage(strikeDamage)
	end
end

-- Handle Vessel race cutting effect
local function handleVesselRace(hum, char, race, info, playerData)
	if race ~= "Vessel" then return end
	if char:FindFirstChild("Cut") then return end

	local marker = Instance.new("BoolValue")
	marker.Name = "Cut"
	marker.Parent = char
	game.Debris:AddItem(marker, 0.5)

	game.ReplicatedStorage.Remotes.Effects:FireAllClients("Effects", "Cutting", hum.Parent)

	local cutDamage = calculateBaseDamage(2.5, char, info, playerData, 0.15)

	task.spawn(function()
		for i = 1, DOT_CONFIG.CUTTING_TICKS do
			hum:TakeDamage(cutDamage)
			if char:FindFirstChild("DamageCounter") then
				char:FindFirstChild("DamageCounter").Value = char:FindFirstChild("DamageCounter").Value + cutDamage
			end
			task.wait(DOT_CONFIG.CUTTING_TICK_INTERVAL)
		end
	end)
end

-- Handle Dullahan race (day/night mechanic)
local function handleDullahanRace(hum, char, race, info, playerData, damage)
	if race ~= "Dullahan" then return damage end

	local timeOfDay = workspace.Server.Time.Value

	if timeOfDay == "Day" then
		return damage / 1.5
	elseif timeOfDay == "Night" then
		damage = damage * 2

		-- Apply burn effect at night
		local burnDamage = calculateBaseDamage(3.5, char, info, playerData, 0.15)

		task.spawn(function()
			if not hum.Parent:FindFirstChild("Burn") then
				local marker = Instance.new("BoolValue")
				marker.Name = "Burn"
				marker.Parent = hum.Parent
				game.Debris:AddItem(marker, 2)

				game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "Burn2", hum.Parent)
			end

			for i = 1, DOT_CONFIG.BURN_TICKS do
				if hum.Health <= 0 then break end
				hum:TakeDamage(burnDamage)
				if char:FindFirstChild("DamageCounter") then
					char:FindFirstChild("DamageCounter").Value = char:FindFirstChild("DamageCounter").Value + burnDamage
				end
				task.wait(DOT_CONFIG.BURN_TICK_INTERVAL)
			end
		end)
	end

	return damage
end

-- Handle Fallen Angel race light pull
local function handleFallenAngelRace(char, race, info, playerData, damage)
	if race ~= "Fallen Angel" then return damage end
	if char:FindFirstChild("FallenDB") then return damage end

	local marker = Instance.new("BoolValue")
	marker.Name = "FallenDB"
	marker.Parent = char
	game.Debris:AddItem(marker, 15)

	sounds.PlaySound(char.HumanoidRootPart, "Misc", "Void")
	game.ReplicatedStorage.Remotes.Effects:FireAllClients("Effects", "LightPull", char)

	local pullDamage = calculateBaseDamage(10, char, info, playerData, 0.15)
	hitbox.Hitbox(char, "Sword", "LightJail", Vector3.new(70, 25, 70), CFrame.new(0, 0, 0), pullDamage, nil, 0.1)

	return damage * RACE_OFFENSE_MULTIPLIERS["Fallen Angel"]
end

-- Handle Mahoraga adaptation
local function handleMahoragaAdaptation(hum, HaveEnemySppotted, damage)
	if not HaveEnemySppotted then return end
	if HaveEnemySppotted:FindFirstChild("PlayerData"):FindFirstChild("Race").Value ~= "Mahoraga" then return end
	if hum.Parent:FindFirstChild("MahoDelay") then return end

	local gettingDamage = hum.Parent:FindFirstChild("GettingDamage")
	if not gettingDamage then return end

	gettingDamage.Value = gettingDamage.Value + damage

	local adaptThreshold = ((hum.Health / hum.MaxHealth) * 100) / 5
	if gettingDamage.Value >= adaptThreshold then
		gettingDamage.Value = 0

		game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "HitHL", hum.Parent, Color3.fromRGB(255, 206, 108), 5)
		sounds.PlaySound(hum.Parent:FindFirstChild("HumanoidRootPart"), "Misc", "Adaption")

		-- Grant iframe
		local iframe = Instance.new("BoolValue")
		iframe.Name = "IFrame"
		iframe.Parent = hum.Parent
		game.Debris:AddItem(iframe, 4)

		-- Set adaptation cooldown
		local delayMarker = Instance.new("BoolValue", hum.Parent)
		delayMarker.Name = "MahoDelay"
		game.Debris:AddItem(delayMarker, 15)

		-- Rotate wheel accessory
		local raceAccessory = hum.Parent:FindFirstChild("RaceAccessory")
		if raceAccessory and raceAccessory:IsA("BasePart") then
			local handle = raceAccessory:FindFirstChild("Handle")
			if handle then
				game.TweenService:Create(
					handle,
					TweenInfo.new(0.5),
					{C1 = handle.C1 * CFrame.Angles(0, math.rad(180), 0)}
				):Play()
			end
		end
	end
end

-- Handle Birkan evasion
local function handleBirkanEvasion(hum, HaveEnemySppotted)
	if not HaveEnemySppotted then return end
	if HaveEnemySppotted:FindFirstChild("PlayerData"):FindFirstChild("Race").Value ~= "Birkan" then return end
	if hum.Parent:FindFirstChild("BirkanDelay") then return end

	local dodgeChance = math.random(1, 5)
	if dodgeChance == 1 then
		local delayMarker = Instance.new("BoolValue", hum.Parent)
		delayMarker.Name = "MahoDelay"
		game.Debris:AddItem(delayMarker, 5)

		local iframe = Instance.new("BoolValue")
		iframe.Name = "IFrame"
		iframe.Parent = hum.Parent
		game.Debris:AddItem(iframe, 0.2)
	end
end

-- ============================================================================
-- HELPER FUNCTIONS - EQUIPMENT EFFECTS
-- ============================================================================

-- Handle sword enchantments
local function handleSwordEnchantments(char, hum, user, playerData, info, damageType)
	if not user or damageType ~= DAMAGE_TYPE.SWORD then return end

	local inventoryData = user:FindFirstChild("InventoryData")
	if not inventoryData then return end

	local swordData = inventoryData:FindFirstChild("Sword")
	local equippedSword = playerData:FindFirstChild("Swords")
	if not swordData or not equippedSword then return end

	local swordName = equippedSword.Value
	if not char:FindFirstChild(swordName) then return end

	local enchantValue = swordData:FindFirstChild(swordName.." Enchant")
	if not enchantValue then return end

	local enchant = enchantValue.Value

	-- Fire Enchant
	if enchant == "Fire" then
		local fireDamage = calculateBaseDamage(10, char, info, playerData, 0.15)

		task.spawn(function()
			if not hum.Parent:FindFirstChild("Burn") then
				local marker = Instance.new("BoolValue")
				marker.Name = "Burn"
				marker.Parent = hum.Parent
				game.Debris:AddItem(marker, 2)

				game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "Burn", hum.Parent)
			end

			for i = 1, DOT_CONFIG.BURN_TICKS do
				DamageModule.TakeDamage(hum, fireDamage, char, "Sword")
				task.wait(0.6)
			end
		end)
	end

	-- Ice Enchant
	if enchant == "Ice" then
		applyFreezeEffect(hum, 0.5)
	end

	-- Bleed Enchant
	if enchant == "Bleed" then
		task.spawn(function()
			for i = 1, DOT_CONFIG.BLEED_TICKS do
				game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "LowBleeding", hum.Parent)
				DamageModule.TakeDamage(hum, 3, char, "Sword")
				task.wait(DOT_CONFIG.BLEED_TICK_INTERVAL)
			end
		end)
	end

	-- Leech Enchant
	if enchant == "Leech" then
		char:FindFirstChild("Humanoid").Health = char:FindFirstChild("Humanoid").Health + (damage / 15)
	end

	-- Blessing Enchant
	if enchant == "Blessing" then
		return damage * 2.5
	end

	return damage
end

-- Handle combat blessing
local function handleCombatBlessing(damage, char, user, playerData, damageType)
	if damageType ~= DAMAGE_TYPE.SPECIAL then return damage end

	local combats = playerData:FindFirstChild("Combats")
	if not combats then return damage end

	local combatName = combats.Value
	if not char:FindFirstChild(combatName) then return damage end

	local inventoryData = user:FindFirstChild("InventoryData")
	if not inventoryData then return damage end

	local combatData = inventoryData:FindFirstChild("Combat")
	if not combatData then return damage end

	local blessingValue = combatData:FindFirstChild(combatName.." Blessing")
	if blessingValue and blessingValue.Value == true then
		return damage * 2.5
	end

	return damage
end

-- Handle prestige bonus
local function handlePrestigeBonus(damage, playerData)
	local prestige = playerData:FindFirstChild("Prestige")
	if not prestige then return damage end

	local prestigeDamage = prestige:FindFirstChild("Prestige Damage")
	if prestigeDamage and prestigeDamage.Value >= 0 then
		return damage * (1 + prestigeDamage.Value)
	end

	return damage
end

-- Handle potion buffs
local function handlePotionBuffs(damage, playerData)
	local potions = playerData:FindFirstChild("Potions")
	if not potions then return damage end

	local damageBoost = potions:FindFirstChild("Damage Boost")
	if damageBoost and damageBoost.Value > 0 then
		return damage * 1.25
	end

	return damage
end

-- Handle Artifact effects
local function handleArtifactEffects(char, hum, playerData)
	local artifact = playerData:FindFirstChild("Artifact")
	if not artifact or artifact.Value ~= "Ice Artifact" then return end
	if char:FindFirstChild("Freezer") then return end

	local freezeChance = math.random(1, 15)
	if freezeChance == math.random(1, 15) then
		local marker = Instance.new("BoolValue")
		marker.Name = "Freezer"
		marker.Parent = char
		game.Debris:AddItem(marker, 0.5)

		applyFreezeEffect(hum, 3)
	end
end

-- ============================================================================
-- HELPER FUNCTIONS - ENEMY PASSIVE ABILITIES
-- ============================================================================

-- Handle Gilgamesh counter
local function handleGilgameshCounter(char, hum, HaveEnemySppotted)
	if not HaveEnemySppotted then return end

	local enemyPlayer = getPlayer(hum.Parent)
	if not enemyPlayer then return end

	local enemyData = getPlayerData(enemyPlayer)
	if not enemyData then return end

	local enemyCombat = enemyData:FindFirstChild("Combats")
	if not enemyCombat or enemyCombat.Value ~= "Gilgamesh" then return end
	if hum.Parent:FindFirstChild("Gilgamesh Passive") then return end

	local marker = Instance.new("BoolValue")
	marker.Name = "Gilgamesh Passive"
	marker.Parent = hum.Parent
	game.Debris:AddItem(marker, 0.75)

	local enemyInfo = getPlayerInfo(enemyData)
	local counterDamage = calculateBaseDamage(10, char, enemyInfo, enemyData, 0.15)

	sounds.PlaySound(char.HumanoidRootPart, "Sword", "Heavy Slash4")
	game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Gilgamesh", "Counter", hum.Parent, char)

	hitbox.Hitbox2(hum.Parent, "Special", "Hit", Vector3.new(25, 25, 25), CFrame.new(0, 0, 0), counterDamage, nil, 0.5, char.HumanoidRootPart.CFrame)
end

-- Handle Contractor passive (5-hit explosion)
local function handleContractorPassive(hum, HaveEnemySppotted)
	if not HaveEnemySppotted then return end
	if hum.Parent:FindFirstChild("HidanPassive") then return end

	local enemyPlayer = getPlayer(hum.Parent)
	if not enemyPlayer then return end

	local enemyData = getPlayerData(enemyPlayer)
	if not enemyData then return end

	local enemyRace = getRace(enemyData)
	if enemyRace ~= "Contractor" then return end
	if hum.Parent:FindFirstChild("ContractorCD") then return end

	-- Initialize or increment contractor hits
	if not hum.Parent:FindFirstChild("ContractorActive") then
		local hitCounter = Instance.new("IntValue")
		hitCounter.Name = "ContractorActive"
		hitCounter.Value = 1
		hitCounter.Parent = hum.Parent

		local ui = game.ReplicatedStorage.Assets.UIs:FindFirstChild("Contractor"):Clone()
		ui.Label.Text = "("..hitCounter.Value..")"
		ui.Parent = hum.Parent:FindFirstChild("HumanoidRootPart")
	else
		if hum.Parent:FindFirstChild("CDs") then return end

		local cooldown = Instance.new("BoolValue")
		cooldown.Name = "CDs"
		cooldown.Parent = hum.Parent
		game.Debris:AddItem(cooldown, 0.5)

		local hitCounter = hum.Parent:FindFirstChild("ContractorActive")
		hitCounter.Value = hitCounter.Value + 1
		hum.Parent:FindFirstChild("HumanoidRootPart"):FindFirstChild("Contractor"):FindFirstChild("Label").Text = "("..hitCounter.Value..")"

		-- Trigger explosion at 5 hits
		if hitCounter.Value >= 5 then
			hitCounter:Destroy()
			hum.Parent:FindFirstChild("HumanoidRootPart"):FindFirstChild("Contractor"):Destroy()

			sounds.PlaySound(hum.Parent:FindFirstChild("HumanoidRootPart"), "Misc", "Void")
			game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "ContractorExplosive", hum.Parent)

			hitbox.Hitbox(hum.Parent, "Special", "ExplosiveBloodlech", Vector3.new(150, 150, 150), CFrame.new(0, 0, 0), 100, nil, 0.5)

			local cd = Instance.new("BoolValue")
			cd.Name = "ContractorCD"
			cd.Value = 1
			cd.Parent = hum.Parent
			game.Debris:AddItem(cd, 5)
		end
	end
end

-- ============================================================================
-- HELPER FUNCTIONS - FINAL DAMAGE APPLICATION
-- ============================================================================

-- Apply race-based damage resistance
local function applyRaceDefenseModifiers(damage, enemyRace, isHidanPassive)
	if isHidanPassive then
		return damage / 5
	end

	if not enemyRace or not RACE_DEFENSE_DIVISORS[enemyRace] then
		return damage / 65 -- Default divisor
	end

	local divisor = RACE_DEFENSE_DIVISORS[enemyRace]

	-- Shadow race special case: heals instead of taking damage
	if enemyRace == "Shadow" then
		return damage * divisor.Stat0, true -- Return damage and heal flag
	end

	return damage / divisor.Stat0, false
end

-- Apply final damage and effects
local function applyFinalDamage(hum, damage, enemyRace, isHidanPassive)
	local finalDamage, shouldHeal = applyRaceDefenseModifiers(damage, enemyRace, isHidanPassive)

	hum:TakeDamage(finalDamage)
	game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "Damage", hum.Parent, finalDamage)

	-- Shadow race heals from damage
	if shouldHeal and enemyRace == "Shadow" then
		hum.Health = hum.Health + ((finalDamage * 65) / 100)
	end

	return finalDamage
end

-- ============================================================================
-- MAIN DAMAGE FUNCTION
-- ============================================================================

function DamageModule.TakeDamage(hum, damage, char, val, effect)
	-- Get player references
	local user = getPlayer(char)
	local HaveEnemySppotted = getPlayer(hum.Parent)

	local HaveStand = char:FindFirstChild("Stand")
	local playerData = user and getPlayerData(user)
	local playerInfo = user and getPlayerInfo(playerData)

	-- Get player title
	local title = getTitle(playerInfo)
	local titleInfo = title and TitleNewTable[title]

	-- ========================================================================
	-- PHASE 1: EARLY MULTIPLIERS (Title Buffs, Damage Buffs)
	-- ========================================================================

	-- Apply title buffs from new table
	if titleInfo then
		for buffType, multiplier in pairs(titleInfo["Buffs"]) do
			if buffType == "ALL Damages" then
				damage = damage * multiplier
			elseif buffType == "Special Damage" and val == DAMAGE_TYPE.SPECIAL then
				damage = damage * multiplier
			end
		end
	end

	-- Apply damage buffs from external table
	for buffName, buffData in pairs(DamageBuff) do
		if char:FindFirstChild(buffName) then
			for damageType, multiplier in pairs(buffData) do
				if damageType == val or damageType == "All Damages" then
					damage = damage * multiplier
				end
			end
		end
	end

	-- ========================================================================
	-- PHASE 2: MODE-BASED MULTIPLIERS
	-- ========================================================================

	damage = applyModeMultipliers(damage, char, val)

	-- ========================================================================
	-- PHASE 3: TITLE-SPECIFIC MULTIPLIERS
	-- ========================================================================

	-- Offensive title multipliers (attacker)
	if user and playerInfo then
		damage = applyTitleOffenseMultipliers(damage, title, val)
	end

	-- Defensive title multipliers (defender)
	if HaveEnemySppotted then
		local enemyData = getPlayerData(HaveEnemySppotted)
		local enemyInfo = getPlayerInfo(enemyData)
		local enemyTitle = getTitle(enemyInfo)
		damage = applyTitleDefenseMultipliers(damage, enemyTitle)
	end

	-- ========================================================================
	-- PHASE 4: EQUIPMENT MULTIPLIERS
	-- ========================================================================

	if user and playerData then
		local equipment = getEquipment(playerData)
		damage = applyEquipmentMultipliers(damage, equipment, val)

		-- Handle Momonga's Red Orb stun chance
		handleMomongaOrbStunChance(hum, equipment)

		-- Handle Brand of Sacrifice lifesteal
		if equipment == "Brand of Sacrifice" then
			char:FindFirstChild("Humanoid").Health = char:FindFirstChild("Humanoid").Health + (damage / 7)
		end

		-- Handle equipment defense multipliers for enemy
		if HaveEnemySppotted then
			local enemyData = getPlayerData(HaveEnemySppotted)
			local enemyEquipment = getEquipment(enemyData)
			if enemyEquipment and EQUIPMENT_MULTIPLIERS[enemyEquipment] and EQUIPMENT_MULTIPLIERS[enemyEquipment].DefenseTaken then
				damage = damage * EQUIPMENT_MULTIPLIERS[enemyEquipment].DefenseTaken
			end
		end
	end

	-- ========================================================================
	-- PHASE 5: WISP TYPE MULTIPLIERS
	-- ========================================================================

	if user and playerData then
		local wispType = getWispType(playerData)
		damage = applyWispMultipliers(damage, wispType, val)
	end

	-- ========================================================================
	-- PHASE 6: RACE MULTIPLIERS
	-- ========================================================================

	if user and playerData then
		local race = getRace(playerData)
		damage = handleLegendarySaiyanRace(damage, race)
	end

	-- ========================================================================
	-- PHASE 7: SPECIAL ABILITIES AND EFFECTS
	-- ========================================================================

	-- Handle Ainz buff
	damage = handleAinzBuff(damage, char, user)

	-- Handle Toshiro freeze
	if user then
		handleToshiroFreeze(char, hum, user, val)
	end

	-- Handle fire skills burn
	if user and playerData then
		handleFireSkillsBurn(char, hum, playerInfo, playerData)
	end

	-- Handle Transparent World iframe
	if hum.Parent:FindFirstChild("Transparent World") and not hum.Parent:FindFirstChild("TDelayW") then
		local delayMarker = Instance.new("BoolValue")
		delayMarker.Name = "TDelayW"
		delayMarker.Parent = hum.Parent
		game.Debris:AddItem(delayMarker, 25)

		local iframe = Instance.new("BoolValue")
		iframe.Name = "IFrame"
		iframe.Parent = hum.Parent
		game.Debris:AddItem(iframe, 10)
	end

	-- Handle Broly hits counter
	if hum.Parent:FindFirstChild("BrolyHits") then
		local hitsCounter = hum.Parent:FindFirstChild("BrolyHits")
		hitsCounter.Value = hitsCounter.Value - 1
		if hitsCounter.Value <= 0 then
			hitsCounter:Destroy()
		end
	end

	-- Handle Padoru V2 Mode lifesteal
	if char:FindFirstChild("PadoruV2Mode") then
		char.Humanoid.Health = char.Humanoid.Health + (damage * 0.04)
	end

	-- Handle Guts Mode damage reduction on enemy
	if HaveEnemySppotted and HaveEnemySppotted.Character:FindFirstChild("GutsMode") then
		damage = damage * 0.20
	end

	-- Handle Sanji Mode burn
	if char:FindFirstChild("SanjiMode") then
		applyBurnEffect(hum, char, playerInfo, playerData, 5)
	end

	-- Handle Ashen Ring burn
	if user and playerData then
		local equipment = getEquipment(playerData)
		if equipment == "Ashen Ring" and val == DAMAGE_TYPE.SWORD then
			applyBurnEffect(hum, char, playerInfo, playerData, 5)
		end
	end

	-- ========================================================================
	-- PHASE 8: COUNTER MECHANICS
	-- ========================================================================

	if handleCounterMechanics(char, hum, user, HaveEnemySppotted) then
		return -- Counter triggered, exit early
	end

	-- ========================================================================
	-- PHASE 9: INVINCIBILITY MECHANICS
	-- ========================================================================

	damage = handleInvincibilityMechanics(hum, char, damage, val, effect, HaveStand, DamageModule)
	if damage == 0 then return end

	-- ========================================================================
	-- PHASE 10: CALCULATE FINAL DAMAGE AND APPLY RACE EFFECTS
	-- ========================================================================

	if not user or not playerData then
		-- NPC damage
		hum:TakeDamage(damage)
		game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "Damage", hum.Parent, damage)
		return
	end

	-- Set combat state
	setCombatState(char, hum, user, HaveEnemySppotted)

	local stat = getPlayerStats(playerData)
	local info = getPlayerInfo(playerData)
	local buffs = getPlayerBuffs(playerData)

	-- Determine if we use stat-based or base damage calculation
	local statValue = stat and stat:FindFirstChild(val)
	local usesStats = statValue and statValue.Value > 0

	local realdamage
	if usesStats then
		realdamage = calculateStatDamage(damage, val, stat, buffs, char, info, playerData)
	else
		realdamage = calculateBaseDamage(damage, char, info, playerData, 0.10)
	end

	-- Apply race-specific offensive effects
	local race = getRace(playerData)
	if race then
		realdamage = handleDemonicRace(hum, race, realdamage)
		realdamage = handleVampireRace(char, race, realdamage)
		realdamage = handleGhoulRace(char, race, realdamage)
		realdamage = handleDullahanRace(hum, char, race, info, playerData, realdamage)
		realdamage = handleFallenAngelRace(char, race, info, playerData, realdamage)

		handleAngelicaRace(hum, char, race, info, playerData)
		handleVesselRace(hum, char, race, info, playerData)

		-- Apply generic race multipliers
		realdamage = applyRaceOffenseMultipliers(realdamage, race, val)

		-- Handle Player race (system level bonus)
		if race == "Player" then
			local systemLevels = playerData:FindFirstChild("System"):FindFirstChild("SystemLevels")
			if systemLevels then
				realdamage = realdamage * (1 + (0.03 * systemLevels.Value))
			end
		end
	end

	-- Apply effect-based lifesteal
	if effect == "BloodLeech" then
		char:FindFirstChild("Humanoid").Health = char:FindFirstChild("Humanoid").Health + (realdamage / 15)
	elseif effect == "BloodLeech2" then
		char:FindFirstChild("Humanoid").Health = char:FindFirstChild("Humanoid").Health + (realdamage / 5)
	end

	-- ========================================================================
	-- PHASE 11: EQUIPMENT AND ENCHANTMENT EFFECTS
	-- ========================================================================

	realdamage = handleSwordEnchantments(char, hum, user, playerData, info, val)
	realdamage = handleCombatBlessing(realdamage, char, user, playerData, val)
	realdamage = handlePrestigeBonus(realdamage, playerData)
	realdamage = handlePotionBuffs(realdamage, playerData)
	handleArtifactEffects(char, hum, playerData)

	-- ========================================================================
	-- PHASE 12: ENEMY DEFENSIVE ABILITIES
	-- ========================================================================

	handleMahoragaAdaptation(hum, HaveEnemySppotted, realdamage)
	handleBirkanEvasion(hum, HaveEnemySppotted)
	handleGilgameshCounter(char, hum, HaveEnemySppotted)
	handleContractorPassive(hum, HaveEnemySppotted)

	-- ========================================================================
	-- PHASE 13: TRACK DAMAGE AND UPDATE COUNTERS
	-- ========================================================================

	trackPlayerDamage(hum, user, realdamage)

	-- ========================================================================
	-- PHASE 14: APPLY FINAL DAMAGE
	-- ========================================================================

	local isHidanPassive = hum.Parent:FindFirstChild("HidanPassive") ~= nil
	local enemyRace = HaveEnemySppotted and getRace(getPlayerData(HaveEnemySppotted)) or nil

	local finalDamage = applyFinalDamage(hum, realdamage, enemyRace, isHidanPassive)

	-- Update damage counters
	updateDamageCounter(char, hum, finalDamage, isHidanPassive)

	-- ========================================================================
	-- PHASE 15: SETUP REWARD TRACKING
	-- ========================================================================

	local function rewardCallback()
		handleQuestRewards(user, hum, char, HaveEnemySppotted, val)
		handlePVPRewards(user, hum, HaveEnemySppotted)
	end

	setupRewardTracking(user, hum, rewardCallback)

	-- Handle Hidan Passive reflection
	if HaveEnemySppotted and hum.Parent:FindFirstChild("HidanPassive") then
		if hum.Parent:FindFirstChild("DamageCounter") then
			hum.Parent:FindFirstChild("DamageCounter").Value = hum.Parent:FindFirstChild("DamageCounter").Value + (finalDamage / 5)
		end
	end
end

-- ============================================================================
-- TRUE DAMAGE FUNCTION (Bypasses all modifiers)
-- ============================================================================

function DamageModule.TrueTakeDamage(hum, damage, char, val)
	local user = getPlayer(char)

	if char:FindFirstChild("DamageCounter") then
		char:FindFirstChild("DamageCounter").Value = char:FindFirstChild("DamageCounter").Value + damage
	end

	hum:TakeDamage(damage)
	game.ReplicatedStorage.Remotes:FindFirstChild("Effects"):FireAllClients("Effects", "Damage", hum.Parent, damage)
end

-- ============================================================================
-- RETURN MODULE
-- ============================================================================

return DamageModule
