const WORD_GROUPS = [
    {
        pattern: "Types of Weather",
        words: ["RAIN", "SNOW", "STORM", "WIND"],
        color: "yellow"
    },
    {
        pattern: "Musical Instruments",
        words: ["PIANO", "GUITAR", "VIOLIN", "DRUMS"],
        color: "green"
    },
    {
        pattern: "Celestial Bodies",
        words: ["SUN", "MOON", "STAR", "PLANET"],
        color: "blue"
    },
    {
        pattern: "Body Parts",
        words: ["HEAD", "HAND", "FOOT", "HEART"],
        color: "purple"
    }
];

function Instructions({ onStart }) {
    try {
        return (
            <div className="modal-overlay" data-name="instructions-modal">
                <div className="modal-content">
                    <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>Find groups of four related words</li>
                        <li>Select four words and submit your guess</li>
                        <li>You have 4 lives to find all connections</li>
                        <li>Wrong guesses cost one life</li>
                    </ul>
                    <button 
                        className="start-button"
                        onClick={onStart}
                        data-name="start-button"
                    >
                        Start Game
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Instructions component error:', error);
        reportError(error);
        return null;
    }
}

function WordTile({ word, isSelected, status, onClick }) {
    try {
        const classes = [
            'word-tile',
            isSelected ? 'selected' : '',
            status || ''
        ].filter(Boolean).join(' ');

        return (
            <div 
                className={classes}
                onClick={onClick}
                data-name="word-tile"
            >
                {word}
            </div>
        );
    } catch (error) {
        console.error('WordTile component error:', error);
        reportError(error);
        return null;
    }
}

function SolvedGroup({ pattern, words, color }) {
    try {
        return (
            <div className="group-item" data-name="solved-group">
                <div className="group-pattern" data-name="group-pattern">{pattern}</div>
                <div className="group-words" data-name="group-words">
                    {words.map((word, index) => (
                        <WordTile
                            key={index}
                            word={word}
                            status={color}
                        />
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('SolvedGroup component error:', error);
        reportError(error);
        return null;
    }
}

function App() {
    try {
        const [showInstructions, setShowInstructions] = React.useState(true);
        const [words, setWords] = React.useState(() => {
            const allWords = WORD_GROUPS.flatMap(group => group.words);
            return allWords.sort(() => Math.random() - 0.5);
        });

        const [selectedWords, setSelectedWords] = React.useState([]);
        const [solvedGroups, setSolvedGroups] = React.useState([]);
        const [lives, setLives] = React.useState(4);
        const [message, setMessage] = React.useState({ text: '', type: '' });

        const handleWordClick = (word) => {
            if (lives === 0) return;
            
            setSelectedWords(prev => {
                if (prev.includes(word)) {
                    return prev.filter(w => w !== word);
                }
                if (prev.length < 4) {
                    return [...prev, word];
                }
                return prev;
            });
        };

        const checkSelection = () => {
            return WORD_GROUPS.find(group => 
                selectedWords.every(word => group.words.includes(word)) &&
                !solvedGroups.includes(group)
            );
        };

        const handleSubmit = () => {
            if (selectedWords.length !== 4) return;

            const correctGroup = checkSelection();
            if (correctGroup) {
                setSolvedGroups(prev => [...prev, correctGroup]);
                setWords(prev => prev.filter(word => !selectedWords.includes(word)));
                setMessage({ text: 'Correct! Keep going!', type: 'success' });
                
                if (solvedGroups.length === WORD_GROUPS.length - 1) {
                    setMessage({ text: 'Congratulations! You won!', type: 'success' });
                }
            } else {
                setLives(prev => prev - 1);
                setMessage({ 
                    text: lives === 1 ? 'Game Over!' : 'Wrong combination. Try again!', 
                    type: 'error' 
                });
            }
            
            setSelectedWords([]);
        };

        return (
            <div className="game-container">
                {showInstructions && (
                    <Instructions onStart={() => setShowInstructions(false)} />
                )}
                
                <header className="header" data-name="game-header">
                    <h1 className="game-title" data-name="game-title">Connections</h1>
                    <p className="game-subtitle" data-name="game-subtitle">
                        Find groups of four related words
                    </p>
                    <p className="lives-counter" data-name="lives-counter">
                        Lives remaining: {lives}
                    </p>
                </header>

                {message.text && (
                    <div className={`message ${message.type}`} data-name="game-message">
                        {message.text}
                    </div>
                )}

                <div className="solved-groups" data-name="solved-groups">
                    {solvedGroups.map((group, index) => (
                        <SolvedGroup key={index} {...group} />
                    ))}
                </div>

                {lives > 0 && words.length > 0 && (
                    <div data-name="game-active">
                        <div className="word-grid" data-name="word-grid">
                            {words.map((word, index) => (
                                <WordTile
                                    key={index}
                                    word={word}
                                    isSelected={selectedWords.includes(word)}
                                    onClick={() => handleWordClick(word)}
                                />
                            ))}
                        </div>
                        <button
                            className="submit-button"
                            onClick={handleSubmit}
                            disabled={selectedWords.length !== 4}
                            data-name="submit-button"
                        >
                            Submit
                        </button>
                    </div>
                )}

                {lives === 0 && (
                    <div className="remaining-groups" data-name="remaining-groups">
                        <h3 className="text-lg font-bold mb-2">Remaining Solutions:</h3>
                        {WORD_GROUPS
                            .filter(group => !solvedGroups.includes(group))
                            .map((group, index) => (
                                <SolvedGroup key={index} {...group} />
                            ))
                        }
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
