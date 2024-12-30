import { useContext, useEffect, useState, useMemo } from "react";
import { HangmanContext } from "./HangmanContext";
import "../css/gamepage.css";
import { Button, Form } from "react-bootstrap";

function GamePage() {
    const { globalName } = useContext(HangmanContext);
    const [names, setNames] = useState([]);
    const [start, setStart] = useState(false);
    const [line, setLine] = useState([]);
    const [life, setLife] = useState(10);
    const [level, setLevel] = useState(1);
    const [val, setVal] = useState(0);
    const [clickedLetters, setClickedLetters] = useState([]);
    const [gameWon, setGameWon] = useState(false); // Yeni state

    const letters = useMemo(
        () => ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
            "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        []
    );

    const API_URL = "http://localhost:8080/names";
    const fetchProcess = async () => {
        try {
            const required = await fetch(API_URL);
            if (!required.ok) throw new Error("Bad Gateway");
            const response = await required.json();
            setNames(response);
        } catch (error) {
            console.error("Error fetching names:", error);
        }
    };

    useEffect(() => {
        fetchProcess();
    }, []);

    // LocalStorage'den verileri alma
    useEffect(() => {
        const savedLevel = localStorage.getItem("level");
        const savedLife = localStorage.getItem("life");
        const savedVal = localStorage.getItem("val");
        if (savedLevel && savedLife && savedVal) {
            setLevel(parseInt(savedLevel));
            setLife(parseInt(savedLife));
            setVal(parseInt(savedVal));
        }
    }, []);

    // LocalStorage'ye verileri kaydetme
    useEffect(() => {
        localStorage.setItem("level", level);
        localStorage.setItem("life", life);
        localStorage.setItem("val", val);
    }, [level, life, val]);

    const forLine = () => {
        if (names[val]?.name) {
            const str = names[val].name.length;
            const newLine = Array(str).fill("-");
            setLine(newLine);
        }
    };

    useEffect(() => {
        forLine();
    }, [names, val]);

    const ofName = useMemo(() => names[val]?.name || "", [names, val]);

    const handleClick = (e, letter) => {
        e.preventDefault();
        setClickedLetters((prev) => [...prev, letter]);
        const smallLetter = letter.toLowerCase();
        if (!ofName.includes(smallLetter)) {
            setLife((prev) => {
                const newLife = prev - 1;
                if (newLife < 1) {
                    setStart(false);
                    setLife(10);
                    setLevel(1);
                    setVal(0);
                    forLine();
                    setClickedLetters([]);
                }
                return newLife;
            });
            return;
        }

        const updatedLine = [...line];
        for (let i = 0; i < ofName.length; i++) {
            if (ofName[i] === smallLetter) {
                updatedLine[i] = smallLetter;
            }
        }
        setLine(updatedLine);

        if (!updatedLine.includes("-")) {
            setLevel((prevLevel) => prevLevel + 1);
            setVal((prevVal) => prevVal + 1);
            setClickedLetters([]);
        }
    };


    const newGame = () =>{
        setStart(false);
        setLife(10);
        setLevel(1);
        setVal(0);
        forLine();
        setClickedLetters([]);
    }


    if (level === 15) {
        setGameWon(true);
        newGame();
    }

    const handleClickRetry = (e) => {
        e.preventDefault();
        newGame();
    };

    const handleClickStart = (e) =>{
        e.preventDefault();
        setStart((start) => !start);
        if(gameWon){
            newGame();
            setGameWon((gameWon) => !gameWon);
        }

    }

    return (
        <div className="gameContainer">
            {gameWon && (
                <div className="gameWonMessage">
                    <h2>🎉 You won! Congratulations! 🎉</h2>
                </div>
            )}
            <div style={{ display: start ? "none" : "block" }}>
                <h1 style={{ color: "#1E90FF", background: "#e7760b" }} className="text-center fs-1 fw-bold p-3">Welcome, {globalName}! Let's start the game!</h1>
                <div className="startBut d-flex justify-content-center">
                    <Button onClick={(e) => handleClickStart(e)} type="button"
                            className=" border-primary fs-2 border-5 w-50 h-25">START</Button>
                </div>
            </div>

            <div style={{ display: start ? "block" : "none" }}>
                <div className="d-flex justify-content-around LifeLevelStop">
                    <h3 className="fs-1">💖 {life}</h3>
                    <h3 className="fs-1">🎚️ {level}</h3>
                    <button className="fs-1 bg-transparent border-0" style={{ cursor: "pointer" }}
                            onClick={handleClickRetry}>🔄
                    </button>
                </div>

                {names?.map((item, key) => (
                    <div key={key} className="questionsContainer bg-black text-info fs-4
                        d-flex justify-content-center align-items-center" style={{ padding: "0.1vh" }}>
                        <span className="styleQuestions">{item.id === level ? item?.questions : null}</span>
                    </div>
                ))}

                <div className="d-flex justify-content-center mt-5">
                    {line.map((value, key) => (
                        <span key={key} style={{ fontSize: "6vh", margin: "0 10px" }}>
                            {value}
                        </span>
                    ))}
                </div>

                <Form className="d-flex justify-content-center mt-5">
                    <Form.Text></Form.Text>
                </Form>

                <div className="container containerForLetter">
                    {letters.map((letter, key) => (
                        <span className="forLetters" key={key}>
                            <button onClick={(e) => handleClick(e, letter)}
                                    className="oneLetter"
                                    disabled={clickedLetters.includes(letter)}
                                    id={clickedLetters.includes(letter) ? "disable" : null}>
                                {letter}
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GamePage;
