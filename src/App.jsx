import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import Header from "./layout/header";
import Footer from "./layout/footer";
const App = () => {
  const [todoList,setTodoList] = useState([
    // {id: 1,name:"Learning React"},
    // {id: 2,name:"Watching Youtube"}
  ])
  
  const addNewTodo = (name) =>{
    const newTodo = {
      id:randomIntFromInterval(1,1000000),
      name:name 
    }

    setTodoList([...todoList,newTodo])

  }

  const deleteItemTodo = (id) => {
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  }

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  

  return (
    <>
    <Header/>
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew 
      addNewTodo = {addNewTodo}
      />
      {todoList.length > 0 ? 
      <TodoData
      deleteItemTodo = {deleteItemTodo}
      todoList = {todoList}
      />
      :
      <div className="todo-image">
        <img src={reactLogo} alt="" className="logo"/>
      </div>
      }
    </div>
    <Footer/>
    </>
  )
}

export default App
