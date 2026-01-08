"use client";

import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaCircleXmark } from "react-icons/fa6";

// Types
interface BaseQuestion {
    type: "invertible" | "single" | "multiple" | "fill";
    id: string;
    weight: number;
    tags: string[];
}

interface InvertibleQuestionData extends BaseQuestion {
    type: "invertible";
    text: [string, string];
    options: string[];
    correct: number[];
}

interface MultipleQuestionData extends BaseQuestion {
    type: "multiple";
    text: string;
    options: string[];
    correct: number[];
}

interface SingleQuestionData extends BaseQuestion {
    type: "single";
    text: string;
    options: string[];
    correct: number[];
}

interface FillQuestionData extends BaseQuestion {
    type: "fill";
    text: string;
    tofill: string;
    correct: string[];
}

type QuestionData = InvertibleQuestionData | MultipleQuestionData | SingleQuestionData | FillQuestionData;

interface InvertibleAnswer {
    invertibleIndex: number; // ?? Is that 0,1 for the two versions (direct and invert)?
    selected: number[];
}

type UserAnswers = {
    [key: string]: InvertibleAnswer | number[] | number | string[] | undefined;
};

const getAnswersStyle = (isSelected: boolean, correct: boolean, showResults: boolean) => {
    let bgColor = 'bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900';

    if (showResults) {
        if (isSelected && correct) bgColor = 'bg-green-100 dark:bg-green-800';
        else if (isSelected && !correct) bgColor = 'bg-red-100 dark:bg-red-800';
        else if (!isSelected && correct) bgColor = 'bg-yellow-100 dark:bg-yellow-800';
    } else if (isSelected) {
        bgColor = 'bg-zinc-50 dark:bg-zinc-950';
    }
    return bgColor;
}

interface QuestionProps<T extends QuestionData, A> {
    question: T;
    userAnswer: A | undefined;
    onAnswer: (answer: A) => void;
    showResults: boolean;
}

