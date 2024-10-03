//** Constants (Exercise 1.1)*/
const course = 'Half Stack application development'; // Keep here the constant instead of move to App method
const courseParts = [
  'Fundamentals of React',
  'Using props to pass data',
  'State of a component'
];
const coursePartsExercises = [10, 7, 14];

//** Header component (Exercise 1.1)*/
const Header = () => {
  return <h1>{course}</h1>;
};

// NOTE FOR ME: Be careful with the names... Components and props attributes
// shold be named different

//** Part component (Exercise 1.2) */
const Part = (props) => {
  console.log('#DEBUG ->', props.partName, props.exercises);

  return (
    <p>
      {props.partName} {props.exercises}
    </p>
  );
};

//** Content componet (Exercise 1.1)*/
const Content = (props) => {
  // Depending on the exercise is rendered different component
  var aux = [];
  console.log('#DEBUG (Content)->', props);

  if (props.exercise == '1.1') {
    // Auxiliary variables
    for (let i = 0; i < props.parts.length; i++) {
      aux.push(
        <Part
          key={i}
          partName={props.parts[i]}
          exercises={props.partsExercises[i]}
        />
      );
    }
  } else if (props.exercise == '1.3') {
    for (let i = 0; i < props.partsObject.length; i++) {
      aux.push(
        <Part
          key={i}
          partName={props.partsObject[i].name}
          exercises={props.partsObject[i].exercises}
        />
      );
    }
  }
  return <div>{aux}</div>;
};

//** Total component (Exercise 1.1)*/
const Total = (props) => {
  // Auxiliary variables
  var aux = 0;

  props.exercises.forEach((x) => (aux += x));

  console.log('#DEBUG -> TOTAL EXERCISES', aux);

  return (
    <p>
      <b>Number of exercises:</b> {aux}
    </p>
  );
};

//** App component */
const App = () => {
  // Object definition:

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };

  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  const partsObject = [];
  partsObject.push(part1);
  partsObject.push(part2);
  partsObject.push(part3);

  console.clear();

  return (
    <div>
      <Header />
      <Content
        exercise="1.3"
        parts={courseParts}
        partsExercises={coursePartsExercises}
        partsObject={partsObject}
      />
      <Total exercises={coursePartsExercises} />
    </div>
  );
};

export default App;
