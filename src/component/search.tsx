import React, { useState } from "react";

interface filterBarProps {
  onSearch: (priority: string) => void;
}

const Search: React.FC<filterBarProps> = ({ onSearch }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onSearch(value);
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

export default Search;