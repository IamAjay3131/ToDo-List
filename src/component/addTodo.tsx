import React,{useState} from "react";
import { ITodo } from "../models/IUser";
import createId from "../Utils/id";

interface addIteamsPRops{
    onAdd:(addData:ITodo)=>void;
}

const AddTodo:React.FC<addIteamsPRops> = ({onAdd}) => {

    const[state,setState] = useState({
        id:'',
        name:'',
        priority:'',
        date:'',
    });

    const {id, name, priority, date} = state;

    const handleClick = () => {
        if(!name.trim() || !priority || !date){
            alert("All fields are mendatry")
            return;
        }

        const newTodoValues:ITodo={
            id:createId(),
            name,
            priority,
            date,
            completed:false,
        };
         onAdd(newTodoValues)

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
                            Add-Button
                    </button>
                   </form>
            </div>
        </>
    )
}
export default AddTodo;