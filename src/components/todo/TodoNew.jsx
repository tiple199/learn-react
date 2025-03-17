const TodoNew = (props) =>{
  console.log(">>> check point",props)
  const {addNewTodo} =  props;
  // addNewTodo("Tiep");

  const handleClick = () => {
    alert("Click me")
  }
  const handleOnChange = (name) => {
    console.log(">>> handleOnChang", name)
  }
  return(
      <div className="todo-new">
      <input className="input"
       type="text" 
       onChange={(e) => handleOnChange(e.target.value)}
       />
      <button style={{cursor: "pointer"}} className="btn"
      onClick={handleClick}
      >Add</button>
    </div>
  )
}

export default TodoNew;