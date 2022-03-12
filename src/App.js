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


  React.useEffect(() => {
    const url = "https://api.opendota.com/api/heroStats"
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => setAllHeroData(data))
    setAllHeroData(testData)
    // why does this not get set right away?
    //getRandomHeroes()
  }, [])


  function getRandomHeroes() {
    const pref = "http://cdn.dota2.com"
    setHeroCards([])
    for (let i = 0; i < 10; i += 1) {
      let rand = (Math.floor(Math.random() * allHeroData.length))
      setHeroCards(old => ([...old,
      {
        heroName: allHeroData[rand].localized_name,
        heroPortrait: pref + allHeroData[rand].img
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
        // heroPortrait={elem.heroPortrait}
        heroPortrait="./logo512.png"
        key={nanoid()}
      />
    )
  })

  // console.log('=========Hero Cards=========')
  // console.log(heroCards)
  // console.log('=========Hero Cards=========')
  // console.log('=========Answers=========')
  // console.log(answers)

  return (
    <div className="App">
      <button onClick={getRandomHeroes}>Test</button>
      <h3>Score: {score}</h3>
      <h3>Hiscore: {hiScore}</h3>
      <div className='App--card--container'>
        {heroCards.length > 0 && gameOver === false ?
          cardElements :
          <div>
            <h1>game over!</h1>
            <button onClick={newGame}>New Game</button>
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