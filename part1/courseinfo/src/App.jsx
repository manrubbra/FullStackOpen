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

//** Content componet (Exercise 1.1)*/
const Content = (props) => {
  console.log(props.part,props.exercise)
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

//** Total component (Exercise 1.1)*/
const Total = (props) => {
  
  var aux = 0
  props.exercises.forEach(
    x => aux += x)

  console.log(aux)
  
  return (
    <p><b>Number of exercises:</b> {aux}</p>
  )

}

//** App component */
const App = () => {

  var aux = []

  for(let i = 0; i < courseParts.length; i++){
    aux.push(<Content id={i} part={courseParts[i]} exercise={coursePartsExercises[i]}></Content>)
  }

  return (
    <div>
      <Header></Header>
      {aux}
      <Total exercises={coursePartsExercises}></Total>
    </div>
  )
}

export default App