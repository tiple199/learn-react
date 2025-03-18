const TodoData = (props) =>{
    const {todoList,deleteItemTodo} = props;

    const handleClickDelete = (id) =>{
        deleteItemTodo(id)
    }
    return(
            <div className="todo-data">
                {todoList.map((item,index) => {
                    return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>
                        <button style={{cursor: "pointer"}} onClick={() => handleClickDelete(item.id)}>Delete</button>
                    </div>
                    )
                })}
                
            </div>
      
    )
}

export default TodoData;