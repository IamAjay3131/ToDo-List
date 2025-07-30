import React,{useState,useEffect} from "react";
import AddTodo from "./addTodo/addTodo";
import { ITodo } from "../models/ITodo";
import { getTodoData, setTodoData,clearTodo } from "../Utils/todoLocalStorege";
import '../App.css';
import PriorityFilter from "./priorityFilter/priorityFilter";
import $ from 'jquery';
import 'bootstrap-notify';
import { v4 as uuidv4 } from 'uuid';

const TodoList:React.FC=()=>{

   /**
   * Current array of todo items.
   * Initialized from localStorage via getTodoData().
   */
  const[state,setState]=useState<ITodo[]>(() => getTodoData());

   // Holds the currently editing Todo (or null).
  const[edit,setEdit] = useState<ITodo | null>(null);

   //Selected priority filter value.Empty string = no filter.
  const [filterPriority, setFilterPriority] = useState<string>("");

  //Sorting state for due date: null = no sort; true = ascending; false = descending.
const [sortByDueDate, setSortByDueDate] = useState<boolean | null>(null);

//Adds a new todo item.
  const handleAddTodo = (values: Omit<ITodo, 'id'>) => {
  const newTodo: ITodo = { ...values, id: uuidv4() };
  setState(prev => [...prev, newTodo]);
  ($ as any).notify("Todo added successfully!", "success");
}

    //Deletes a todo by ID.
    const handleDelete = (id:string) => {
    setState((prev) => prev.filter((todo) => todo.id !== id));
  };

  //Clears all todos from state and local storage.
  const handleClearAll = () => {
    clearTodo();
    setState([]);
  };

   //Persist todos to local storage when they change.
  useEffect(()=>{
    setTodoData(state)
  },[state]);

  //Toggles the completed flag of a todo.
  const taskComplete = (id:string) => {
  setState(prev =>
    prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

 /**
   * Updates an existing todo with new values.
   * @param {ITodo} updatedTodo - Todo item with updated data.
   * @returns {void}
   */
const handleUpdate = (updatedTodo: ITodo) => {
  setState((prev) =>
    prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
  );
   setEdit(null);
    ($ as any).notify("Todo updated successfully!", "success");
};

/**
   * Marks a todo as being edited by setting local edit state.
   * @param {ITodo} todos - The todo item to edit.
   * @returns {void}
   * */
const handleEdit = (todos : ITodo) => {
  setEdit(todos);
};

   /**
   * Sets the priority filter value.
   * @param {string} priority - Selected priority to filter ('Low', 'Medium', 'High' or '').
   */
const searchFilter = (priority: string) => {
  setFilterPriority(priority);
};

   //Toggles due date sorting state.
const dueDateSorting = () => {
    if(sortByDueDate === null){
      setSortByDueDate(true);
    }
    else{
      setSortByDueDate(!sortByDueDate)
    }
  };

    // Apply filtering and sorting to todos.
const filteredTodos = filterPriority
  ? state.filter((todo) => todo.priority.trim().toLowerCase() === filterPriority.trim().toLowerCase())
  : [...state];

  if(sortByDueDate !== null){
    filteredTodos.sort((a,b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortByDueDate ? dateA-dateB : dateB-dateA
    });
  }

  return(
    <>  
    <div className="container">
      <div className="sticky-top bg-white py-3">
        <h1 className="text-center mb-4 bg-dark-subtle">ToDo List</h1>
        <AddTodo onAdd={handleAddTodo} onUpdate={handleUpdate} editingTodo={edit} />
        <PriorityFilter onFilter={searchFilter} />
      </div>

      <div className="table-scroll">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead>
            <tr className="table-info">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Priority</th>
             <th scope="col" onClick={dueDateSorting} style={{ cursor: 'pointer' }}>
                Due Date
                {sortByDueDate === null && <i className="fa-solid fa-sort ms-3"></i>}
                {sortByDueDate === true && <i className="fa-solid fa-caret-up ms-3"></i>}
                {sortByDueDate === false && <i className="fa-solid fa-caret-down ms-3"></i>}
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
               filteredTodos.length > 0 ? (
              filteredTodos.map((todo,index) => (
                <tr key={todo.id} className={todo.completed ? 'strikeout' : ''}>                  
                  <td>{index +1}</td>
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
              <td colSpan={5}>No data found</td>
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