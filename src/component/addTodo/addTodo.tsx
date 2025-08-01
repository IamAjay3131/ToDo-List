import React, { useEffect, useState } from "react";
import { ITodo } from "../../models/ITodo";


/* Props for the AddTodo component.
Callback to add a new Todo item.
Callback to update an existing Todo item.
Optional Todo object when editing existing item.*/

interface AddTodoProps {
  onAdd: (addData: Omit<ITodo ,"id">) => void;
  onUpdate: (updateData: ITodo) => void;
  editingTodo?: ITodo | null;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd, onUpdate, editingTodo }) => {

  /*State object for form inputs.*/

  const [addToDoItem, setAddToDoItem] = useState({
    id: "",
    name: "",
    priority: "",
    date: ""
  });

  //Errors object for form validation.
  const [errors, setErrors] = useState<{id?: String; name?: string; priority?: string; date?: string }>({});

  /**Synchronizes local form state whenever editingTodo changes.
   * If editingTodo is set, populates form fields with its values;
   * otherwise clears the form for a new entry. */
  useEffect(() => {
    if (editingTodo) {
      setAddToDoItem({
        id:editingTodo.id,
        name: editingTodo.name,
        priority: editingTodo.priority,
        date: editingTodo.date
      });
      setErrors({});
    } else {
      setAddToDoItem({ id: "", name: "", priority: "", date: "" });
      setErrors({});
    }
  }, [editingTodo]);

  // Handles changes in input/select fields.
  const handleChange = (field: keyof typeof addToDoItem, value: string) => {
  setAddToDoItem(prev => ({ ...prev, [field]: value }));
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }
};

const{id, name, priority, date} = addToDoItem;

   /**
   * Handles the Add / Update button click.
   * - Validates form fields (name, priority, date).  
   * - If validation fails, sets error messages and aborts.  
   * - If valid: constructs `newTodo` object (with new or existing ID),  
   *   then calls `onUpdate` if editing, or `onAdd` if adding.
   */
  const handleClick = () => {
    const newErr: typeof errors = {};
    if (!name.trim()) newErr.name = "Name is required";
    if (!priority) newErr.priority = "Priority is required";
    if (!date) newErr.date = "Due date required";
    if (Object.keys(newErr).length) {
      setErrors(newErr);
      return;
    }

    const newTodo: Omit<ITodo, 'id'>  = {
      name: name,
      priority: priority,
      date: date,
      completed: false
    };

    editingTodo ? onUpdate({...newTodo, id:editingTodo.id}) : onAdd(newTodo);

    setAddToDoItem({ id: "", name: "", priority: "", date: "" });
    setErrors({});
  };

  return (
    <div className="container mb-4">
      <form className="input-group">
        <input
          type="text"
          placeholder="ToDo name"
          value={name}
          onChange={e => handleChange("name", e.target.value)}
          className={`form-control w-25 ${errors.name ? "is-invalid" : ""}`}
        />
        <select
          value={priority}
          onChange={e => handleChange("priority", e.target.value)}
          className={`form-select w-20 ${errors.priority ? "is-invalid" : ""}`}
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          data-testid="due-date"
          value={date}
          onChange={e => handleChange("date", e.target.value)}
          className={`form-control w-15 ${errors.date ? "is-invalid" : ""}`}
        />
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          {editingTodo ? "Save" : "Add"}
        </button>
        <div className="input-group">
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
         {errors.priority && <div className="invalid-feedback">{errors.priority}</div>}
         {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
