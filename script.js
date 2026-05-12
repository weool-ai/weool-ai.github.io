// Словник завантажується з content.js у глобальну змінну contentData


let xp = 0;
let streak = 0;
let currentWord = null;
let currentMode = 'quiz';
let isFlipped = false;
let hasSeenTranslation = false;
let hasEarnedXP = false;
let cardLocked = false;
let reviewMode = false;
let currentActiveLevelId = null;
let userProgress = { currentLevel: 1, completedLevels: [] };
let userVocabulary = JSON.parse(localStorage.getItem('userVocabulary')) || [];
let userProfile = JSON.parse(localStorage.getItem('userProfile')) || { notes: {} };
let currentCorrection = null;
let correctionTimeout = null;
let dailyGoal = JSON.parse(localStorage.getItem('dailyGoal')) || { date: new Date().toDateString(), completed: 0 };
let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled')) !== false; // default true

const soundFx = {
    correct: new Audio('data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQUAAAAA'),
    wrong: new Audio('data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQUAAAAA'),
    click: new Audio('data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQUAAAAA')
};

function playSound(type) {
    if (!soundEnabled || !soundFx[type]) return;
    soundFx[type].currentTime = 0;
    soundFx[type].play().catch(() => {});
}

function playCorrect() { playSound('correct'); }
function playWrong() { playSound('wrong'); }
function playClick() { playSound('click'); }

function speak(text, slow = false) {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = slow ? 0.5 : 1.0;
    window.speechSynthesis.speak(utterance);
}

function startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Ваш браузер не підтримує розпізнавання голосу.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        document.getElementById('flash-feedback').textContent = 'Слухаю...';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const confidence = event.results[0][0].confidence;
        const correctWord = getDisplayWord(currentWord).toLowerCase().trim();

        if (confidence > 0.8 && transcript === correctWord) {
            document.getElementById('flash-feedback').textContent = 'Чудово! Правильна вимова. ✅';
            playCorrect();
            // Можна додати XP
            earnXP(10);
        } else if (confidence <= 0.8) {
            document.getElementById('flash-feedback').textContent = 'Спробуйте ще раз, вимовте чіткіше.';
        } else {
            document.getElementById('flash-feedback').textContent = `Неправильно. Ви сказали: "${transcript}". Правильно: "${correctWord}".`;
            playWrong();
        }
    };

    recognition.onerror = (event) => {
        document.getElementById('flash-feedback').textContent = 'Помилка розпізнавання. Спробуйте ще раз.';
    };

    recognition.onend = () => {
        // Можна додати таймер для повтору
    };

    recognition.start();
}

class ContentProvider {
    constructor(contentData) {
        this.data = contentData || { sections: {}, articleVariants: {} };
        this.words = this.flattenWords();
    }

    flattenWords() {
        return Object.values(this.data.sections || {}).flatMap(section => section.vocabulary || []);
    }

    getAllWords() {
        return [...this.words];
    }

    getWordById(id) {
        return this.words.find(w => w.id === id);
    }

    getRandomWord(filterFn = () => true) {
        const pool = this.words.filter(filterFn);
        return pool[Math.floor(Math.random() * pool.length)];
    }

    filterByLevel(level) {
        return this.words.filter(w => w.level === level);
    }

    filterByCategory(category) {
        return this.words.filter(w => w.cat === category);
    }

    filter({ level, cat } = {}) {
        return this.words.filter(w => {
            if (level && w.level !== level) return false;
            if (cat && cat !== 'Усі' && w.cat !== cat) return false;
            return true;
        });
    }

    getFullWord(item) {
        if (!item || !item.word) return '';
        const article = item.word.article || '';
        return article ? `${article} ${item.word.lemma}`.trim() : item.word.lemma;
    }

    getTranslationDistractors(word, count = 2) {
        const pool = this.words
            .filter(w => w.id !== word.id && w.pos === word.pos)
            .map(w => w.ua);

        const unique = [...new Set(pool)];
        const distractors = [];
        while (distractors.length < count && unique.length) {
            const index = Math.floor(Math.random() * unique.length);
            distractors.push(unique.splice(index, 1)[0]);
        }
        return distractors;
    }

    getSectionInfo(levelId) {
        return this.data.sections[levelId] || { title: levelId, description: '', icon: '' };
    }

    generateExercise(wordId) {
        const word = this.getWordById(wordId);
        if (!word) return null;

        return {
            word,
            displayWord: this.getFullWord(word),
            sentence: word.it_sentence,
            correctAnswer: word.ua,
            distractors: this.getTranslationDistractors(word, 2),
            articleDistractors: this.getArticleDistractors(word),
            pos: word.pos
        };
    }
}

const contentProvider = new ContentProvider(contentData);
const vocabulary = contentProvider.getAllWords();

function isVerbItem(item) {
    if (!item || !item.word || !item.word.lemma) return false;
    const lemma = item.word.lemma.toLowerCase();
    return lemma.endsWith('are') || lemma.endsWith('ere') || lemma.endsWith('ire');
}

function getDisplayWord(item) {
    return contentProvider.getFullWord(item);
}

