import { useState } from 'react';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
];

const Button = ({ onClick, title }) => {
  return <button onClick={onClick}>{title}</button>;
};

const App = () => {
  /* Build score array */
  var aux = [];
  anecdotes.forEach((x) => {
    aux.push(0);
  });

  const [selected, setSelected] = useState(0);
  const [score, setScore] = useState(aux);

  // Random number in base of the length of anecdotesgg
  const RandomNumber = () => {
    var max = anecdotes.length;
    var rdn = Math.random();
    var result = Math.round(rdn * max, 0);
    console.log('RESULT:', result);
    setSelected(result);
  };

  // Set the vote in the variable score
  const SetScore = () => {
    var backup = [...score];
    backup[selected]++;
    setScore(backup);
    console.log(backup);
    console.log(score);
  };

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <br></br>
      <Button title="Next Anecdote" onClick={RandomNumber}></Button>
      <Button title="Vote" onClick={SetScore}></Button>
    </div>
  );
};

export default App;