const InvertibleQuestion = ({
    question,
    userAnswer,
    onAnswer,
    showResults
}: QuestionProps<InvertibleQuestionData, InvertibleAnswer>) => {
    const textIndex = 0;
    const selectedOptions = userAnswer?.selected ?? [];

    const handleOptionToggle = (idx: number) => {
        const newSelected = [...selectedOptions];
        const existingIdx = newSelected.indexOf(idx);
        if (existingIdx > -1) {
            newSelected.splice(existingIdx, 1); // removes 1 element starting at index existingIdx
        } else {
            newSelected.push(idx);
        }
        onAnswer({ invertibleIndex: textIndex, selected: newSelected });
    }

    const isCorrect = (idx: number) => {
        return question.correct[idx] === 1;
    }

    return (
        <div>
            <div
                className="text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: question.text[textIndex] }}
            />
            <div className="space-y-2">
                {question.options.map((opt, idx) => {
                    const isSelected = selectedOptions.includes(idx);
                    const correct = isCorrect(idx);
                    const bgColor = getAnswersStyle(isSelected, correct, showResults);

                    return (
                        <label
                            key={idx}
                            className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${bgColor} ${isSelected ? 'border-zinc-500 dark:border-zinc-800' : 'border-zinc-300 dark:border-zinc-500'
                                }`}>


                            <input
                                checked={isSelected}
                                type="checkbox"
                                onChange={() => handleOptionToggle(idx)}
                                disabled={showResults}
                            />
                            <span dangerouslySetInnerHTML={{ __html: opt }} />
                            {showResults && (
                                <span className="ml-auto">
                                    {correct ? (
                                        <FaCheckCircle className="w-5 h-5 text-green-600" />
                                    ) : isSelected ? (
                                        <FaCircleXmark className="w-5 h-5 text-red-600" />
                                    ) : null}
                                </span>
                            )}
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

const MultipleQuestion = ({
    question,
    userAnswer,
    onAnswer,
    showResults
}: QuestionProps<MultipleQuestionData, number[]>) => {

    const selectedOptions = userAnswer ?? [];

    const handleOptionToggle = (idx: number) => {
        const newSelected = [...selectedOptions];
        const existingIdx = newSelected.indexOf(idx);
        if (existingIdx > -1) {
            newSelected.splice(existingIdx, 1);
        } else {
            newSelected.push(idx);
        }
        onAnswer(newSelected);
    }

    const isCorrect = (idx: number) => {
        return question.correct[idx] === 1;
    }

    return (
        <div className="space-y-4">
            <div
                className="text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: question.text }}
            />
            <div className="space-y-2">
                {question.options.map((opt, idx) => {
                    const isSelected = selectedOptions.includes(idx);
                    const correct = isCorrect(idx);
                    const bgColor = getAnswersStyle(isSelected, correct, showResults);

                    return (
                        <label
                            key={idx}
                            className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${bgColor} ${isSelected ? 'border-zinc-500 dark:border-zinc-800' : 'border-zinc-300 dark:border-zinc-500'
                                }`}>
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleOptionToggle(idx)}
                                disabled={showResults}
                                className="mt-1"
                            />
                            <span dangerouslySetInnerHTML={{ __html: opt }} />
                            {showResults && (
                                <span className="ml-auto">
                                    {correct ? (
                                        <FaCheckCircle className="w-5 h-5 text-green-600" />
                                    ) : isSelected ? (
                                        <FaCircleXmark className="w-5 h-5 text-red-600" />
                                    ) : null}
                                </span>
                            )}
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

const SingleQuestion = ({
    question,
    userAnswer,
    onAnswer,
    showResults
}: QuestionProps<SingleQuestionData, number>) => {
    const handleOptionSelection = (idx: number) => {
        onAnswer(idx);
    }
    const correctIdx = question.correct.indexOf(1);
    return (
        <div className="space-y-4">
            <div
                className="text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: question.text }}
            />
            <div>
                {question.options.map((opt, idx) => {
                    const isSelected = (userAnswer === idx);
                    const correct = (idx === correctIdx);
                    const bgColor = getAnswersStyle(isSelected, correct, showResults);
                    return (
                        <label key={idx}
                            className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${bgColor} ${isSelected ? 'border-zinc-500 dark:border-zinc-800' : 'border-zinc-300 dark:border-zinc-500'
                                }`}>
                            <input
                                type="radio"
                                name={`single-${question.id}`}
                                onChange={() => handleOptionSelection(idx)}
                                disabled={showResults}
                                className="mt-1"
                            />
                            <span dangerouslySetInnerHTML={{ __html: opt }} />
                            <span className="ml-auto">
                                {correct ? (
                                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                                ) : isSelected ? (
                                    <FaCircleXmark className="w-5 h-5 text-red-600" />
                                ) : null}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

const FillQuestion = ({
    question,
    userAnswer,
    onAnswer,
    showResults
}: QuestionProps<FillQuestionData, string[]>) => {
    const answers = userAnswer ?? question.correct.map(() => '');
    const handleInputChange = (idx: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[idx] = value;
        onAnswer(newAnswers);
    }
    const parts = question.tofill.split(/\{\{(\d+)\}\}/);
    let inputIdx = 0;

    return (
        <div>
            <div
                className="text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: question.text }}
            />
            <div className="text-lg leading-relaxed">
                {parts.map((part, idx) => {
                    if (idx % 2 === 0) {
                        return <span key={idx} dangerouslySetInnerHTML={{ __html: part }} />
                    } else {
                        const currentIdx = inputIdx++;
                        const userVal = answers[currentIdx] || '';
                        const correctVal = question.correct[currentIdx];
                        const isCorrect = userVal.toLowerCase().trim() === correctVal.toLowerCase().trim();

                        let borderColor = 'border-gray-300';
                        let bgColor = 'bg-white';

                        if (showResults) {
                            if (isCorrect) {
                                borderColor = 'border-green-500';
                                bgColor = 'bg-green-50';
                            } else {
                                borderColor = 'border-red-500';
                                bgColor = 'bg-red-50';
                            }
                        }
                        return (
                            <span key={idx} className="inline-block mx-1">
                                <input
                                    type="text"
                                    value={userVal}
                                    onChange={(e) => handleInputChange(currentIdx, e.target.value)}
                                    disabled={showResults}
                                    className={`px-2 py-1 border-2 rounded ${borderColor} ${bgColor} min-w-[120px]`}
                                    placeholder="..."
                                />
                                {showResults && !isCorrect && (
                                    <span className="ml-2 text-green-600 font-medium">
                                        ({correctVal})
                                    </span>
                                )}
                            </span>
                        )
                    }
                })}
            </div>
        </div>
    );
}

const QuizApp = () => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(1);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [showResults, setShowResults] = useState<boolean>(false);

    const currentQuestion = quizData[currentQuestionIdx];

    const handleAnswer = (answer: InvertibleAnswer | number[] | number | string[]): void => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestion.id]: answer
        });
    };


    const computeScore = () => {
        let totalScore = 0;
        let earnedScore = 0;
        quizData.forEach(q => {
            totalScore += q.weight;
            const userAns = userAnswers[q.id];
            if (q.type == "invertible") {
                if (!userAns) {
                    return;
                }
                const ans = userAns as InvertibleAnswer;
                const selected = ans.selected || [];
                let correct = true;
                selected.forEach(idx => {
                    if (q.correct[idx] !== 1) {
                        correct = false;
                    }
                });
                q.correct.forEach((val, idx) => {
                    if (val === 1 && !selected.includes(idx)) {
                        correct = false;
                    }
                })
                if (correct) {
                    earnedScore += q.weight;
                }
            }
            if (q.type === "multiple") {
                if (!userAns) {
                    return;
                }
                const ans = userAns as number[];
                const selected = ans || [];
                let correct = true;
                selected.forEach(idx => {
                    if (q.correct[idx] !== 1) {
                        correct = false;
                    }
                });
                q.correct.forEach((val, idx) => {
                    if (val === 1 && !selected.includes(idx)) {
                        correct = false;
                    }
                })
                if (correct) {
                    earnedScore += q.weight;
                }
            }
            if (q.type === "single") {
                const ans = userAns as number;
                if (userAns === undefined) {
                    return;
                }
                if (q.correct[ans] === 1) {
                    earnedScore += q.weight;
                }

            }
            if (q.type === "fill") {
                if (!userAns) {
                    return;
                }
                const ans = userAns as string[];
                let allCorrect = true;
                q.correct.forEach((correctAns, idx) => {
                    const userVal = (ans[idx] || '').toLowerCase().trim();
                    const correctVal = correctAns.toLowerCase().trim();
                    if (userVal !== correctVal) {
                        allCorrect = false;
                    }
                })
                if (allCorrect) {
                    earnedScore += q.weight;
                }
            }
        });
        return {total: totalScore, earned: earnedScore};
    }

    const score = showResults ? computeScore() : null;
    console.log(`S: ${score ? score.earned : ""}`);

    const handleReset = () => {
        setUserAnswers({});
        setShowResults(false);
        setCurrentQuestionIdx(0);
    };

    const handleSubmit = (): void => {
        setShowResults(true);
    };

    const renderQuestion = () => {
        switch (currentQuestion.type) {
            case "invertible":
                return (
                    <InvertibleQuestion
                        question={currentQuestion}
                        userAnswer={userAnswers[currentQuestion.id] as InvertibleAnswer || undefined}
                        onAnswer={handleAnswer}
                        showResults={showResults}
                    />
                );
            case "multiple":
                return (
                    <MultipleQuestion
                        question={currentQuestion}
                        userAnswer={userAnswers[currentQuestion.id] as number[] || undefined}
                        onAnswer={handleAnswer}
                        showResults={showResults}
                    />
                );
            case "single":
                return (
                    <SingleQuestion
                        question={currentQuestion}
                        userAnswer={userAnswers[currentQuestion.id] as number || undefined}
                        onAnswer={handleAnswer}
                        showResults={showResults}
                    />
                );
            case "fill":
                return (
                    <FillQuestion
                        question={currentQuestion}
                        userAnswer={userAnswers[currentQuestion.id] as string[] || undefined}
                        onAnswer={handleAnswer}
                        showResults={showResults}
                    />
                );
            default:
                return <></>
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-zinc-100 dark:bg-zinc-600 rounded-lg shadow-lg p-6">
            <div className="mb-6">
                {renderQuestion()}
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
                    disabled={currentQuestionIdx === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded hover:bg-zinc-300 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaArrowLeft className="w-5 h-5" />
                    Precedente
                </button>

                {showResults ?
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >Reset
                    </button>
                    : (<button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Consegna Test
                    </button>)
                }

                <button
                    onClick={() => setCurrentQuestionIdx(Math.min(currentQuestionIdx + 1, quizData.length - 1))}
                    disabled={currentQuestionIdx === (quizData.length - 1)}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded hover:bg-zinc-300 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Successivo
                    <FaArrowRight className="w-5 h-5" />
                </button>
            </div>

            <div className="mt-6 flex justify-center gap-2 flex-wrap">
                {quizData.map((q, idx) => {
                    const hasAnswer = userAnswers[q.id] !== undefined;
                    let bgColor = 'bg-zinc-200 dark:bg-zinc-800';

                    if (showResults) {
                        bgColor = 'bg-gray-300';
                    } else if (hasAnswer) {
                        bgColor = 'bg-blue-500 text-white';
                    }

                    if (idx === currentQuestionIdx) {
                        bgColor += ' ring-2 ring-zinc-600 dark:ring-zinc-500';
                    }
                    return (
                        <button
                            key={idx}
                            onClick={() => setCurrentQuestionIdx(idx)}
                            className={`w-10 h-10 rounded ${bgColor} hover:opacity-80 transition-all`}
                        >{idx + 1}
                        </button>
                    );
                })}
            </div>

        </div>
    );
}

export default QuizApp;


const quizData: QuestionData[] = [
    {
        "id": "001",
        "type": "invertible",
        "text": [
            "Indica tutte le affermazioni <u>vere</u> riguardanti <b>BIOS e UEFI</b>.",
            "Indica tutte le affermazioni <u>false</u> riguardanti <b>BIOS e UEFI</b>."
        ],
        "options": [
            "Il BIOS UEFI non supporta l'uso del mouse e della tastiera.",
            "La <i>M-flash</i> consente l'aggiornamento del BIOS via USB.",
            "Il BIOS UEFI permette di configurare una password.",
            "L'overclocking da BIOS non genera problemi di surriscaldamento.",
            "Il BIOS UEFI permette di impostare la temperatura <i>target di raffreddamento.</i>"
        ],
        "correct": [0, 1, 1, 0, 1],
        "weight": 2,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "002",
        "type": "multiple",
        "text": "All'avvio di un PC appena assemblato si sentono numerosi beep, cosa è consigliato fare?",
        "options": [
            "Aggiornare il BIOS UEFI per risolvere problemi di incompatibilità hardware.",
            "Verificare quale problema si è verificato sulla base del numero di beep che si sentono.",
            "Proseguire comunque poiché è normale che un computer emetta numerosi beep all'avvio.",
            "Restituire la scheda madre perché è sicuramente difettata.",
            "Contare il numero di beep che si sentono."
        ],
        "correct": [0, 1, 0, 0, 1],
        "weight": 2,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "003",
        "type": "fill",
        "text": "Completa il seguente testo.<br>",
        "tofill": "Durante l'avvio del computer, il {{0}} esegue un check dell'hardware. Ad esempio, rimuovendo i moduli RAM si dovrà sentire un {{1}} che segnala <i>Bad memory</i>.",
        "correct": [
            "POST",
            "beep code"
        ],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "004",
        "type": "invertible",
        "text": [
            "Quali dei seguenti meccanismi di sicurezza sono attivati da BIOS.",
            "Quali dei seguenti meccanismi di sicurezza <u>non</u> sono attivati da BIOS."
        ],
        "options": [
            "Un controllo sul tipo di sistema operativo avviato che impedisce  quelli non autorizzati.",
            "Un meccanismo di tracciamento via Internet del dispositivo.",
            "La cifratura (<i>encryption</i>) dei dati presenti sul drive",
            "Creazione di utenti non amministratori per evitare l'installazione di software dannoso.",
            "Scansione antivirus di tutti i programmi installati."
        ],
        "correct": [1, 1, 1, 0, 0],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "005",
        "type": "invertible",
        "text": [
            "Indica tutte le affermazioni <u>vere</u> riguardanti la <b>CPU</b>.",
            "Indica tutte le affermazioni <u>false</u> riguardanti la <b>CPU</b>."
        ],
        "options": [
            "Le CPU con istruzioni RISC sono più veloci perché ogni istruzione richiede meno tempo.",
            "Le CPU con istruzioni CISC sono più costose perché il chip è più grande.",
            "Se presente, l'<i>Hyper-Threading</i> raddoppia il numero di CPU <i>logiche</i>.",
            "Le prestazioni della CPU dipendono anche dal <i>Front Side Bus (FSB)</i>.",
            "L'<i>overclock</i> è sempre consigliato poiché aumenta le prestazioni."
        ],
        "correct": [0, 0, 1, 1, 0],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "006",
        "type": "invertible",
        "text": [
            "Indica tutte le affermazioni <u>vere</u> riguardanti le CPU <b>multi core</b>.",
            "Indica tutte le affermazioni <u>false</u> riguardanti le CPU <b>multi core</b>."
        ],
        "options": [
            "Le risorse (esempio cache L1) devono essere condivise tra tutti i cori.",
            "Permettono di inserire più unità di elaborazione (<i>core</i>) nello stesso chip.",
            "Permettono di connettere più unità di elaborazione (<i>core</i>) nella stessa scheda madre.",
            "Generano più calore rispetto ai processori single core poiché sono più veloci.",
            "Tutti i core condividono la stessa memoria RAM."
        ],
        "correct": [0, 1, 0, 0, 1],
        "weight": 2,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "007",
        "type": "fill",
        "text": "Completa il seguente testo.<br>",
        "tofill": "Per raffreddare la CPU si usa la {{0}} che distribuisce il calore sulla superficie. Tale calore viene poi disperso dal {{1}} e dalla ventola di raffreddamento della CPU. Questo fa accumulare calore all'interno del case che viene a sua volta raffreddato dalle {{2}} presenti nel case.",
        "correct": [
            "pasta termica",
            "dissipatore",
            "ventole"
        ],
        "weight": 2,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "008",
        "type": "single",
        "text": "Scegli la migliore definizione del termine <b>ridondante</b> (<i>redundant</i> in inglese).",
        "options": [
            "Qualcosa di superfluo, ma utile a qualche scopo.",
            "Qualcosa di inutile che può essere eliminato senza conseguenze.",
            "Qualcosa di eccessivo che può creare problemi.",
            "Qualcosa di necessario per le prestazione e che viene venduto a parte."
        ],
        "correct": [1, 0, 0, 0],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "009",
        "type": "invertible",
        "text": [
            "Indica quali dei seguenti sono vantaggi dell'utilizzo di <b>RAID</b>.",
            "Indica quali dei seguenti <u>non</u> sono vantaggi dell'utilizzo di <b>RAID</b>."
        ],
        "options": [
            "Archiviare dati su più dischi.",
            "Rendere più efficiente l'accesso ai dati.",
            "Creare ridondanza dei dati memorizzati.",
            "Rendere più difficile rubare i dati.",
            "Rendere più energeticamente efficiente lo storage."
        ],
        "correct": [1, 1, 1, 0, 0],
        "weight": 2,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "010",
        "type": "single",
        "text": "Scegli la migliore definizione del termine <b>legacy</b>.",
        "options": [
            "Compatibile con sistemi e tecnologie non più utilizzate.",
            "Non più funzionante la cui riparazione non è possibile.",
            "Legato ad una specifica tecnologie hardware o software.",
            "Distribuito gratuitamente e senza nessuna licenza d'uso."
        ],
        "correct": [1, 0, 0, 0],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "011",
        "type": "invertible",
        "text": [
            "Indica tutte le affermazioni <u>vere</u> riguardanti <b>cavi e connettori SATA</b>.",
            "Indica tutte le affermazioni <u>false</u> riguardanti <b>cavi e connettori SATA</b>."
        ],
        "options": [
            "Il connettore è <i>simmetrico</i>, cioè non ha dritto e rovescio.",
            "Il cavo SATA non fornisce alimentazione.",
            "Vengono normalmente utilizzati per collegare dispositivi alla rete Ethernet.",
            "Uno dei due estremi viene collegato alla scheda madre."
        ],
        "correct": [0, 1, 0, 1],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "012",
        "type": "single",
        "text": "In una CPU dual core con Hyper-Threading, quante istruzioni possono essere eseguite contemporaneamente?",
        "options": [
            "6",
            "8",
            "2",
            "4"
        ],
        "correct": [0, 0, 0, 1],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "013",
        "type": "single",
        "text": "Qual'è un segnale del fatto che la batteria CMOS è scarica o quasi?",
        "options": [
            "Data e ora del PC sono sbagliati.",
            "Rallentamento dell'accesso ai file del disco.",
            "Il sistema operativo non si avvia.",
            "Una specifica sequenza di beep durante il POST."
        ],
        "correct": [1, 0, 0, 0],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "014",
        "type": "invertible",
        "text": [
            "Indica quali componenti sono generalmente sostituiti installando una nuova scheda madre.",
            "Indica quali componenti <u>non</u> sono generalmente sostituiti installando una nuova scheda madre."
        ],
        "options": [
            "RAM",
            "Hard drive",
            "CPU",
            "Unità ottica",
            "Batteria CMOS"
        ],
        "correct": [1, 0, 1, 0, 0],
        "weight": 1,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    },
    {
        "id": "015",
        "type": "fill",
        "text": "Completa il seguente testo.<br>",
        "tofill": "Ci si protegge da problemi all'alimentazione elettrica con degli {{0}} che utilizzano una {{1}} in grado di fornire alimentazione elettrica durante eventuali blackout. Grazie all'interazione con il {{2}}, è possibile arrestare il computer prima che la batteria si esaurisca.",
        "correct": [
            "UPS",
            "batteria",
            "sistema operativo"
        ],
        "weight": 2,
        "tags": ["SR", "ITE", "Hardware Avanzato"]
    }
];