function loadStats() {
    try {
        xp = parseInt(localStorage.getItem('xp')) || 0;
        streak = parseInt(localStorage.getItem('streak')) || 0;
        // Migration: if old format exists, migrate
        const oldXP = localStorage.getItem('italiano_xp');
        if (oldXP && !localStorage.getItem('xp')) {
            xp = parseInt(oldXP);
            localStorage.setItem('xp', xp);
            localStorage.removeItem('italiano_xp');
        }
    } catch (e) {
        console.warn('Error loading stats:', e);
        xp = 0;
        streak = 0;
    }
    updateStats();
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('userProgress');
        if (saved) {
            userProgress = JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Error loading progress:', e);
        userProgress = { completedLevels: [], currentLevel: 1 };
    }
}

function saveProgress() {
    try {
        localStorage.setItem('userProgress', JSON.stringify(userProgress));
    } catch (e) {
        console.error('Error saving progress:', e);
    }
}

function saveStats() {
    try {
        localStorage.setItem('xp', xp);
        localStorage.setItem('streak', streak);
    } catch (e) {
        console.error('Error saving stats:', e);
    }
}

function switchMode(mode) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('quiz-module').style.display = 'none';
    document.getElementById('cards-module').style.display = 'none';
    document.getElementById('dict-module').style.display = 'none';
    document.getElementById('reading-module').style.display = 'none';
    document.getElementById('media-module').style.display = 'none';
    document.getElementById('profile-module').style.display = 'none';
    document.getElementById('myvocab-module').style.display = 'none';
    document.getElementById('path-section').style.display = 'none';

    if (mode === 'quiz') {
        currentMode = 'quiz';
        document.getElementById('quiz-module').style.display = 'block';
        document.getElementById('btn-quiz').classList.add('active');
        nextQuestion();
    } else if (mode === 'reading') {
        document.getElementById('reading-module').style.display = 'block';
        document.getElementById('btn-reading').classList.add('active');
        renderReadingCatalog();
    } else if (mode === 'media') {
        document.getElementById('media-module').style.display = 'block';
        document.getElementById('btn-media').classList.add('active');
        renderMediaCatalog();
    } else if (mode === 'profile') {
        document.getElementById('profile-module').style.display = 'block';
        document.getElementById('btn-profile').classList.add('active');
        renderProfile();
    } else if (mode === 'cards') {
        document.getElementById('cards-module').style.display = 'block';
        document.getElementById('btn-cards').classList.add('active');
        if (reviewMode && currentWord) {
            reviewMode = false;
            renderCurrentFlashCard();
        } else {
            nextFlashCard();
        }
    } else if (mode === 'dict') {
        document.getElementById('dict-module').style.display = 'block';
        document.getElementById('btn-dict').classList.add('active');
        populateDictFilters();
        renderDictionary();
    } else if (mode === 'myvocab') {
        document.getElementById('myvocab-module').style.display = 'block';
        document.getElementById('btn-myvocab').classList.add('active');
        renderMyVocab();
    } else if (mode === 'path') {
        document.getElementById('path-section').style.display = 'block';
        document.getElementById('btn-path').classList.add('active');
        generatePath();
    }
}

// --- ЛОГІКА СЛОВНИКА ---
function populateDictFilters() {
    const allWords = contentProvider.getAllWords();
    const categories = ['Усі', ...new Set(allWords.map(w => w.cat))];
    const levels = ['Усі', ...new Set(allWords.map(w => w.level))];

    const categorySelect = document.getElementById('dict-category');
    const levelSelect = document.getElementById('dict-level');
    categorySelect.innerHTML = categories.map(v => `<option value="${v}">${v}</option>`).join('');
    levelSelect.innerHTML = levels.map(v => `<option value="${v}">${v}</option>`).join('');
}

function renderDictionary() {
    const list = document.getElementById('dictionary-list');
    const searchTerm = document.getElementById('dict-search').value.toLowerCase();
    const selectedCategory = document.getElementById('dict-category').value;
    const selectedLevel = document.getElementById('dict-level').value;
    list.innerHTML = "";

    const filtered = contentProvider.getAllWords().filter(w => {
        const matchText = contentProvider.getFullWord(w).toLowerCase().includes(searchTerm) || w.ua.toLowerCase().includes(searchTerm);
        const matchCat = selectedCategory === 'Усі' || w.cat === selectedCategory;
        const matchLevel = selectedLevel === 'Усі' || w.level === selectedLevel;
        return matchText && matchCat && matchLevel;
    });

    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state">Слова не знайдено. Спробуйте інший фільтр.</div>';
        return;
    }

    filtered.forEach(w => {
        const item = document.createElement('div');
        item.className = 'dict-item';

        const info = document.createElement('div');
        info.className = 'dict-info';

        const itEl = document.createElement('span');
        itEl.className = 'dict-it';
        itEl.textContent = getDisplayWord(w);

        const uaEl = document.createElement('span');
        uaEl.className = 'dict-ua';
        uaEl.textContent = w.ua;

        const speaker = document.createElement('span');
        speaker.className = 'speak-icon';
        speaker.title = 'Послухати слово';
        speaker.textContent = '🔊';
        speaker.addEventListener('click', e => {
            e.stopPropagation();
            playClick();
            speak(getDisplayWord(w), false);
        });

        info.appendChild(itEl);
        const posEl = document.createElement('span');
        posEl.className = 'dict-pos';
        posEl.textContent = w.pos || '';
        info.appendChild(posEl);
        info.appendChild(speaker);
        info.appendChild(uaEl);

        const meta = document.createElement('div');
        meta.className = 'dict-meta';
        meta.innerHTML = `<span class="dict-tag">${w.cat}</span><span class="dict-tag level">${w.level}</span>`;

        item.appendChild(info);
        item.appendChild(meta);

        item.addEventListener('click', () => openCardInReview(w.id));
        list.appendChild(item);
    });
}

