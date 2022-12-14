import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Task from '../components/Task';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {TaskType} from '../api/todolist-api';

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const TaskContainer = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][1])
    return <Task
        id={task.id}
        status={task.status}
        title={task.title}
        todolistId="todolistId1"
        todolistEntityStatus="idle"
        taskEntityStatus="idle"
    />
}
const Template: ComponentStory<typeof TaskContainer> = (args) => <TaskContainer/>;

export const TaskExample = Template.bind({});
TaskExample.args = {};


