import React,{useState,useEffect} from "react";
import AddTodo from "./addTodo";
import { ITodo } from "../models/IUser";
import { getTodoData } from "../Utils/todoLocalStorege";
import { setTodoData } from "../Utils/todoLocalStorege";
import { clearTodo } from "../Utils/todoLocalStorege";
import { startId } from "../Utils/id";
import '../App.css';
import Search from "./search";



const TodoList:React.FC=()=>{
  
  const[state,setState]=useState<ITodo[]>(() => getTodoData());

  const[edit,setEdit] = useState<ITodo | null>(null);

  const [filterPriority, setFilterPriority] = useState<string>("");

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

const handleUpdate = (updatedTodo: ITodo) => {
  setState((prev) =>
    prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
  );
   setEdit(null);
};

const handleEdit = (todos : ITodo) => {
  setEdit(todos);
};

const searchFilter = (priority: string) => {
  setFilterPriority(priority);
};

const filteredTodos = filterPriority
  ? state.filter((todo) => todo.priority.toLowerCase() === filterPriority.toLowerCase())
  : state;

  return(
    <>  
    <div className="container">
      <div className="sticky-top bg-white py-3">
        <h1 className="text-center mb-4 bg-dark-subtle">ToDo List</h1>
        <AddTodo onAdd={handleAddTodo} onUpdate={handleUpdate} editingTodo={edit} />
        <Search onSearch={searchFilter} />
      </div>

      <div  className="container mt-3">
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
               filteredTodos.length > 0 ? (
              filteredTodos.map((todo, index) => (
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
                    <i className="ms-3 bi bi-pencil-fill" onClick={() => handleEdit(todo)}></i> 
                    <button className="btn btn-sm btn-danger ms-3 " 
                      onClick={() => handleDelete(todo.id)}>
                        <i className="bi bi-trash"></i>
                    </button>      
                         
                  </td>
                </tr>
              ))
            ): (
            <tr>
              <td colSpan={4}>No users found</td>
            </tr>
              )}
          </tbody>
        </table>
        <button className="btn btn-danger" onClick={handleClearAll}>Clear All Todo</button>
        </div>
      </div>
    </>
  )
}
export default TodoList;