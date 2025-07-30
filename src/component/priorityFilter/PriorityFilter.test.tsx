import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PriorityFilter from "./priorityFilter";// adjust the path as needed

describe("filter component", () => {
  test("calls onFilter with selected priority when option is changed", () => {
    const filterByPriority = jest.fn();
    render(<PriorityFilter onFilter={filterByPriority} />);

    // Find the select element
    const select = screen.getByRole("combobox");

    // Change to "Low"
    fireEvent.change(select, { target: { value: "Low" } });
    expect(filterByPriority).toHaveBeenCalledWith("Low");

    // Change to "Medium"
    fireEvent.change(select, { target: { value: "Medium" } });
    expect(filterByPriority).toHaveBeenCalledWith("Medium");

    // Change to "High"
    fireEvent.change(select, { target: { value: "High" } });
    expect(filterByPriority).toHaveBeenCalledWith("High");

    // Change to empty string (All Priorities)
    fireEvent.change(select, { target: { value: "" } });
    expect(filterByPriority).toHaveBeenCalledWith("");
  });
});