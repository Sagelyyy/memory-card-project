import React from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import Card from "./components/Card"
import testData from "./testData.js"

function App() {

  const [allHeroData, setAllHeroData] = React.useState([])
  const [heroCards, setHeroCards] = React.useState([])
  const [answers, setAnswers] = React.useState([])
  const [gameOver, setGameOver] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [hiScore, setHiScore] = React.useState(0)
  const [resolved, setResolved] = React.useState(false)


  const fetchData = async () => {
    const url = "https://api.opendota.com/api/heroStats"
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setAllHeroData(data)
        setResolved(true)
      })
  }


  React.useEffect(() => {
    fetchData()
    getRandomHeroes()
  }, [resolved])

  const getRandomHeroes = async () => {
    const pref = "http://cdn.dota2.com"
    setHeroCards([])
    for (let i = 0; i < 10; i += 1) {
      let rand = (Math.floor(Math.random() * allHeroData.length))
      setHeroCards(old => ([...old,
      {
        heroName: allHeroData[rand]?.localized_name,
        heroPortrait: pref + allHeroData[rand]?.img
      }]))
    }
  }

  function handleClick(id) {
    if (answers.length === 0) {
      setAnswers([id])
      getRandomHeroes()
      setScore(old => old + 1)
    } else {
      for (let i = 0; i < answers.length; i += 1) {
        if (answers[i] === id) {
          setGameOver(true)
          return
        }
      }
      setAnswers(old => [...old, id])
      getRandomHeroes()
      setScore(old => old + 1)
    }
  }


  function newGame() {
    if (gameOver === true) {
      if (score > hiScore) {
        setHiScore(score)
      }
      setScore(0)
      setAnswers([])
      setGameOver(false)
    }
  }

  const cardElements = heroCards.map(elem => {
    return (
      <Card
        onClick={() => handleClick(elem.heroName)}
        heroName={elem.heroName}
        heroPortrait={elem.heroPortrait}
        key={nanoid()}
      />
    )
  })

  return (
    <div className="App">
      <div className='App--score--container'>
        <h1>Dota 2 Memory Game</h1>
        <h3>Score: {score}</h3>
        <h3>Hiscore: {hiScore}</h3>
      </div>
      <div className='App--card--container'>
        {heroCards.length > 0 && gameOver === false ?
          cardElements :
          <div>
            <h1 className='App--gameOver'>Game Over!</h1>
            <button className="App--newGame" onClick={newGame}>New Game</button>
          </div>}
      </div>
    </div>
  );
}

export default App;




//Have a card component, map over it? to display data. done
//display in random order everytime the user clicks one. done

//Scoreboard that increments when user clicks correct answer (not the same as the previous card)
//Best score