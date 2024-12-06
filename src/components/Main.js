import React from "react"
import Die from "./Die"
import Confetti from 'react-confetti'

export default function Main() {
    const theId = React.useId();

    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    const [topCounter, setTopCounter] = React.useState(localStorage.getItem("topScore"));

    React.useEffect(() => {
        const test = dice.every(die => die.isHeld && die.value === dice[0].value)
        if (test) {
            setTenzies(true);
            console.log(tenzies)
            setTopCounter(prev => prev === "" || counter < prev ? counter : prev)
        }
        localStorage.setItem("topScore", topCounter)
        // localStorage.clear()
        // else {
        //     setCounter(last => last + 1)
        //     console.log(counter)
        // }

    }, [dice, counter, tenzies, topCounter])

    function allNewDice() {
        const dieArray = [];
        for (let i = 0; i < 10; i++) {
            const dieNum = Math.ceil(Math.random() * 6)
            const obj = {
                id: theId + i,
                value: dieNum,
                isHeld: false
            }
            dieArray.push(obj);
        };
        return dieArray;
    }
    function roll() {
        if (tenzies) {
            setTenzies(false);
            setDice(allNewDice);
            setCounter(0);
        } else {
            setDice(oldDice => oldDice.map(die => {
                return !die.isHeld ?
                    { ...die, value: Math.ceil(Math.random() * 6) } :
                    die
            }
            ))
            setCounter(counter + 1)
        }
    }

    function toggleDie(ID) {
        setDice(prev => {
            const newArr = [];
            for (let i of prev) {
                newArr.push({
                    ...i,
                    isHeld: i.id === ID ? !i.isHeld : i.isHeld
                })
            }
            return newArr;
        })
    }

    function rollButton() {
        return tenzies ? "New Game" : "Roll"
    }

    const diesContent = dice.map(die =>
        <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            handleClick={() => toggleDie(die.id)}
        />)

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
            <div className="die--container">
                {diesContent}
            </div>
            <button className="roll--button" onClick={roll}>{rollButton()}</button>
            <div className="stats">
                <p className="counter">Counter: {counter}</p>
                <p className="topCounter">Best Score:{topCounter}</p>
            </div>
            {tenzies && <Confetti />}
        </main>
    )
}