function openCardInReview(wordId) {
    const word = contentProvider.getWordById(wordId);
    if (!word) return;
    currentWord = word;
    reviewMode = true;
    cardLocked = false;
    hasSeenTranslation = false;
    hasEarnedXP = false;
    switchMode('cards');
}

function checkTranslation() {
    if (!currentWord) return;
    const answerEl = document.getElementById('flash-answer');
    const feedbackEl = document.getElementById('flash-feedback');
    const guess = answerEl.value.trim().toLowerCase();

    if (!guess) {
        feedbackEl.className = 'flash-feedback warning';
        feedbackEl.innerText = 'Введіть переклад, щоб перевірити.';
        return;
    }

    if (cardLocked) return;

    if (guess === currentWord.ua.toLowerCase()) {
        cardLocked = true;
        hasSeenTranslation = true;

        if (!hasEarnedXP) {
            xp += 15;
            streak++;
            hasEarnedXP = true;
        }
        updateStats();
        feedbackEl.className = 'flash-feedback success';
        feedbackEl.innerText = 'Правильно! +15 XP.';

        setTimeout(nextFlashCard, 1000);
    } else {
        streak = 0;
        updateStats();
        feedbackEl.className = 'flash-feedback danger';
        feedbackEl.innerText = 'Не вірно. Спробуй ще раз або натисни "Не знаю".';
    }
}

// --- ТЕСТИ ТА КАРТКИ (Залишаємо без змін) ---
function nextQuestion() {
    const allWords = contentProvider.getAllWords();
    if (!allWords || allWords.length === 0) {
        document.getElementById('word-display').innerText = 'Завантаження...';
        return;
    }

    currentWord = contentProvider.getRandomWord();
    if (!currentWord) {
        document.getElementById('word-display').innerText = 'Завантаження...';
        return;
    }

    const exercise = contentProvider.generateExercise(currentWord.id);
    document.getElementById('feedback-text').innerText = "";
    document.getElementById('word-display').innerText = exercise.displayWord;
    document.getElementById('word-pos').innerText = exercise.pos || '';

    const choiceSet = new Set([exercise.correctAnswer, ...exercise.distractors]);
    const choices = Array.from(choiceSet).slice(0, 3);
    const extraPool = contentProvider.getAllWords().map(w => w.ua).filter(ua => !choiceSet.has(ua));
    while (choices.length < 3 && extraPool.length) {
        choices.push(extraPool.splice(Math.floor(Math.random() * extraPool.length), 1)[0]);
    }
    choices.sort(() => Math.random() - 0.5);

    const container = document.getElementById('options-container');
    container.innerHTML = "";

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = choice;

        btn.onclick = () => {
            container.querySelectorAll('button').forEach(b => b.disabled = true);
            if (choice === exercise.correctAnswer) {
                btn.classList.add('correct');
                handleCorrect();
            } else {
                btn.classList.add('wrong');
                const correctBtn = Array.from(container.querySelectorAll('button')).find(b => b.innerText === exercise.correctAnswer);
                if (correctBtn) correctBtn.classList.add('correct');
                handleIncorrect();
            }

            setTimeout(() => {
                nextQuestion();
            }, 1200);
        };
        container.appendChild(btn);
    });
}

function handleCorrect() {
    playCorrect();
    streak++;
    updateStats();
}

function handleIncorrect() {
    playWrong();
    streak = 0;
    updateStats();
}

function nextFlashCard() {
    isFlipped = false;
    hasSeenTranslation = false;
    hasEarnedXP = false;
    cardLocked = false;

    if (vocabulary.length === 0) {
        document.getElementById('flash-word').innerText = 'Слов немає';
        document.getElementById('flash-category').innerText = '';
        document.getElementById('flash-hint').innerText = '';
        return;
    }

    let next = currentWord;
    if (vocabulary.length > 1) {
        while (next === currentWord) {
            next = vocabulary[Math.floor(Math.random() * vocabulary.length)];
        }
    } else {
        next = vocabulary[0];
    }
    currentWord = next;

    renderCurrentFlashCard();
}

function renderCurrentFlashCard() {
    if (!currentWord) {
        document.getElementById('flash-word').innerText = 'Завантаження...';
        return;
    }

    isFlipped = false;
    cardLocked = false;
    hasSeenTranslation = false;
    hasEarnedXP = false;

    document.getElementById('flash-word').innerText = getDisplayWord(currentWord);
    document.getElementById('flash-category').innerText = currentWord.cat;
    document.getElementById('flash-hint').innerText = 'Натисни для перекладу';
    document.getElementById('flash-card-element').style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
    document.getElementById('flash-card-element').classList.remove('flipped');
    document.getElementById('flash-feedback').innerText = '';
    document.getElementById('flash-answer').value = '';
}

