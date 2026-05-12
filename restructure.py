import json

# Load the data
with open('d:\\PROJECTS\\Italiano app\\content_clean.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define section metadata
sections = {
    "A1": {
        "title": "Початковий рівень A1",
        "description": "Основні слова та фрази для початківців",
        "icon": "🌱"
    },
    "A2": {
        "title": "Середній рівень A2",
        "description": "Розширений словник для повсякденного спілкування",
        "icon": "🌿"
    },
    "A1-1": {
        "title": "A1 - Базові поняття",
        "description": "Основні слова для першого знайомства з мовою",
        "icon": "📚"
    },
    "A1-2": {
        "title": "A1 - Повсякденне життя",
        "description": "Слова для опису щоденного життя",
        "icon": "🏠"
    },
    "A1-3": {
        "title": "A1 - Природа та час",
        "description": "Слова про природу, погоду та час",
        "icon": "🌞"
    },
    "A1-4": {
        "title": "A1 - Їжа та напої",
        "description": "Слова для опису їжі та напоїв",
        "icon": "🍕"
    },
    "A2-1": {
        "title": "A2 - Дії та хобі",
        "description": "Дієслова для опису дій та хобі",
        "icon": "⚽"
    },
    "A2-2": {
        "title": "A2 - Час та емоції",
        "description": "Слова про час та емоції",
        "icon": "⏰"
    },
    "A2-3": {
        "title": "A2 - Подорожі та робота",
        "description": "Слова для подорожей та професійної діяльності",
        "icon": "✈️"
    }
}

# Group words by level
grouped_words = {}
for topic_name, topic_data in data['topics'].items():
    for word in topic_data['words']:
        level = word['level']
        if level not in grouped_words:
            grouped_words[level] = []
        grouped_words[level].append(word)

# Create new structure
new_contentData = {
    "articleVariants": data["articleVariants"],
    "sections": {}
}

for level, words in grouped_words.items():
    if level in sections:
        new_contentData["sections"][level] = {
            "title": sections[level]["title"],
            "description": sections[level]["description"],
            "icon": sections[level]["icon"],
            "vocabulary": words,
            "exercises": []  # Will be populated later
        }

# Write back to files
with open('d:\\PROJECTS\\Italiano app\\content.js', 'w', encoding='utf-8') as f:
    f.write('const contentData = ')
    json.dump(new_contentData, f, ensure_ascii=False, indent=2)
    f.write(';\n')

with open('d:\\PROJECTS\\Italiano app\\content.json', 'w', encoding='utf-8') as f:
    json.dump(new_contentData, f, ensure_ascii=False, indent=2)

print("Restructured successfully!")