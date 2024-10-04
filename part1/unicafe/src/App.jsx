import { useState } from 'react';

const Title = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Display = ({ text, value }) => {
  return (
    <div>
      <p>
        {text}: <b>{value}</b>
      </p>
    </div>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  var updateGood;
  var updateNeutral;
  var updateBad;
  var updateTotal;
  var updatePositive;

  var auxAverage = 0;

  const handleGood = () => {
    updateGood = good + 1;
    updateTotal = total + 1;
    updatePositive = updateGood / updateTotal;
    setGood(updateGood);
    setTotal(updateTotal);
    auxAverage++;
    setAverage(auxAverage / updateTotal);
    setPositive(updatePositive);
  };

  const handleNeutral = () => {
    updateNeutral = neutral + 1;
    updateTotal = total + 1;
    updatePositive = good / updateTotal;
    setNeutral(updateNeutral);
    setTotal(updateTotal);
    setAverage(auxAverage / updateTotal);
    setPositive(updatePositive);
  };

  const handleBad = () => {
    updateBad = bad + 1;
    updateTotal = total + 1;
    updatePositive = good / updateTotal;
    setBad(updateBad);
    setTotal(updateTotal);
    auxAverage--;
    setAverage(auxAverage / updateTotal);
    setPositive(updatePositive);
  };

  return (
    <div>
      <Title title="Give feedback" />
      <Button text="Good" onClick={handleGood} />
      <Button text="Neutral" onClick={handleNeutral} />
      <Button text="Bad" onClick={handleBad} />
      <Title title="Statistic" />
      <Display text="Good" value={good} />
      <Display text="Neutral" value={neutral} />
      <Display text="Bad" value={bad} />
      <hr></hr>
      <Display text="Total" value={total} />
      <Display text="Average" value={average} />
      <Display text="Positive" value={positive} />
    </div>
  );
};

export default App;
