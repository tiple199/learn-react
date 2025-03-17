import { useState } from "react";

const TodoNew = (props) =>{
  const {addNewTodo} =  props;

  // const valueInput = "";
  const [valueInput, setValueInput] = useState("Tiep")

  // addNewTodo("Tiep");

  const handleClick = () => {
    addNewTodo(valueInput); 
    setValueInput("");
  }
  const handleOnChange = (name) => {
    setValueInput(name);
  }
  return(
      <div className="todo-new">
      <input className="input"
       type="text" 
       onChange={(e) => handleOnChange(e.target.value)}
       value={valueInput}
       />
      <button style={{cursor: "pointer"}} className="btn"
      onClick={handleClick}
      >Add</button>
      <div>My text input is = {valueInput}</div>
    </div>
  )
}

export default TodoNew;