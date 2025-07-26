import React,{useEffect, useState} from "react";
import { ITodo } from "../models/IUser";
import createId from "../Utils/id";

interface addIteamsPRops{
    onAdd:(addData:ITodo)=>void;
    onUpdate:(updateData:ITodo)=>void;
    editingTodo?: ITodo | null;
}

const AddTodo:React.FC<addIteamsPRops> = ({onAdd, onUpdate, editingTodo}) => {

    const[state,setState] = useState({
        id:'',
        name:'',
        priority:'',
        date:'',
    });

    useEffect(() => {
  if (editingTodo) {
    setState(prev => ({
      ...prev, name:editingTodo.name,
      priority: editingTodo.priority,
      date: editingTodo.date
    }));
  }
}, [editingTodo]);


    const {id, name, priority, date} = state;

    const handleClick = () => {
        if(!name.trim() || !priority || !date){
            alert("All fields are mendatry")
            return;
        }

        const newTodoValues:ITodo={
            id: editingTodo ? editingTodo.id :createId(),
            name,
            priority,
            date,
            completed:false,
        };
        if(editingTodo){
          onUpdate(newTodoValues)  
        }else{
            onAdd(newTodoValues)
        }
         
         setState({id:'',name:'',priority:'',date:''})

    };

    return(
        <>
            <div className="container">
                   <form className="input-group mb-4">
                     <input
                        className="form-control w-25" 
                        type="text" 
                        name="name"
                        placeholder="name" 
                        value={name} 
                        onChange = {(event) => setState({...state, name:event.target.value})}
                        aria-label="Username" 
                        aria-describedby="addon-wrapping" 
                    />
                    <select 
                         className="form-control w-20" 
                        value={priority}
                        name="priority"
                        onChange={(event) => setState({...state, priority:event.target.value})}
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                
                    <input type="date"
                        className="form-control w-15" 
                        value={date} 
                        name="date"
                        onChange={(event)=>setState({...state, date:event.target.value})}
                    />
                     <button type="button" className="btn btn-primary"
                        onClick={handleClick}>
                            {editingTodo? "Save" : "Add"}
                    </button>
                   </form>
            </div>
        </>
    )
}
export default AddTodo;
