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

const Title = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

const App = () => {
  /* Build score array */
  var aux = [];
  anecdotes.forEach((x) => {
    aux.push(0);
  });

  const [selected, setSelected] = useState(0);
  const [score, setScore] = useState(aux);
  const [mostVoted, SetMostVoted] = useState(0);

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

    // Update the score
    setScore(backup);
    console.log(backup);
    console.log(score);

    // Find most voted
    var max = Math.max(...backup);
    var index = backup.indexOf(max);
    SetMostVoted(index);
  };

  return (
    <div>
      <Title title="Anecdote of the day"></Title>
      <div>{anecdotes[selected]}</div>
      <br></br>
      <Button title="Next Anecdote" onClick={RandomNumber}></Button>
      <Button title="Vote" onClick={SetScore}></Button>
      <hr></hr>
      <Title title="Anecdote with most votes"></Title>
      <div>{anecdotes[mostVoted]}</div>
    </div>
  );
};

export default App;
