import { ITodo } from "../models/IUser";


const todoKey = "todoKey";

export const getTodoData = ():ITodo[] => {
    const getData = localStorage.getItem(todoKey);
    if(!getData){return []}
    return JSON.parse(getData)
};

export const setTodoData = (todos:ITodo[]) => {
    const saveTodo =localStorage.setItem(todoKey,JSON.stringify(todos));
};

export const clearTodo = ():void => {
    localStorage.removeItem(todoKey)
}
