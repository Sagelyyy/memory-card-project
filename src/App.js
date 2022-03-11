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



  React.useEffect(() => {
    const url = "https://api.opendota.com/api/heroStats"
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => setAllHeroData(data))
    setAllHeroData(testData)
    // getRandomHeroes()
  }, [])

  function getRandomHeroes() {
    const pref = "http://cdn.dota2.com"
    setHeroCards([])
    for (let i = 0; i < 10; i += 1) {
      let currHero = (Math.floor(Math.random() * 123))
      console.log()
      setHeroCards(old => ([...old,
      {
        heroName: allHeroData[currHero].localized_name,
        heroPortrait: pref + allHeroData[currHero].img
      }]))
    }
  }

  function handleClick(id) {
    if (answers.length === 0) {
      setAnswers([id])
      getRandomHeroes()
    } else {
      for(let i=0;i<answers.length; i+=1){
          if(answers[i] === id){
            setGameOver(true)
            setAnswers([])
            console.log('game over')
            return
          }
      }
          setAnswers(old => [...old, id])
          getRandomHeroes()
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

  console.log('=========Hero Cards=========')
  console.log(heroCards)
  console.log('=========Hero Cards=========')
  console.log('=========Answers=========')
  console.log(answers)

  return (
    <div className="App">
      <button onClick={getRandomHeroes}>Test</button>
      <div className='App--card--container'>
        {heroCards.length > 0 ?
          cardElements :
          null}
      </div>

    </div>
  );
}

export default App;




//Have a card component, map over it? to display data.
//display in random order everytime the user clicks one.

//Scoreboard that increments when user clicks correct answer (not the same as the previous card)
//Best score