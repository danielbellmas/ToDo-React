import React, { useState, useEffect } from "react";
import './App.css';
//Importing components
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {
  //Using State
  const [inputText, setInputText] = useState("");
  const [todos,setTodos] = useState([])
  const [status,setStatus] = useState("all")
  const [filteredTodos,setFilteredTodos] = useState([])
  
  //Use Effect
  useEffect(()=>{
    getLocalTodos();
  },[]);

  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status]);
  
  //Functions

  const filterHandler = ()=>{
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
                break;
      case 'uncompleted':
          setFilteredTodos(todos.filter(todo=>todo.completed === false));
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }
  //Save to local
  const  saveLocalTodos = ()=>{
      localStorage.setItem('todos',JSON.stringify(todos))
  };
  const getLocalTodos = ()=>{
    if(localStorage.getItem('todos')===null)
      localStorage.setItem('todos',JSON.stringify([]))
    else{
      let todoLocal =JSON.parse(localStorage.getItem('todos',JSON.stringify(todos)))
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>  
        <h1>Daniel's Todo List</h1>
      </header>
      <Form  setStatus={setStatus} inputText={inputText} setInputText = {setInputText}  todos = {todos} setTodos ={setTodos}/>
      <TodoList filteredTodos = {filteredTodos} todos = {todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
