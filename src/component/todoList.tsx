import React,{useState,useEffect} from "react";
import AddTodo from "./addTodo";
import { ITodo } from "../models/IUser";
import { getTodoData } from "../Utils/todoLocalStorege";
import { setTodoData } from "../Utils/todoLocalStorege";
import { clearTodo } from "../Utils/todoLocalStorege";
import { startId } from "../Utils/id";
import '../App.css';

const TodoList:React.FC=()=>{
  
  const[state,setState]=useState<ITodo[]>(() => getTodoData());

  const handleAddTodo = (values:ITodo) => {
      setState((prev) => [...prev, values])
  }

    const handleDelete = (id: string | number) => {
    setState((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleClearAll = () => {
    clearTodo();
    setState([]);
    startId();
  };

  useEffect(()=>{
    setTodoData(state)
  },[state]);

  const taskComplete = (id: string | number) => {
  setState(prev =>
    prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

  return(
    <>  
    <h1 className="text-center mb-4 bg-dark-subtle">ToDo List</h1>
    <div className="container">
    <AddTodo onAdd={handleAddTodo} />
        <table className="table table-striped table-hover table-bordered text-center">
          <thead>
            <tr className="table-info">
              <th>ID</th>
              <th>Name</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              state.map((todo, index) => (
                <tr key={todo.id} className={todo.completed ? 'strikeout' : ''}>                  
                  <td>{index+1}</td>
                  <td>{todo.name}</td>
                  <td>{todo.priority}</td>
                  <td>{todo.date}</td>
                  <td>
                     <input
                      type="checkbox"
                      className="form-check-input "
                      checked={todo.completed || false}
                      onChange={() => taskComplete(todo.id)}
                    />
                    <button className="btn btn-sm btn-danger ms-3" 
                      onClick={() => handleDelete(todo.id)}>
                        <i className="bi bi-trash"></i>
                    </button>                   
                  </td>
                </tr>
              ))
              }
          </tbody>
        </table>
        <button className="btn btn-danger" onClick={handleClearAll}>Clear All Todo</button>
        </div>
    </>
  )
}
export default TodoList;