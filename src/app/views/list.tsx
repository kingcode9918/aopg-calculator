import { useState } from "react";
import { TitleBuffs, titleBuffsData } from "../data/titlebuff";

// Group titles by rank
const groupedByRank = titleBuffsData
  .filter((item) => item.id !== 0)
  .reduce<Record<string, TitleBuffs[]>>((acc, item) => {
    if (!acc[item.rank]) acc[item.rank] = [];
    acc[item.rank].push(item);
    return acc;
  }, {});

// Rank order and display names
const rankOrder = [
  { key: "divine", label: "Divine" },
  { key: "mythical", label: "Mythical" },
  { key: "legendary", label: "Legendary" },
  { key: "epic", label: "Epic" },
  { key: "rare", label: "Rare" },
  { key: "uncommon", label: "Uncommon" },
  { key: "common", label: "Common" },
];

const BuffListAccordion = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto py-4">
      {rankOrder
        .filter(({ key }) => groupedByRank[key])
        .map(({ key, label }) => (
          <div className="mb-2" key={key}>
            <div
              className={`collapse collapse-arrow bg-base-200 rounded-box shadow`}
              tabIndex={0}
              onClick={() => setOpen(open === key ? null : key)}
            >
              <input
                type="checkbox"
                className="peer"
                checked={open === key}
                readOnly
                tabIndex={-1}
              />
              <div className="collapse-title text-xl font-bold text-primary">
                {label} Titles ({groupedByRank[key].length})
              </div>
              <div className="collapse-content">
                <ul className="space-y-3">
                  {groupedByRank[key].map((buff) => (
                    <li key={buff.id} className="border-t border-base-300 pt-2">
                      <div className="font-semibold break-words">
                        {buff.name}
                      </div>
                      <div className="opacity-80 mt-1 leading-snug">
                        <span className="custom-text-fruit">
                          🍇 Fruit: x{buff.fruitbuff}
                        </span>
                        <br />
                        <span className="custom-text-sword">
                          🗡️ Sword: x{buff.swordbuff}
                        </span>
                        <br />
                        <span className="custom-text-gun">
                          🔫 Gun: x{buff.gunbuff}
                        </span>
                        <br />
                        <span className="custom-text-strength">
                          💪 Strength: x{buff.strengthbuff}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BuffListAccordion;
