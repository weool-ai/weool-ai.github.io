import json
import re

with open('d:\\PROJECTS\\Italiano app\\content.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON part
match = re.search(r'const contentData = ({.*});', content, re.DOTALL)
if match:
    json_str = match.group(1)
    data = json.loads(json_str)
    print('Loaded successfully, keys:', list(data.keys()))
else:
    print('No match found')