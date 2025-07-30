import React, { useState } from "react";

// Props for the PriorityFilter component.
interface filterBarProps {                   
  onFilter: (priority: string) => void;     
}

const PriorityFilter: React.FC<filterBarProps> = ({ onFilter }) => {
  const [selected, setSelected] = useState("");

   // Updates local state and calls onFilter with new value.
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onFilter(value);
  };

  return (
    <div className="container mb-3">
      <select
        className="form-control w-25"
        value={selected}
        onChange={handleChange}
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default PriorityFilter;