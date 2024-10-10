const InputGroup = ({
  labels,
  inputs,
  onChanges,
  buttonLabels,
  buttonOnClicks
}) => {
  console.log('#DEBUG - Labels:', labels);
  console.log('#DEBUG - Inputs:', inputs);
  console.log('#DEBUG - OnChanges:', onChanges);
  console.log('#DEBUG - Buttons', buttonLabels);
  console.log('#DEBUG - ButtonsOnClick', buttonOnClicks);

  // Create an object to thr map function
  var inputObjects = [];

  console.log('#DEBUG - Elements number:', labels.length);

  for (var i = 0; i < labels.length; i++) {
    console.log('#DEBUG - Entry in loop');
    inputObjects = inputObjects.concat({
      id: i,
      label: labels[i],
      value: inputs[i],
      onChange: onChanges[i]
    });
  }

  console.log('#DEBUG - InputObject', inputObjects);

  // Create an object for buttons
  var buttonObject = [];

  for (let i = 0; i < buttonLabels.length; i++) {
    buttonObject = buttonObject.concat({
      id: i,
      label: buttonLabels[i],
      onClick: buttonOnClicks[i]
    });
  }

  return (
    <div>
      <table>
        <tbody>
          {inputObjects.map((x) => (
            <tr key={x.id}>
              <td>{x.label}</td>
              <td>
                <input value={x.value} onChange={x.onChange}></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {buttonObject.map((b) => (
        <button key={b.id} type="button" onClick={b.onClick}>
          {b.label}
        </button>
      ))}
    </div>
  );
};

export default InputGroup;
