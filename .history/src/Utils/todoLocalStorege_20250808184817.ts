import { ITodo } from "../models/ITodo";

const todoKey = "todoKey";

export const getTodoData = ():ITodo[] => {
    const getData = localStorage.getItem(todoKey);
    if(!getData){return []}

    try {
        const parseData = JSON.parse(getData)
        return parseData
    } catch (error) {
        console.error("Failed to parse todo data from localStorage:", error);
    return [];
    }
};

export const setTodoData = (todos:ITodo[]) => {
    try {
    localStorage.setItem(todoKey, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todo data to localStorage:", error);
  }
};

export const clearTodo = ():void => {
    localStorage.removeItem(todoKey)
}
