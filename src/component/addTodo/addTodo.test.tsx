import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTodo from "./addTodo";
import { ITodo } from "../../models/IUser";

describe("AddTodo Component", () => {
  const mockOnAdd = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input fields and button", () => {
    render(<AddTodo onAdd={mockOnAdd} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByPlaceholderText("ToDo name")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByTestId("due-date")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", () => {
    render(<AddTodo onAdd={mockOnAdd} onUpdate={mockOnUpdate} />);
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Priority is required")).toBeInTheDocument();
    expect(screen.getByText("Due date required")).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("calls onAdd with correct data", () => {
    render(<AddTodo onAdd={mockOnAdd} onUpdate={mockOnUpdate} />);

    fireEvent.change(screen.getByPlaceholderText("ToDo name"), {
      target: { value: "ToDo Task" },
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "High" },
    });

    const dateInput = screen.getByTestId("due-date") as HTMLInputElement;
    fireEvent.change(dateInput, {
      target: { value: "2025-08-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd.mock.calls[0][0]).toMatchObject({
      name: "ToDo Task",
      priority: "High",
      date: "2025-08-01",
      completed: false,
    });
  });

  test("loads existing todo in edit mode and updates on save", () => {
    const existingTodo: ITodo = {
      id: "123",
      name: "Edit ToDo",
      priority: "Medium",
      date: "2025-07-30",
      completed: false,
    };

    render(
      <AddTodo
        onAdd={mockOnAdd}
        onUpdate={mockOnUpdate}
        editingTodo={existingTodo}
      />
    );

    expect(screen.getByDisplayValue("Edit ToDo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Medium")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025-07-30")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("ToDo name"), {
      target: { value: "Updated ToDo" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...existingTodo,
      name: "Updated ToDo",
    });
  });
});