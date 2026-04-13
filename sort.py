import re

# with open(r'd:\Programming\react\aopg-calculator\src\app\aopg\data\moves\fightingstyleMoveDamage.ts', 'r', encoding='utf-8') as f:
with open(r'd:\Programming\react\aopg-calculator\src\app\aopg\data\moves\gunstyleMoveDamage.ts', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('export const gunStyleMoveDamage: MoveDamage[] = [')
# find the first { after start_idx
array_start = content.find('[', start_idx) + 1

objects = []
current_obj = ""
brace_count = 0
in_obj = False

i = array_start
while i < len(content):
    c = content[i]
    if c == '{':
        if brace_count == 0:
            in_obj = True
            current_obj = ""
        brace_count += 1
        current_obj += c
    elif c == '}':
        brace_count -= 1
        current_obj += c
        if brace_count == 0 and in_obj:
            objects.append(current_obj)
            in_obj = False
    elif in_obj:
        current_obj += c
    i += 1

# Now we have all object strings. We need to parse their names.
parsed_objs = []
for obj in objects:
    m = re.search(r'name:\s*"([^"]+)"', obj)
    if m:
        name = m.group(1)
        parsed_objs.append((name, obj))
    else:
        print("Could not find name in:", obj)

parsed_objs.sort(key=lambda x: x[0].lower())

counters = {}
final_strings = []

for name, obj in parsed_objs:
    first_letter = name[0].upper()
    if first_letter not in counters:
        counters[first_letter] = 1
    else:
        counters[first_letter] += 1
    
    idx = counters[first_letter]
    new_id = f'300{first_letter}{idx:02d}'
    
    new_obj = re.sub(r'(id:\s*)[^\,]+(,\n)', rf'\g<1>"{new_id}"\g<2>', obj, count=1)
    final_strings.append(new_obj)

# now reconstruct the file
prefix = content[:array_start]
suffix = content[content.rfind(']'):]

new_content = prefix + '\n  ' + ',\n  '.join(final_strings) + '\n' + suffix

with open(r'd:\Programming\react\aopg-calculator\src\app\aopg\data\moves\gunstyleMoveDamage.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done sorting and replacing ids")