function flipCard() {
    if (!currentWord || cardLocked) return;

    const cardElement = document.getElementById('flash-card-element');

    if (!isFlipped) {
        document.getElementById('flash-word').innerText = currentWord.ua;
        document.getElementById('flash-hint').innerText = 'Італійською: ' + getDisplayWord(currentWord);
        cardElement.classList.add('flipped');
        cardElement.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        isFlipped = true;
        hasSeenTranslation = true;
    } else {
        document.getElementById('flash-word').innerText = getDisplayWord(currentWord);
        document.getElementById('flash-hint').innerText = 'Натисни для перекладу';
        cardElement.classList.remove('flipped');
        cardElement.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
        isFlipped = false;
    }
}

function finishCard(known) {
    if (!currentWord || cardLocked) return;

    const answerEl = document.getElementById('flash-answer');
    const guess = answerEl.value.trim().toLowerCase();

    if (!hasSeenTranslation && guess) {
        if (guess === currentWord.ua.toLowerCase()) {
            hasSeenTranslation = true;
            hasEarnedXP = true;
            xp += 10;
            streak++;
            updateStats();
            cardLocked = true;
            document.getElementById('flash-feedback').className = 'flash-feedback success';
            document.getElementById('flash-feedback').innerText = 'Правильно, +10 XP.';
            setTimeout(nextFlashCard, 850);
            return;
        } else {
            streak = 0;
            updateStats();
            document.getElementById('flash-feedback').className = 'flash-feedback danger';
            document.getElementById('flash-feedback').innerText = 'Неправильно. Спробуйте ще раз або натисніть "Не знаю".';
            return;
        }
    }

    if (!hasSeenTranslation) {
        document.getElementById('flash-feedback').className = 'flash-feedback warning';
        document.getElementById('flash-feedback').innerText = 'Спочатку натисніть на картку, щоб подивитися переклад.';
        return;
    }

    cardLocked = true;

    if (known) {
        if (!hasEarnedXP) {
            xp += 10;
            hasEarnedXP = true;
        }
        streak++;
        document.getElementById('flash-feedback').className = 'flash-feedback success';
        document.getElementById('flash-feedback').innerText = 'Чудово! +10 XP.';
    } else {
        streak = 0;
        document.getElementById('flash-feedback').className = 'flash-feedback danger';
        document.getElementById('flash-feedback').innerText = 'Добре, повторимо ще раз.';
    }

    updateStats();
    document.getElementById('flash-hint').innerText = 'Почати знову по кнопці';

    setTimeout(nextFlashCard, 850);
}

function updateStats() {
    document.getElementById('xp').innerText = xp;
    document.getElementById('streak').innerText = streak;
    saveStats();
}

function earnXP(amount) {
    xp += amount;
    dailyGoal.completed++;
    localStorage.setItem('dailyGoal', JSON.stringify(dailyGoal));
    updateStats();
}

let learningExercises = [];
let learningIndex = 0;
let learningLevelId = null;
let skippedInLevel = false;
let learningPairsState = null;

function formatItalianWord(item) {
    if (!item || !item.word) return '';
    const article = item.word.article || '';
    if (item.cat === 'Дієслова-дії' || !article.trim()) {
        return item.word.lemma;
    }
    return `${article} ${item.word.lemma}`;
}

function getDisplayWord(item) {
    if (!item || !item.word) return '';
    return formatItalianWord(item);
}

function getLevelOrdinal(levelId) {
    const [level, sub] = levelId.split('-');
    if (level === 'A2') {
        return 20 + (sub ? parseInt(sub, 10) : 1);
    }
    if (level === 'A1') {
        return 1 + (sub ? parseInt(sub, 10) - 1 : 0);
    }
    return sub ? parseInt(sub, 10) : 1;
}

function isLevelUnlocked(levelId) {
    if (userProgress.completedLevels.includes(levelId)) return true;
    const target = getLevelOrdinal(levelId);
    return userProgress.currentLevel >= target;
}

function generatePath() {
    const container = document.getElementById('path-container');
    container.innerHTML = '';

    const levels = [...new Set(contentProvider.getAllWords().map(w => w.level))].sort((a, b) => {
        const aN = getLevelOrdinal(a);
        const bN = getLevelOrdinal(b);
        return aN - bN;
    });

    levels.forEach((levelId, idx) => {
        const levelCard = document.createElement('div');
        levelCard.className = 'level';

        const circle = document.createElement('div');
        circle.className = 'level-circle';
        const sectionInfo = contentProvider.getSectionInfo(levelId);
        circle.textContent = sectionInfo.icon || levelId.replace('A1-', '').replace('A2-', '');

        const info = document.createElement('div');
        info.className = 'level-info';

        const name = document.createElement('div');
        name.className = 'level-name';
        const sectionInfo = contentProvider.getSectionInfo(levelId);
        name.textContent = sectionInfo.title || levelId;

        const desc = document.createElement('div');
        desc.className = 'level-desc';
        desc.textContent = sectionInfo.description || '10 вправ: вибір, переклад, артикль, пари';

        const theoryBtn = document.createElement('button');
        theoryBtn.className = 'speaker-btn';
        theoryBtn.textContent = '📖';
        theoryBtn.title = 'Теорія';
        theoryBtn.onclick = (e) => { e.stopPropagation(); openTheory(levelId); };

        info.appendChild(name);
        info.appendChild(desc);
        levelCard.appendChild(circle);
        levelCard.appendChild(info);
        levelCard.appendChild(theoryBtn);

        const completed = userProgress.completedLevels.includes(levelId);
        const current = userProgress.currentLevel === getLevelOrdinal(levelId);

        if (completed) levelCard.classList.add('completed');
        else if (current) levelCard.classList.add('current');
        else levelCard.classList.add('locked');

        levelCard.addEventListener('click', () => openLevel(levelId));

        if (!isLevelUnlocked(levelId)) {
            levelCard.classList.add('locked');
        }

        container.appendChild(levelCard);
    });
}

