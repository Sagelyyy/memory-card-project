import React from 'react';
import './App.css';
import Card from "./components/Card"
import testData from "./testData.js"

function App() {

  const [allHeroData, setAllHeroData] = React.useState([])
  const [heroCards, setHeroCards] = React.useState([])



  React.useEffect(() => {
    const url = "https://api.opendota.com/api/heroStats"
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => setAllHeroData(data))
    setAllHeroData(testData)
  }, [])

  function getRandomHeroes() {
    const pref = "http://cdn.dota2.com"
    setHeroCards([])
    for (let i = 0; i < 9; i += 1) {
      let currHero = (Math.floor(Math.random() * 123))
      console.log()
      setHeroCards(old => ([...old,
      {
        heroName: allHeroData[currHero].localized_name,
        heroPortrait: pref + allHeroData[currHero].img
      }]))
    }
  }

  console.log(allHeroData)
  console.log('=========Hero Cards=========')
  console.log(typeof(heroCards))
  console.log(heroCards)
  console.log('=========Hero Cards=========')

  const cardElements = heroCards.map(elem =>  {
    return(
      <Card 
        heroName={elem.heroName}
      />
    )
  })

  console.log(cardElements)

  return (
    <div className="App">
      <button onClick={getRandomHeroes}>Test</button>
      {heroCards.length > 0 ?
            {cardElements}:
          null}

    </div>
  );
}

export default App;




//Have a card component, map over it? to display data.
//display in random order everytime the user clicks one.

//Scoreboard that increments when user clicks correct answer (not the same as the previous card)
//Best score