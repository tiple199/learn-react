import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
const App = () => {
  const [todoList,setTodoList] = useState([
    {id: 1,name:"Learning React"},
    {id: 2,name:"Watching Youtube"}
  ])
  const hoidanit = "Tiệp";
  const age = "21";
  const data = {
    addresss: "hanoi",
    country: "vietnam"
  }
  const addNewTodo = (name) =>{
    alert(`call me ${name}`);
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew 
      addNewTodo = {addNewTodo}
      />
      <TodoData 
      name={hoidanit}
      age ={age}
      data = {data}
      todoList = {todoList}
      />
      <div className="todo-image">
        <img src={reactLogo} alt="" className="logo"/>
      </div>
    </div>
  )
}

export default App