function openLevel(levelId) {
    playClick();

    const pathSection = document.getElementById('path-section');
    const learningScreen = document.getElementById('learning-screen');
    const theoryScreen = document.getElementById('theory-screen');

    if (!isLevelUnlocked(levelId)) {
        const el = Array.from(document.querySelectorAll('.level')).find(x => x.querySelector('.level-circle').textContent === levelId.split('-')[1]);
        if (el) {
            el.classList.add('shake');
            setTimeout(() => el.classList.remove('shake'), 450);
        }
        return;
    }

    currentActiveLevelId = levelId;
    learningLevelId = levelId;
    pathSection.style.display = 'none';
    learningScreen.style.display = 'none';
    openTheory(levelId);
}

function openTheory(levelId) {
    const theoryScreen = document.getElementById('theory-screen');
    const pathSection = document.getElementById('path-section');
    const theoryText = document.getElementById('theory-text');
    const theoryTitle = document.getElementById('theory-title');
    const theme = (window.levelTheory && window.levelTheory[levelId]) ? window.levelTheory[levelId] : 'Тут має бути коротка граматична довідка по цьому рівню.';

    const sectionInfo = contentProvider.getSectionInfo(levelId);
    theoryTitle.textContent = `Теорія: ${sectionInfo.title || levelId}`;
    const sampleWord = contentProvider.getAllWords().find(w => w.level === levelId) || contentProvider.getAllWords()[0] || null;
    theoryText.innerHTML = `<p>${theme}</p><p>Приклади:</p><ul><li>${sampleWord ? getDisplayWord(sampleWord) : '...' } - ${sampleWord ? sampleWord.ua : '...'}</li></ul>`;

    document.getElementById('start-practice-btn').onclick = () => {
        theoryScreen.style.display = 'none';
        startLevel(levelId);
    };

    theoryScreen.style.display = 'flex';
    pathSection.style.display = 'none';
}

function closeTheory() {
    document.getElementById('theory-screen').style.display = 'none';
    document.getElementById('path-section').style.display = 'block';
}

function createExercisesForLevel(levelId) {
    const words = contentProvider.filterByLevel(levelId);
    const exercises = [];

    if (words.length === 0) {
        return exercises;
    }

    for (let i = 0; i < 10; i++) {
        const type = ['choice', 'translation', 'article', 'pairs'][Math.floor(Math.random() * 4)];
        const word = words[Math.floor(Math.random() * words.length)];
        const exercise = contentProvider.generateExercise(word.id);
        exercises.push({ type, word: exercise.word, exercise });
    }

    if (exercises.length === 0) {
        const sample = words[0];
        exercises.push({ type: 'choice', word: sample, exercise: contentProvider.generateExercise(sample.id) });
    }

    return exercises;
}

function startLevel(levelId) {
    if (userProgress.completedLevels.includes(levelId)) {
        alert('Рівень вже пройдено!');
        return;
    }

    if (!isLevelUnlocked(levelId)) {
        alert('Рівень заблоковано. Пройдіть попередні рівні.');
        return;
    }

    learningLevelId = levelId;
    skippedInLevel = false;
    learningExercises = createExercisesForLevel(levelId);
    learningIndex = 0;
    learningPairsState = null;

    document.getElementById('learning-screen').style.display = 'flex';
    renderCurrentExercise();
    updateLearningProgress();

    document.getElementById('skip-task-btn').onclick = skipCurrentTask;
}

function updateLearningProgress() {
    const fill = document.getElementById('learning-progress-fill');
    if (!fill) return;
    const percent = Math.floor((learningIndex / Math.max(learningExercises.length, 1)) * 100);
    fill.style.width = `${percent}%`;
}

