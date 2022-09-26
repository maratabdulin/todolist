import React, {useState} from 'react';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';
import './App.css'

export type FilterType = 'all' | 'active' | 'completed';

const App = () => {

    const [filter, setFilter] = useState<FilterType>('all');
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]);

    let tasksForTodolist: Array<TaskType> = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value);
    }
    const addTask = (title: string) => {
        let newTask =  {id: v1(), title: title, isDone: true};
        let newTasks: Array<TaskType> = [newTask, ...tasks]
        setTasks(newTasks);
    }

    const changeTaskStatus = (id:string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone: isDone} : task));
        }

    return (
        <div>
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    )
}

export default App;
