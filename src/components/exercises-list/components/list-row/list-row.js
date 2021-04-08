// Function componenet example
function ListRow(props) {
  return (
    <button onClick={props.onClick}>
      {props.buttonValue}
    </button>
  );
}