function renderCurrentExercise() {
    const task = document.getElementById('learning-task');
    const controls = document.getElementById('learning-controls');
    task.innerHTML = '';
    controls.innerHTML = '';

    if (learningIndex >= learningExercises.length) {
        completeLevel(learningLevelId, 30);
        return;
    }

    const { type, word } = learningExercises[learningIndex];
    const wordText = getDisplayWord(word);

    const title = document.createElement('p');
    title.innerHTML = `<strong>Вправа ${learningIndex + 1}/10:</strong> ${type}`;
    task.appendChild(title);

    const speakBtn = document.createElement('button');
    speakBtn.className = 'speaker-btn';
    speakBtn.textContent = '🔊';
    speakBtn.onclick = () => { playClick(); speak(wordText, false); };
    task.appendChild(speakBtn);

    if (type === 'choice') {
        task.insertAdjacentHTML('beforeend', `<p>Оберіть переклад для <strong>${wordText}</strong>:</p>`);
        const options = [word.ua];
        while (options.length < 4) {
            const candidate = vocabulary[Math.floor(Math.random() * vocabulary.length)];
            if (!options.includes(candidate.ua)) options.push(candidate.ua);
        }
        options.sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'control-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                if (opt === word.ua) { btn.classList.add('correct'); nextLearningExercise(); }
                else { btn.classList.add('wrong'); playWrong(); }
            };
            controls.appendChild(btn);
        });

    } else if (type === 'translation') {
        task.insertAdjacentHTML('beforeend', `<p>Напишіть переклад слова <strong>${wordText}</strong>:</p>`);
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Введіть тут';
        input.className = 'card-check-input';
        task.appendChild(input);

        const checkBtn = document.createElement('button');
        checkBtn.className = 'control-btn';
        checkBtn.textContent = 'Перевірити';
        checkBtn.onclick = () => {
            if (input.value.trim().toLowerCase() === word.ua.toLowerCase()) {
                playCorrect();
                nextLearningExercise();
            } else {
                playWrong();
                input.style.borderColor = '#c82333';
            }
        };
        controls.appendChild(checkBtn);

    } else if (type === 'article') {
        task.insertAdjacentHTML('beforeend', `<p>Виберіть артикль слова <strong>${word.word.lemma}</strong>:</p>`);
        const articles = ['il', 'lo', 'la', "l'"]; 
        articles.forEach(ar => {
            const btn = document.createElement('button');
            btn.className = 'control-btn';
            btn.textContent = ar;
            btn.onclick = () => {
                if (ar === word.word.article) { playCorrect(); nextLearningExercise(); }
                else { playWrong(); btn.classList.add('wrong'); }
            };
            controls.appendChild(btn);
        });

    } else if (type === 'pairs') {
        const pairWords = vocabulary.filter(w => w.level === learningLevelId).slice(0, 4);
        if (pairWords.length < 2) {
            nextLearningExercise();
            return;
        }

        const ital = pairWords.map(w => w.word.lemma).sort(() => Math.random() - 0.5);
        const uks = pairWords.map(w => w.ua).sort(() => Math.random() - 0.5);

        const pairContainer = document.createElement('div');
        pairContainer.className = 'pairs-grid';

        let selectedIt = null;
        let selectedUa = null;
        learningPairsState = { matchedCount: 0 };

        ital.forEach(item => {
            const b = document.createElement('button');
            b.className = 'control-btn';
            b.textContent = item;
            b.onclick = () => {
                selectedIt = item;
                b.classList.add('active');
            };
            pairContainer.appendChild(b);
        });

        uks.forEach(item => {
            const b = document.createElement('button');
            b.className = 'control-btn';
            b.textContent = item;
            b.onclick = () => {
                selectedUa = item;
                b.classList.add('active');
                if (selectedIt && selectedUa) {
                    const pair = pairWords.find(w => w.word.lemma === selectedIt && w.ua === selectedUa);
                    if (pair) {
                        playCorrect();
                        learningPairsState.matchedCount += 1;
                        if (learningPairsState.matchedCount >= pairWords.length) nextLearningExercise();
                    } else {
                        playWrong();
                    }
                    selectedIt = null;
                    selectedUa = null;
                    Array.from(pairContainer.querySelectorAll('button')).forEach(b => b.classList.remove('active'));
                }
            };
            pairContainer.appendChild(b);
        });

        task.appendChild(pairContainer);
    }

    updateLearningProgress();
}

function nextLearningExercise() {
    learningIndex += 1;
    if (learningIndex >= learningExercises.length) {
        completeLevel(learningLevelId, 30);
        return;
    }
    renderCurrentExercise();
}

function skipCurrentTask() {
    playClick();
    skippedInLevel = true;
    
    // Show correct answer briefly
    const currentEx = learningExercises[currentExerciseIndex];
    if (currentEx && currentEx.exercise) {
        showCorrectAnswer(currentEx.exercise.correctAnswer);
        setTimeout(() => {
            nextLearningExercise();
        }, 2000);
    } else {
        nextLearningExercise();
    }
    
    // Add to review queue (for future implementation)
    if (currentEx && currentEx.word) {
        // TODO: add to review queue
    }
}

function showCorrectAnswer(correctAnswer) {
    const feedback = document.getElementById('exercise-feedback');
    feedback.textContent = `Правильна відповідь: ${correctAnswer}`;
    feedback.className = 'exercise-feedback correct';
    feedback.style.display = 'block';
}

function completeLevel(levelId, gainXP = 25) {
    if (!userProgress.completedLevels.includes(levelId)) userProgress.completedLevels.push(levelId);
    const ordinal = getLevelOrdinal(levelId);
    if (userProgress.currentLevel <= ordinal) userProgress.currentLevel = ordinal + 1;

    if (!skippedInLevel) {
        xp += gainXP;
        streak += 1;
    } else {
        // Reset streak if skipped
        streak = 0;
    }
    skippedInLevel = false; // Reset for next level
    
    updateStats();
    saveProgress();
    generatePath();

    document.getElementById('learning-screen').style.display = 'none';
    document.getElementById('path-section').style.display = 'block';

    playCorrect();
}

