import React  from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Task from '../Task';
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {TaskType} from '../state/task-reducer';

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const TaskContainer = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][1])
    return <Task id={task.id} isDone={task.isDone} title={task.title} todolistId='todolistId1'/>
}
const Template: ComponentStory<typeof TaskContainer> = (args) => <TaskContainer/>;

export const TaskExample = Template.bind({});
TaskExample.args = {};


