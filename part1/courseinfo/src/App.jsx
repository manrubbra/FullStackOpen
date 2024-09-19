//** Constants (Exercise 1.1)*/
const course = 'Half Stack application development'
const courseParts = ['Fundamentals of React','Using props to pass data','State of a component']
const coursePartsExercises = [10, 7, 14]

//** Header component (Exercise 1.1)*/
const Header = () => {
  return(
    <h1>{course}</h1>
  )
}

// NOTE FOR ME: Be careful with the names... Components and props attributes
// shold be named different

//** Part component (Exercise 1.2) */
const Part = (props) => {
  
  console.log(
      "#DEBUG ->"
    , props.partName
    , props.exercises);

  return (
    <p>{props.partName} {props.exercises}</p>
  )
}


//** Content componet (Exercise 1.1)*/
const Content = (props) => {
  
  // Auxiliary variables
  var aux = [];

  console.log(
      "#DEBUG (Content)->"
    , props.parts
    , props.parts.length
  );
  
  for(let i = 0; i < props.parts.length; i++) {
    aux.push(<Part key={i} partName={props.parts[i]} exercises={props.partsExercises[i]} />);
  }
  
  return (
    <div>
      {aux}
    </div>
  )
}

//** Total component (Exercise 1.1)*/
const Total = (props) => {
  
  // Auxiliary variables
  var aux = 0

  props.exercises.forEach(
    x => aux += x)

  console.log("#DEBUG -> TOTAL EXERCISES",aux)
  
  return (
    <p><b>Number of exercises:</b> {aux}</p>
  )

}

//** App component */
const App = () => {

  console.clear();

  return (
    <div>
      <Header />
      <Content parts={courseParts} partsExercises={coursePartsExercises}/>
      <Total exercises={coursePartsExercises} />
    </div>
  )
}

export default App