function closeExercise() {
    document.getElementById('exercise-modal').style.display = 'none';
}

// --- ЛОГІКА ЧИТАННЯ ---
function renderReadingCatalog() {
    const catalog = document.getElementById('reading-catalog');
    catalog.innerHTML = '';
    contentData.readingTexts.forEach(text => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${text.title}</h3><p>Рівень: ${text.level}</p>`;
        card.onclick = () => renderReadingText(text);
        catalog.appendChild(card);
    });
}

function renderReadingText(text) {
    const textDiv = document.getElementById('reading-text');
    textDiv.innerHTML = text.text.split(' ').map(word => `<span onclick="showWordPopup('${word.replace(/'/g, "\\'")}')">${word}</span>`).join(' ');
    document.getElementById('reading-catalog').style.display = 'none';
    textDiv.style.display = 'block';
}

async function showWordPopup(word) {
    // Спростимо: використовуємо вбудований словник або API
    const translation = await getTranslation(word);
    const definition = 'Визначення не доступне'; // Для простоти
    const example = 'Приклад не доступний';

    document.getElementById('popup-word').textContent = word;
    document.getElementById('popup-translation').textContent = `Переклад: ${translation}`;
    document.getElementById('popup-definition').textContent = `Тлумачення: ${definition}`;
    document.getElementById('popup-example').textContent = `Приклад: ${example}`;
    document.getElementById('word-popup').style.display = 'flex';
}

async function getTranslation(word) {
    // Використовуємо LibreTranslate API (безкоштовний)
    try {
        const response = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: word,
                source: 'it',
                target: 'uk'
            })
        });
        const data = await response.json();
        return data.translatedText || 'Переклад не знайдено';
    } catch (e) {
        return 'Переклад не доступний';
    }
}

function addToUserVocab() {
    const word = document.getElementById('popup-word').textContent;
    const translation = document.getElementById('popup-translation').textContent.replace('Переклад: ', '');
    if (!userVocabulary.find(v => v.it === word)) {
        userVocabulary.push({ it: word, ua: translation });
        localStorage.setItem('userVocabulary', JSON.stringify(userVocabulary));
        alert('Додано до словника!');
    } else {
        alert('Вже в словнику!');
    }
    closePopup();
}

function closePopup() {
    document.getElementById('word-popup').style.display = 'none';
}

// --- ЛОГІКА МИЙ СЛОВНИК ---
function addToMyVocab() {
    const it = document.getElementById('myvocab-it').value.trim();
    const ua = document.getElementById('myvocab-ua').value.trim();
    if (it && ua) {
        userVocabulary.push({ it, ua });
        localStorage.setItem('userVocabulary', JSON.stringify(userVocabulary));
        document.getElementById('myvocab-it').value = '';
        document.getElementById('myvocab-ua').value = '';
        renderMyVocab();
    }
}

function renderMyVocab() {
    const list = document.getElementById('myvocab-list');
    list.innerHTML = '';
    userVocabulary.forEach((vocab, index) => {
        const item = document.createElement('div');
        item.className = 'card';
        item.innerHTML = `<p><strong>${vocab.it}</strong> - ${vocab.ua}</p><button onclick="removeFromMyVocab(${index})">Видалити</button>`;
        list.appendChild(item);
    });
}

function removeFromMyVocab(index) {
    userVocabulary.splice(index, 1);
    localStorage.setItem('userVocabulary', JSON.stringify(userVocabulary));
    renderMyVocab();
}

