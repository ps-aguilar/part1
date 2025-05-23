import { useState } from 'react'

const Text = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all ? (good - bad) / all : 0
  const positive = all ? (good / all) * 100 : 0


  return (
    <div>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const title = 'give feedback'
  const subtitle = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
  setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Text text={title} />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Text text={subtitle} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App