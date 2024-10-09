import Part from './Part';

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((x) => (
        <Part key={x.id} part={x} /> // Little bit redundant...
      ))}
    </ul>
  );
};

export default Content;
