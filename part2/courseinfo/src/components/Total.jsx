const Total = ({ parts }) => {
  // Refactor the code for the reduce function
  const ini = 0;
  const sum = parts.reduce((s, p) => s + p.exercises, ini);
  console.log('#DEBUG->', sum);

  return <p>Total of {sum} exercises</p>;
};

export default Total;
