const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  // Refactor the code for the reduce function
  const ini = 0;
  const sum = parts.reduce((s, p) => s + p.exercises, ini);
  console.log('#DEBUG->', sum);

  return <p>Total of {sum} exercises</p>;
};

const Part = ({ part }) => (
  <li key={part.id}>
    {part.name} {part.exercises}
  </li>
);

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((x) => (
        <Part key={x.id} part={x} /> // Little bit redundant...
      ))}
    </ul>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  };

  return (
    <div>
      <Course course={course}></Course>
    </div>
  );
};

export default App;
