//** Header component (Exercise 1.1)*/
const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

//** Part component */
const Part = (props) => {
  console.log('#DEBUG ->', props.partName, props.exercises);

  return (
    <p>
      {props.partName} {props.exercises}
    </p>
  );
};

//** Content componet */
const Content = (props) => {
  // Depending on the exercise is rendered different component
  var aux = [];
  console.log('#DEBUG (Content)->', props);
  for (let i = 0; i < props.course.parts.length; i++) {
    aux.push(
      <Part
        key={i}
        partName={props.course.parts[i].name}
        exercises={props.course.parts[i].exercises}
      />
    );
  }
  return <div>{aux}</div>;
};

//** Total component */
const Total = (props) => {
  // Auxiliary variables
  var aux = 0;

  props.course.parts.forEach((x) => (aux += x.exercises));

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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  console.clear();

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
