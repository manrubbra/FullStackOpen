const Part = ({ part }) => (
  <li key={part.id}>
    {part.name} {part.exercises}
  </li>
);

export default Part;
