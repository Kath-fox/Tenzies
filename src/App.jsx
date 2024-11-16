import { useState } from 'react'
import { useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const [diceArr, setDiceArr] = useState(allNewDie())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => { 
    const allHeld = diceArr.every(die => die.isHeld)
    const allSameValue = diceArr.every(die => die.value === diceArr[0].value)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [diceArr])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDie() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const diceElements = diceArr.map(item => {
    return (
      <Die
        value={item.value}
        isHeld={item.isHeld}
        id={item.id}
        onClick={holdDice}
      />
    )
  })

  function rollDice() {
    if (tenzies) {
      setDiceArr(allNewDie)
      setTenzies(false)
    } else {
      setDiceArr(prevDiceArr => prevDiceArr.map(die => {
      return die.isHeld ?
      die : generateNewDie()
    }))
    }
  }

  function holdDice(id) {
    setDiceArr(prevDiceArr => prevDiceArr.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
   <main>
    { tenzies && <Confetti /> }
    <div className="game-container">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        onClick={rollDice}
        className="roll-dice-button"
      >
        { tenzies ? "New Game" : "Roll"}
      </button>
    </div>
   </main>
  )
}

export default App
