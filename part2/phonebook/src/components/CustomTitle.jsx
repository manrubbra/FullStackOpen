const CustomTitle = ({ level, title }) => {
  // Show the inputs to the component
  console.log('#DEBUG - Level: ', level);
  console.log('#DEBUG - Title:', title);

  if (level === '1') {
    console.log('#DEBUG - Level 1');
    return <h1>{title}</h1>;
  } else if (level === '2') {
    console.log('#DEBUG - Level 2');
    return <h2>{title}</h2>;
  } else if (level === '3') {
    console.log('#DEBUG - Level 3');
    return <h3>{title}</h3>;
  } else if (level === '4') {
    console.log('#DEBUG - Level 4');
    return <h4>{title}</h4>;
  } else if (level === '5') {
    console.log('#DEBUG - Level 5');
    return <h5>{title}</h5>;
  } else if (level === '6') {
    console.log('#DEBUG - Level 6');
    return <h6>{title}</h6>;
  }

  console.log('#DEBUG - Level 6 (default)');
  return <h6>{title}</h6>;
};

export default CustomTitle;
