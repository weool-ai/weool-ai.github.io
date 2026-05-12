const vocabulary = [
    {
        id: 1,
        word: { it: "Buongiorno", ar: "", lemma: "Buongiorno" },
        ua: "Доброго ранку",
        cat: "Привітання",
        level: "A1",
        it_sentence: "___ è il saluto del mattino.",
        correct: "Buongiorno",
        distractors: ["Il Buongiorno", "La Buongiorno"]
    },
    {
        id: 2,
        word: { it: "Grazie", ar: "", lemma: "Grazie" },
        ua: "Дякую",
        cat: "Привітання",
        level: "A1",
        it_sentence: "Dico ___ per la cortesia.",
        correct: "Grazie",
        distractors: ["Il Grazie", "La Grazie"]
    },
    {
        id: 3,
        word: { it: "il Pane", ar: "il", lemma: "Pane" },
        ua: "Хліб",
        cat: "Їжа",
        level: "A1",
        it_sentence: "Mangio ___ ogni giorno.",
        correct: "il pane",
        distractors: ["la pane", "lo pane"]
    },
    {
        id: 4,
        word: { it: "l'Acqua", ar: "l'", lemma: "Acqua" },
        ua: "Вода",
        cat: "Їжа",
        level: "A1",
        it_sentence: "Bevo ___ fresca.",
        correct: "l'acqua",
        distractors: ["il acqua", "la acqua"]
    },
    {
        id: 5,
        word: { it: "il Lavoro", ar: "il", lemma: "Lavoro" },
        ua: "Робота",
        cat: "Робота",
        level: "A2",
        it_sentence: "Cerco ___ nuovo.",
        correct: "il lavoro",
        distractors: ["la lavoro", "lo lavoro"]
    },
    {
        id: 6,
        word: { it: "il Viaggio", ar: "il", lemma: "Viaggio" },
        ua: "Подорож",
        cat: "Подорожі",
        level: "A2",
        it_sentence: "Faccio ___ in Italia.",
        correct: "il viaggio",
        distractors: ["la viaggio", "lo viaggio"]
    },
    {
        id: 7,
        word: { it: "Ciao", ar: "", lemma: "Ciao" },
        ua: "Привіт",
        cat: "Привітання",
        level: "A1",
        it_sentence: "Dico ___ agli amici.",
        correct: "Ciao",
        distractors: ["Il Ciao", "La Ciao"]
    },
    {
        id: 8,
        word: { it: "Per favore", ar: "", lemma: "Per favore" },
        ua: "Будь ласка",
        cat: "Привітання",
        level: "A1",
        it_sentence: "Chiedo ___ aiuto.",
        correct: "Per favore",
        distractors: ["Il per favore", "La per favore"]
    },
    {
        id: 9,
        word: { it: "Scusa", ar: "", lemma: "Scusa" },
        ua: "Вибач",
        cat: "Привітання",
        level: "A1",
        it_sentence: "Chiedo ___ per l'errore.",
        correct: "Scusa",
        distractors: ["Il Scusa", "La Scusa"]
    },
    {
        id: 10,
        word: { it: "la Casa", ar: "la", lemma: "Casa" },
        ua: "Дім",
        cat: "Життя",
        level: "A1",
        it_sentence: "Vivo in ___ grande.",
        correct: "la casa",
        distractors: ["il casa", "lo casa"]
    },
    {
        id: 11,
        word: { it: "la Scuola", ar: "la", lemma: "Scuola" },
        ua: "Школа",
        cat: "Освіта",
        level: "A1",
        it_sentence: "Vado a ___ ogni giorno.",
        correct: "la scuola",
        distractors: ["il scuola", "lo scuola"]
    },
    {
        id: 12,
        word: { it: "l'Amico", ar: "l'", lemma: "Amico" },
        ua: "Друг",
        cat: "Люди",
        level: "A2",
        it_sentence: "Ho ___ fidato.",
        correct: "l'amico",
        distractors: ["il amico", "la amico"]
    },
    {
        id: 13,
        word: { it: "il Sole", ar: "il", lemma: "Sole" },
        ua: "Сонце",
        cat: "Природа",
        level: "A2",
        it_sentence: "___ splende di giorno.",
        correct: "il sole",
        distractors: ["la sole", "lo sole"]
    },
    {
        id: 14,
        word: { it: "la Notte", ar: "la", lemma: "Notte" },
        ua: "Ніч",
        cat: "Природа",
        level: "A2",
        it_sentence: "Di ___ dormo.",
        correct: "la notte",
        distractors: ["il notte", "lo notte"]
    },
    {
        id: 15,
        word: { it: "la Macchina", ar: "la", lemma: "Macchina" },
        ua: "Автомобіль",
        cat: "Транспорт",
        level: "A2",
        it_sentence: "Guido ___ veloce.",
        correct: "la macchina",
        distractors: ["il macchina", "lo macchina"]
    },
    // Adding more words
    {
        id: 16,
        word: { it: "il Caffè", ar: "il", lemma: "Caffè" },
        ua: "Кава",
        cat: "Їжа",
        level: "A1",
        it_sentence: "Bevo ___ al mattino.",
        correct: "il caffè",
        distractors: ["la caffè", "lo caffè"]
    },
    {
        id: 17,
        word: { it: "la Pizza", ar: "la", lemma: "Pizza" },
        ua: "Піца",
        cat: "Їжа",
        level: "A1",
        it_sentence: "Mangio ___ italiana.",
        correct: "la pizza",
        distractors: ["il pizza", "lo pizza"]
    },
    {
        id: 18,
        word: { it: "il Libro", ar: "il", lemma: "Libro" },
        ua: "Книга",
        cat: "Освіта",
        level: "A1",
        it_sentence: "Leggo ___ interessante.",
        correct: "il libro",
        distractors: ["la libro", "lo libro"]
    },
    {
        id: 19,
        word: { it: "la Famiglia", ar: "la", lemma: "Famiglia" },
        ua: "Сім'я",
        cat: "Люди",
        level: "A1",
        it_sentence: "Amo ___ mia.",
        correct: "la famiglia",
        distractors: ["il famiglia", "lo famiglia"]
    },
    {
        id: 20,
        word: { it: "il Tempo", ar: "il", lemma: "Tempo" },
        ua: "Час",
        cat: "Життя",
        level: "A2",
        it_sentence: "Non ho ___ libero.",
        correct: "il tempo",
        distractors: ["la tempo", "lo tempo"]
    },
    {
        id: 21,
        word: { it: "la Città", ar: "la", lemma: "Città" },
        ua: "Місто",
        cat: "Життя",
        level: "A2",
        it_sentence: "Vivo in ___ grande.",
        correct: "la città",
        distractors: ["il città", "lo città"]
    },
    {
        id: 22,
        word: { it: "il Mare", ar: "il", lemma: "Mare" },
        ua: "Море",
        cat: "Природа",
        level: "A2",
        it_sentence: "Vedo ___ blu.",
        correct: "il mare",
        distractors: ["la mare", "lo mare"]
    },
    {
        id: 23,
        word: { it: "la Montagna", ar: "la", lemma: "Montagna" },
        ua: "Гора",
        cat: "Природа",
        level: "A2",
        it_sentence: "Salgo ___ alta.",
        correct: "la montagna",
        distractors: ["il montagna", "lo montagna"]
    },
    {
        id: 24,
        word: { it: "il Cane", ar: "il", lemma: "Cane" },
        ua: "Собака",
        cat: "Тварини",
        level: "A1",
        it_sentence: "Ho ___ fedele.",
        correct: "il cane",
        distractors: ["la cane", "lo cane"]
    },
    {
        id: 25,
        word: { it: "il Gatto", ar: "il", lemma: "Gatto" },
        ua: "Кіт",
        cat: "Тварини",
        level: "A1",
        it_sentence: "Il ___ è nero.",
        correct: "il gatto",
        distractors: ["la gatto", "lo gatto"]
    },
    {
        id: 26,
        word: { it: "la Mano", ar: "la", lemma: "Mano" },
        ua: "Рука",
        cat: "Тіло",
        level: "A1",
        it_sentence: "Alzo ___ destra.",
        correct: "la mano",
        distractors: ["il mano", "lo mano"]
    },
    {
        id: 27,
        word: { it: "il Piede", ar: "il", lemma: "Piede" },
        ua: "Нога",
        cat: "Тіло",
        level: "A1",
        it_sentence: "Cammino con ___ sinistro.",
        correct: "il piede",
        distractors: ["la piede", "lo piede"]
    },
    {
        id: 28,
        word: { it: "la Testa", ar: "la", lemma: "Testa" },
        ua: "Голова",
        cat: "Тіло",
        level: "A1",
        it_sentence: "Ho male a ___ .",
        correct: "la testa",
        distractors: ["il testa", "lo testa"]
    },
    {
        id: 29,
        word: { it: "il Cuore", ar: "il", lemma: "Cuore" },
        ua: "Серце",
        cat: "Тіло",
        level: "A2",
        it_sentence: "Il ___ batte forte.",
        correct: "il cuore",
        distractors: ["la cuore", "lo cuore"]
    },
    {
        id: 30,
        word: { it: "la Bocca", ar: "la", lemma: "Bocca" },
        ua: "Рот",
        cat: "Тіло",
        level: "A2",
        it_sentence: "Apro ___ per parlare.",
        correct: "la bocca",
        distractors: ["il bocca", "lo bocca"]
    },
    {
        id: 31,
        word: { it: "Mangiare", ar: "", lemma: "Mangiare" },
        ua: "Їсти",
        cat: "Дієслова-дії",
        level: "A1",
        it_sentence: "Mi piace ___ pasta.",
        correct: "Mangiare",
        distractors: ["Bere", "Dormire"]
    },
    {
        id: 32,
        word: { it: "Bere", ar: "", lemma: "Bere" },
        ua: "Пити",
        cat: "Дієслова-дії",
        level: "A1",
        it_sentence: "Voglio ___ vino.",
        correct: "Bere",
        distractors: ["Mangiare", "Dormire"]
    },
    {
        id: 33,
        word: { it: "Dormire", ar: "", lemma: "Dormire" },
        ua: "Спати",
        cat: "Дієслова-дії",
        level: "A1",
        it_sentence: "Ho bisogno di ___ .",
        correct: "Dormire",
        distractors: ["Parlare", "Leggere"]
    },
    {
        id: 34,
        word: { it: "Parlare", ar: "", lemma: "Parlare" },
        ua: "Говорити",
        cat: "Дієслова-дії",
        level: "A1",
        it_sentence: "Imparo ___ italiano.",
        correct: "Parlare",
        distractors: ["Scrivere", "Correre"]
    },
    {
        id: 35,
        word: { it: "Leggere", ar: "", lemma: "Leggere" },
        ua: "Читати",
        cat: "Дієслова-дії",
        level: "A1",
        it_sentence: "Mi piace ___ libri.",
        correct: "Leggere",
        distractors: ["Scrivere", "Ballare"]
    },
    {
        id: 36,
        word: { it: "Scrivere", ar: "", lemma: "Scrivere" },
        ua: "Писати",
        cat: "Дієслова-дії",
        level: "A1",
        it_sentence: "Imparo ___ lettere.",
        correct: "Scrivere",
        distractors: ["Leggere", "Correre"]
    },
    {
        id: 37,
        word: { it: "Correre", ar: "", lemma: "Correre" },
        ua: "Бігти",
        cat: "Дієслова-дії",
        level: "A2",
        it_sentence: "Mi piace ___ al parco.",
        correct: "Correre",
        distractors: ["Nuotare", "Cantare"]
    },
    {
        id: 38,
        word: { it: "Nuotare", ar: "", lemma: "Nuotare" },
        ua: "Плавати",
        cat: "Дієслова-дії",
        level: "A2",
        it_sentence: "Imparo ___ in piscina.",
        correct: "Nuotare",
        distractors: ["Cantare", "Ballare"]
    },
    {
        id: 39,
        word: { it: "Cantare", ar: "", lemma: "Cantare" },
        ua: "Співати",
        cat: "Дієслова-дії",
        level: "A2",
        it_sentence: "Mi piace ___ canzoni.",
        correct: "Cantare",
        distractors: ["Nuotare", "Ballare"]
    },
    {
        id: 40,
        word: { it: "Ballare", ar: "", lemma: "Ballare" },
        ua: "Танцювати",
        cat: "Дієслова-дії",
        level: "A2",
        it_sentence: "Voglio imparare ___ salsa.",
        correct: "Ballare",
        distractors: ["Cantare", "Correre"]
    },
    {
        id: 41,
        word: { it: "il Grande", ar: "il", lemma: "Grande" },
        ua: "Великий",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "La casa è ___ .",
        correct: "il grande",
        distractors: ["la grande", "lo grande"]
    },
    {
        id: 42,
        word: { it: "il Piccolo", ar: "il", lemma: "Piccolo" },
        ua: "Маленький",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "Il cane è ___ .",
        correct: "il piccolo",
        distractors: ["la piccolo", "lo piccolo"]
    },
    {
        id: 43,
        word: { it: "il Bello", ar: "il", lemma: "Bello" },
        ua: "Гарний",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "Il panorama è ___ .",
        correct: "il bello",
        distractors: ["la bello", "lo bello"]
    },
    {
        id: 44,
        word: { it: "il Brutto", ar: "il", lemma: "Brutto" },
        ua: "Поганий",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "Il tempo è ___ oggi.",
        correct: "il brutto",
        distractors: ["la brutto", "lo brutto"]
    },
    {
        id: 45,
        word: { it: "il Caldo", ar: "il", lemma: "Caldo" },
        ua: "Гарячий",
        cat: "Прикметники",
        level: "A2",
        it_sentence: "Il caffè è ___ .",
        correct: "il caldo",
        distractors: ["la caldo", "lo caldo"]
    },
    {
        id: 46,
        word: { it: "il Freddo", ar: "il", lemma: "Freddo" },
        ua: "Холодний",
        cat: "Прикметники",
        level: "A2",
        it_sentence: "L'acqua è ___ .",
        correct: "il freddo",
        distractors: ["la freddo", "lo freddo"]
    },
    {
        id: 47,
        word: { it: "il Rosso", ar: "il", lemma: "Rosso" },
        ua: "Червоний",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "Il pomodoro è ___ .",
        correct: "il rosso",
        distractors: ["la rosso", "lo rosso"]
    },
    {
        id: 48,
        word: { it: "il Blu", ar: "il", lemma: "Blu" },
        ua: "Синій",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "Il cielo è ___ .",
        correct: "il blu",
        distractors: ["la blu", "lo blu"]
    },
    {
        id: 49,
        word: { it: "il Verde", ar: "il", lemma: "Verde" },
        ua: "Зелений",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "L'erba è ___ .",
        correct: "il verde",
        distractors: ["la verde", "lo verde"]
    },
    {
        id: 50,
        word: { it: "il Nero", ar: "il", lemma: "Nero" },
        ua: "Чорний",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "Il gatto è ___ .",
        correct: "il nero",
        distractors: ["la nero", "lo nero"]
    },
    {
        id: 51,
        word: { it: "il Bianco", ar: "il", lemma: "Bianco" },
        ua: "Білий",
        cat: "Прикметники",
        level: "A1",
        it_sentence: "La neve è ___ .",
        correct: "il bianco",
        distractors: ["la bianco", "lo bianco"]
    },
    {
        id: 52,
        word: { it: "la Felicità", ar: "la", lemma: "Felicità" },
        ua: "Щастя",
        cat: "Емоції",
        level: "A2",
        it_sentence: "Cerco ___ nella vita.",
        correct: "la felicità",
        distractors: ["il felicità", "lo felicità"]
    },
    {
        id: 53,
        word: { it: "la Tristezza", ar: "la", lemma: "Tristezza" },
        ua: "Сум",
        cat: "Емоції",
        level: "A2",
        it_sentence: "Sento ___ oggi.",
        correct: "la tristezza",
        distractors: ["il tristezza", "lo tristezza"]
    },
    {
        id: 54,
        word: { it: "l'Amore", ar: "l'", lemma: "Amore" },
        ua: "Любов",
        cat: "Емоції",
        level: "A2",
        it_sentence: "Provo ___ per te.",
        correct: "l'amore",
        distractors: ["il amore", "la amore"]
    },
    {
        id: 55,
        word: { it: "la Paura", ar: "la", lemma: "Paura" },
        ua: "Страх",
        cat: "Емоції",
        level: "A2",
        it_sentence: "Ho ___ del buio.",
        correct: "la paura",
        distractors: ["il paura", "lo paura"]
    },
    {
        id: 56,
        word: { it: "la Gioia", ar: "la", lemma: "Gioia" },
        ua: "Радість",
        cat: "Емоції",
        level: "A2",
        it_sentence: "Sento ___ grande.",
        correct: "la gioia",
        distractors: ["il gioia", "lo gioia"]
    },
    {
        id: 57,
        word: { it: "il Numero", ar: "il", lemma: "Numero" },
        ua: "Номер",
        cat: "Числа",
        level: "A1",
        it_sentence: "Scrivo ___ di telefono.",
        correct: "il numero",
        distractors: ["la numero", "lo numero"]
    },
    {
        id: 58,
        word: { it: "l'Ora", ar: "l'", lemma: "Ora" },
        ua: "Година",
        cat: "Час",
        level: "A1",
        it_sentence: "Che ___ è?",
        correct: "l'ora",
        distractors: ["il ora", "la ora"]
    },
    {
        id: 59,
        word: { it: "il Giorno", ar: "il", lemma: "Giorno" },
        ua: "День",
        cat: "Час",
        level: "A1",
        it_sentence: "Oggi è ___ bello.",
        correct: "il giorno",
        distractors: ["la giorno", "lo giorno"]
    },
    {
        id: 60,
        word: { it: "la Settimana", ar: "la", lemma: "Settimana" },
        ua: "Тиждень",
        cat: "Час",
        level: "A1",
        it_sentence: "La ___ ha sette giorni.",
        correct: "la settimana",
        distractors: ["il settimana", "lo settimana"]
    },
    {
        id: 61,
        word: { it: "il Mese", ar: "il", lemma: "Mese" },
        ua: "Місяць",
        cat: "Час",
        level: "A1",
        it_sentence: "Dicembre è ___ freddo.",
        correct: "il mese",
        distractors: ["la mese", "lo mese"]
    },
    {
        id: 62,
        word: { it: "l'Anno", ar: "l'", lemma: "Anno" },
        ua: "Рік",
        cat: "Час",
        level: "A1",
        it_sentence: "___ nuovo inizia.",
        correct: "l'anno",
        distractors: ["il anno", "la anno"]
    },
    // Нові слова для A1-1..A2-5
    { id: 63, word:{it:'il Vento',ar:'il',lemma:'Vento'},ua:'Вітер',cat:'Природа',level:'A1-1',it_sentence:'___ soffia forte.',correct:'il vento',distractors:['la vento','lo vento'] },
    { id: 64, word:{it:'la Pioggia',ar:'la',lemma:'Pioggia'},ua:'Дощ',cat:'Природа',level:'A1-1',it_sentence:'___ cade dal cielo.',correct:'la pioggia',distractors:['il pioggia','lo pioggia'] },
    { id: 65, word:{it:'il Fiore',ar:'il',lemma:'Fiore'},ua:'Квітка',cat:'Природа',level:'A1-1',it_sentence:'Regalo ___ rosa.',correct:'il fiore',distractors:['la fiore','lo fiore'] },
    { id: 66, word:{it:'la Casa',ar:'la',lemma:'Casa'},ua:'Будинок',cat:'Життя',level:'A1-1',it_sentence:'La mia ___ è piccola.',correct:'la casa',distractors:['il casa','lo casa'] },
    { id: 67, word:{it:'il Cane',ar:'il',lemma:'Cane'},ua:'Собака',cat:'Тварини',level:'A1-1',it_sentence:'Ho ___ amico.',correct:'il cane',distractors:['la cane','lo cane'] },
    { id: 68, word:{it:'Mangiare',ar:'',lemma:'Mangiare'},ua:'Їсти',cat:'Дієслова-дії',level:'A1-2',it_sentence:'Mi piace ___ la pizza.',correct:'Mangiare',distractors:['Bere','Dormire'] },
    { id: 69, word:{it:'Bere',ar:'',lemma:'Bere'},ua:'Пити',cat:'Дієслова-дії',level:'A1-2',it_sentence:'Voglio ___ acqua.',correct:'Bere',distractors:['Mangiare','Dormire'] },
    { id: 70, word:{it:'Dormire',ar:'',lemma:'Dormire'},ua:'Спати',cat:'Дієслова-дії',level:'A1-2',it_sentence:'Sto per ___.',correct:'Dormire',distractors:['Parlare','Leggere'] },
    { id: 71, word:{it:'Parlare',ar:'',lemma:'Parlare'},ua:'Говорити',cat:'Дієслова-дії',level:'A1-2',it_sentence:'Posso ___ italiano.',correct:'Parlare',distractors:['Scrivere','Correre'] },
    { id: 72, word:{it:'Leggere',ar:'',lemma:'Leggere'},ua:'Читати',cat:'Дієслова-дії',level:'A1-2',it_sentence:'Voglio ___ un libro.',correct:'Leggere',distractors:['Ballare','Scrivere'] },
    { id: 73, word:{it:'la Scuola',ar:'la',lemma:'Scuola'},ua:'Школа',cat:'Освіта',level:'A1-2',it_sentence:'Vado a ___ domani.',correct:'la scuola',distractors:['il scuola','lo scuola'] },
    { id: 74, word:{it:'il Libro',ar:'il',lemma:'Libro'},ua:'Книга',cat:'Освіта',level:'A1-2',it_sentence:'Leggo ___ ogni sera.',correct:'il libro',distractors:['la libro','lo libro'] },
    { id: 75, word:{it:'la Penna',ar:'la',lemma:'Penna'},ua:'Ручка',cat:'Освіта',level:'A1-2',it_sentence:'Scrivo con ___ blu.',correct:'la penna',distractors:['il penna','lo penna'] },
    { id: 76, word:{it:'il Tavolo',ar:'il',lemma:'Tavolo'},ua:'Стіл',cat:'Життя',level:'A1-2',it_sentence:'Mangiamo al ___.',correct:'il tavolo',distractors:['la tavolo','lo tavolo'] },
    { id: 77, word:{it:'la Sedia',ar:'la',lemma:'Sedia'},ua:'Стілець',cat:'Життя',level:'A1-2',it_sentence:'Siedo sulla ___.',correct:'la sedia',distractors:['il sedia','lo sedia'] },
    { id: 78, word:{it:'il Sole',ar:'il',lemma:'Sole'},ua:'Сонце',cat:'Природа',level:'A1-3',it_sentence:'___ è caldo.',correct:'il sole',distractors:['la sole','lo sole'] },
    { id: 79, word:{it:'la Luna',ar:'la',lemma:'Luna'},ua:'Місяць',cat:'Природа',level:'A1-3',it_sentence:'Di notte vedo ___.',correct:'la luna',distractors:['il luna','lo luna'] },
    { id: 80, word:{it:'la Stella',ar:'la',lemma:'Stella'},ua:'Зірка',cat:'Природа',level:'A1-3',it_sentence:'Guardo le ___.',correct:'la stella',distractors:['il stella','lo stella'] },
    { id: 81, word:{it:'il Mare',ar:'il',lemma:'Mare'},ua:'Море',cat:'Природа',level:'A1-3',it_sentence:'Andiamo al ___.',correct:'il mare',distractors:['la mare','lo mare'] },
    { id: 82, word:{it:'la Montagna',ar:'la',lemma:'Montagna'},ua:'Гора',cat:'Природа',level:'A1-3',it_sentence:'Salgo la ___.',correct:'la montagna',distractors:['il montagna','lo montagna'] },
    { id: 83, word:{it:'il Treno',ar:'il',lemma:'Treno'},ua:'Поїзд',cat:'Транспорт',level:'A1-3',it_sentence:'Prendo ___ oggi.',correct:'il treno',distractors:['la treno','lo treno'] },
    { id: 84, word:{it:'la Macchina',ar:'la',lemma:'Macchina'},ua:'Авто',cat:'Транспорт',level:'A1-3',it_sentence:'Guido la ___.',correct:'la macchina',distractors:['il macchina','lo macchina'] },
    { id: 85, word:{it:'il Biscotto',ar:'il',lemma:'Biscotto'},ua:'Печиво',cat:'Їжа',level:'A1-4',it_sentence:'Mangio un ___.',correct:'il biscotto',distractors:['la biscotto','lo biscotto'] },
    { id: 86, word:{it:'la Frutta',ar:'la',lemma:'Frutta'},ua:'Фрукти',cat:'Їжа',level:'A1-4',it_sentence:'Compro la ___.',correct:'la frutta',distractors:['il frutta','lo frutta'] },
    { id: 89, word:{it:'Acqua',ar:"l'",lemma:'Acqua'},ua:'Вода',cat:'Їжа',level:'A1-4',it_sentence:'Bevo ___.',correct:"l'acqua",distractors:['il acqua','la acqua'] },
    { id: 87, word:{it:'il Pane',ar:'il',lemma:'Pane'},ua:'Хліб',cat:'Їжа',level:'A1-4',it_sentence:'Mangio il ___.',correct:'il pane',distractors:['la pane','lo pane'] },
    { id: 88, word:{it:'la Carne',ar:'la',lemma:'Carne'},ua:"М'ясо",cat:'Їжа',level:'A1-4',it_sentence:'Cuocio la ___.',correct:'la carne',distractors:['il carne','lo carne'] },
    { id: 90, word:{it:'Ballare',ar:'',lemma:'Ballare'},ua:'Танцювати',cat:'Дієслова-дії',level:'A2-1',it_sentence:'Mi piace ___.',correct:'Ballare',distractors:['Cantare','Correre'] },
    { id: 91, word:{it:'Cantare',ar:'',lemma:'Cantare'},ua:'Співати',cat:'Дієслова-дії',level:'A2-1',it_sentence:'Vorrei ___.',correct:'Cantare',distractors:['Ballare','Leggere'] },
    { id: 92, word:{it:'Correre',ar:'',lemma:'Correre'},ua:'Бігти',cat:'Дієслова-дії',level:'A2-1',it_sentence:'Posso ___.',correct:'Correre',distractors:['Camminare','Dormire'] },
    { id: 93, word:{it:'Nuotare',ar:'',lemma:'Nuotare'},ua:'Плавати',cat:'Дієслова-дії',level:'A2-1',it_sentence:'Voglio ___.',correct:'Nuotare',distractors:['Cantare','Leggere'] },
    { id: 94, word:{it:'Scrivere',ar:'',lemma:'Scrivere'},ua:'Писати',cat:'Дієслова-дії',level:'A2-1',it_sentence:'Devo ___.',correct:'Scrivere',distractors:['Leggere','Parlare'] },
    { id: 95, word:{it:'il Tempo',ar:'il',lemma:'Tempo'},ua:'Час',cat:'Час',level:'A2-2',it_sentence:'Ho poco ___.',correct:'il tempo',distractors:['la tempo','lo tempo'] },
    { id: 96, word:{it:'la Notte',ar:'la',lemma:'Notte'},ua:'Ніч',cat:'Час',level:'A2-2',it_sentence:'La ___ è calma.',correct:'la notte',distractors:['il notte','lo notte'] },
    { id: 97, word:{it:"l'Ora",ar:"l'",lemma:'Ora'},ua:'Година',cat:'Час',level:'A2-2',it_sentence:'Che ___ è?',correct:"l'ora",distractors:['il ora','la ora'] },
    { id: 98, word:{it:'il Giorno',ar:'il',lemma:'Giorno'},ua:'День',cat:'Час',level:'A2-2',it_sentence:'Ogni ___.',correct:'il giorno',distractors:['la giorno','lo giorno'] },
    { id: 99, word:{it:'la Settimana',ar:'la',lemma:'Settimana'},ua:'Тиждень',cat:'Час',level:'A2-2',it_sentence:'Sette ___.',correct:'la settimana',distractors:['il settimana','lo settimana'] },
    { id:100, word:{it:'il Viaggio',ar:'il',lemma:'Viaggio'},ua:'Подорож',cat:'Подорожі',level:'A2-3',it_sentence:'Faccio un ___.',correct:'il viaggio',distractors:['la viaggio','lo viaggio'] },
    { id:101, word:{it:'la Festa',ar:'la',lemma:'Festa'},ua:'Свято',cat:'Подорожі',level:'A2-3',it_sentence:'Vado alla ___.',correct:'la festa',distractors:['il festa','lo festa'] },
    { id:102, word:{it:'il Regalo',ar:'il',lemma:'Regalo'},ua:'Подарунок',cat:'Подорожі',level:'A2-3',it_sentence:'Porto un ___.',correct:'il regalo',distractors:['la regalo','lo regalo'] },
    { id:103, word:{it:'Ascoltare',ar:'',lemma:'Ascoltare'},ua:'Слухати',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Mi piace ___ la musica.',correct:'Ascoltare',distractors:['Parlare','Vedere'] },
    { id:104, word:{it:'Capire',ar:'',lemma:'Capire'},ua:'Розуміти',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Non riesco a ___ tutto.',correct:'Capire',distractors:['Sentire','Chiedere'] },
    { id:105, word:{it:'Vivere',ar:'',lemma:'Vivere'},ua:'Жити',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Voglio ___ in Italia.',correct:'Vivere',distractors:['Dormire','Lavorare'] },
    { id:106, word:{it:'Amare',ar:'',lemma:'Amare'},ua:'Любити',cat:'Дієслова-дії',level:'A2-3',it_sentence:'So come ___ te.',correct:'Amare',distractors:['Odiare','Pensare'] },
    { id:107, word:{it:'Viaggiare',ar:'',lemma:'Viaggiare'},ua:'Подорожувати',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Amo ___ in Europa.',correct:'Viaggiare',distractors:['Camminare','Nuotare'] },
    { id:108, word:{it:'Giocare',ar:'',lemma:'Giocare'},ua:'Грати',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Mi piace ___ a calcio.',correct:'Giocare',distractors:['Studiare','Leggere'] },
    { id:109, word:{it:'Lavorare',ar:'',lemma:'Lavorare'},ua:'Працювати',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Devo ___ domani.',correct:'Lavorare',distractors:['Ripetere','Dormire'] },
    { id:110, word:{it:'Cucinare',ar:'',lemma:'Cucinare'},ua:'Готувати',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Mi piace ___ la cena.',correct:'Cucinare',distractors:['Mangiare','Bere'] },
    { id:111, word:{it:'Aprire',ar:'',lemma:'Aprire'},ua:'Відкривати',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Devo ___ la porta.',correct:'Aprire',distractors:['Chiudere','Chiudere'] },
    { id:112, word:{it:'Chiedere',ar:'',lemma:'Chiedere'},ua:'Питати',cat:'Дієслова-дії',level:'A2-3',it_sentence:'Posso ___ una domanda?',correct:'Chiedere',distractors:['Rispondere','Dire'] }
];

const levelTheory = {
    'A1-1': 'Сьогодні вивчаємо базові іменники та артиклі (il, la, l\'). Навчіться ставити правильний артикль перед іменником за родом.',
    'A1-2': 'Закріплюємо дієслова першої групи + побутові іменники. Форма інфінітива дієслова відповідає дії.',
    'A1-3': 'Природа та подорожі. Читаємо, як говорити про погоду і місця.',
    'A1-4': 'Їжа та напої. Артикль з запахом, смаком і кількістю.',
    'A1-5': 'Ще слова для базової діалогу та часів.',
    'A2-1': 'Починаємо відточувати дієслова руху та сторітелінг.',
    'A2-2': 'Часові вирази: день, ніч, година, тиждень.',
    'A2-3': 'Подорожі і плани: улюблені місця, квитки і витрати.'
};

function inferPartOfSpeech(item) {
    if (!item) return 'іменник';
    if (item.pos) return item.pos;
    if (item.cat === 'Дієслова-дії') return 'дієслово';
    if (item.cat === 'Прикметники') return 'прикметник';
    return 'іменник';
}

vocabulary = vocabulary.map(item => ({ ...item, pos: inferPartOfSpeech(item) }));

