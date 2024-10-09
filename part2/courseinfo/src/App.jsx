const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  var sum = 0;
  parts.forEach((x) => {
    sum += x.exercises;
  });
  return <p>Total of {sum} exercises</p>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((x) => (
        <li key={x.id}>
          {x.name} - <b>{x.exercises}</b>
        </li>
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