// --- ЛОГІКА МЕДІА-ТЕКИ ---
function renderMediaCatalog() {
    const catalog = document.getElementById('media-catalog');
    catalog.innerHTML = '';
    contentData.podcasts.forEach(podcast => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${podcast.title}</h3>
            <p>Рівень: ${podcast.level}</p>
            <p>Тривалість: ${podcast.duration}</p>
        `;
        card.onclick = () => playPodcast(podcast);
        catalog.appendChild(card);
    });
}

function playPodcast(podcast) {
    const player = document.getElementById('audio-player');
    player.src = podcast.url;
    player.load();
    document.getElementById('media-catalog').style.display = 'none';
    document.getElementById('media-player').style.display = 'block';
    player.play();

    player.onended = () => {
        document.querySelector('.summary-section').style.display = 'block';
    };
}

function saveSummary() {
    const summary = document.getElementById('summary-text').value.trim();
    if (summary) {
        const podcastId = document.getElementById('audio-player').src.split('/').pop().split('.')[0];
        userProfile.notes[podcastId] = summary;
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        alert('Резюме збережено!');
        document.getElementById('summary-text').value = '';
    }
}

function backToMediaCatalog() {
    document.getElementById('audio-player').pause();
    document.getElementById('media-player').style.display = 'none';
    document.querySelector('.summary-section').style.display = 'none';
    document.getElementById('media-catalog').style.display = 'grid';
}

// --- КОРЕКТОР ---
function nextCorrectionExercise() {
    const exercises = contentData.correctionExercises;
    currentCorrection = exercises[Math.floor(Math.random() * exercises.length)];
    const textElement = document.getElementById('correction-text');
    textElement.innerHTML = currentCorrection.text.split(' ').map(word => `<span onclick="checkWord('${word}')">${word}</span>`).join(' ');
    document.getElementById('correction-result').style.display = 'none';
    document.getElementById('floating-input').style.display = 'none';

    // Таймер для пульсації
    correctionTimeout = setTimeout(() => {
        const spans = textElement.querySelectorAll('span');
        spans.forEach(span => {
            if (span.textContent === currentCorrection.errorWord) {
                span.classList.add('error-word');
            }
        });
    }, 15000);
}

function checkWord(word) {
    if (word === currentCorrection.errorWord) {
        clearTimeout(correctionTimeout);
        document.getElementById('floating-input').style.display = 'block';
        document.getElementById('correction-input').focus();
    }
}

function submitCorrection() {
    const input = document.getElementById('correction-input').value.trim();
    if (input === currentCorrection.correctWord) {
        document.getElementById('floating-input').style.display = 'none';
        document.getElementById('before-after').textContent = `Було: ${currentCorrection.errorWord} → Стало: ${currentCorrection.correctWord}`;
        document.getElementById('explanation').textContent = currentCorrection.explanation;
        document.getElementById('correction-result').style.display = 'block';
        earnXP(20);
    } else {
        alert('Неправильно. Спробуйте ще раз.');
    }
}

function nextCorrection() {
    nextCorrectionExercise();
}

// --- ПРОФІЛЬ ---
const ProfileModule = {
    render: function() {
        document.getElementById('profile-xp').textContent = xp;
        document.getElementById('profile-streak').textContent = streak;
        this.updateDailyGoal();
        this.renderNotes();
        document.getElementById('sound-toggle').checked = soundEnabled;
    },

    updateDailyGoal: function() {
        const today = new Date().toDateString();
        if (dailyGoal.date !== today) {
            dailyGoal = { date: today, completed: 0 };
            localStorage.setItem('dailyGoal', JSON.stringify(dailyGoal));
        }
        const progress = Math.min(dailyGoal.completed, 5);
        document.getElementById('daily-progress').textContent = `${progress}/5`;
        document.getElementById('progress-fill').style.width = `${(progress / 5) * 100}%`;
    },

    renderNotes: function() {
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';
        for (const [id, note] of Object.entries(userProfile.notes)) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'card';
            noteDiv.innerHTML = `<p><strong>Подкаст ${id}:</strong> ${note}</p>`;
            notesList.appendChild(noteDiv);
        }
    }
};

function renderProfile() {
    ProfileModule.render();
}

function resetProgress() {
    if (confirm('Ви впевнені, що хочете скинути весь прогрес? Це не можна буде скасувати.')) {
        localStorage.clear();
        xp = 0;
        streak = 0;
        userVocabulary = [];
        userProfile = { notes: {} };
        dailyGoal = { date: new Date().toDateString(), completed: 0 };
        updateStats();
        renderProfile();
        alert('Прогрес скинуто.');
    }
}

document.getElementById('sound-toggle').addEventListener('change', function() {
    soundEnabled = this.checked;
    localStorage.setItem('soundEnabled', soundEnabled);
});

// --- РОЗШИРЕННЯ ПРАКТИКИ ---
function switchPracticeMode(mode) {
    currentMode = mode;
    document.getElementById('main-card').style.display = mode === 'quiz' ? 'block' : 'none';
    document.getElementById('correction-card').style.display = mode === 'correction' ? 'block' : 'none';
    if (mode === 'quiz') {
        nextQuestion();
    } else if (mode === 'correction') {
        nextCorrectionExercise();
    }
}
function startFreeSentence() {
    if (userVocabulary.length === 0) {
        alert('Додайте слова до мого словника спочатку!');
        return;
    }
    const word = userVocabulary[Math.floor(Math.random() * userVocabulary.length)];
    const sentence = prompt(`Створіть речення з словом "${word.it}" (${word.ua}):`);
    if (sentence) {
        // Тут можна додати перевірку з AI, але для простоти просто зберігаємо
        alert('Речення збережено!');
    }
}

function startFillBlanks() {
    // Використовуємо тексти з content.js
    const text = contentData.readingTexts[0].text; // Для прикладу перший текст
    const words = text.split(' ');
    const blanks = words.map(w => Math.random() > 0.7 ? '___' : w).join(' ');
    const answer = prompt(`Заповніть пропуски:\n${blanks}`);
    if (answer) {
        alert('Відповідь збережена!');
    }
}

function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
}

function initApp() {
    loadStats();
    loadProgress();
    nextQuestion();
    populateDictFilters();
    renderDictionary();
    generatePath();
    document.getElementById('sound-toggle').checked = soundEnabled;
    hideLoading();
}

function waitForContentData() {
    showLoading();
    if (window.contentData && Object.keys(window.contentData).length) {
        initApp();
    } else {
        setTimeout(waitForContentData, 50);
    }
}

window.onload = waitForContentData;
