import React, { useEffect, useState } from "react";
import { ITodo } from "../../models/ITodo";

interface AddTodoProps {
  onAdd: (addData: Omit<ITodo, "id">) => void;
  onUpdate: (updateData: ITodo) => void;
  editingTodo?: ITodo | null;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd, onUpdate, editingTodo }) => {
  const [todoItem, setTodoItem] = useState<Omit<ITodo, "completed"> & { id?: string }>({
    id: "",
    name: "",
    priority: "",
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTodoItem({
        id: editingTodo.id,
        name: editingTodo.name,
        priority: editingTodo.priority,
        date: editingTodo.date,
      });
      setSubmitted(false);

    } else {
      setTodoItem({ id: "", name: "", priority: "", date: "" });
      setSubmitted(false);
    }
    
  }, [editingTodo]);

  const { id, name, priority, date } = todoItem;

  const isValid = name !== "" && priority !== "" && date !== "";

  const handleSubmit = () => {
    setSubmitted(true);
    if (!isValid) return;

    if (editingTodo) {
      onUpdate({
        id: id!,
        name,
        priority,
        date,
        completed: editingTodo.completed,
      });
    } else {
      onAdd({ name, priority, date, completed: false });
    }

    setTodoItem({ id: "", name: "", priority: "", date: "" });
    setSubmitted(false);
  };

  const nameError = submitted && !name;
  const priorityError = submitted && !priority;
  const dateError = submitted && !date;

  return (
    <div className="container mb-4">
      <form className="input-group" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="ToDo name"
          value={name}
          onChange={(e) => setTodoItem({ ...todoItem, name: e.target.value })}
          className={`form-control ${nameError ? "error" : ""}`}
        />

        <select
          value={priority}
          onChange={(e) => setTodoItem({ ...todoItem, priority: e.target.value })}
          className={`form-control ${priorityError ? "error" : ""}`}
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setTodoItem({ ...todoItem, date: e.target.value })}
          className={`form-control ${dateError ? "error" : ""}`}
        />

        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          {editingTodo ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
