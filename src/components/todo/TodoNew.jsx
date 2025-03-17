const TodoNew = (props) =>{
  console.log(">>> check point",props)
  const {addNewTodo} =  props;
  // addNewTodo("Tiep");
    return(
        <div className="todo-new">
        <input className="input" type="text" />
        <button className="btn">Add</button>
      </div>
    )
}

export default TodoNew;