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

  return (
    <div>
      <Title title="Give feedback" />
      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />
      <Title title="Statistic" />
      <Display text="Good" value={good} />
      <Display text="Neutral" value={neutral} />
      <Display text="Bad" value={bad} />
    </div>
  );
};

export default App;
