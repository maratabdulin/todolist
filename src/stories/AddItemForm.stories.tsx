import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import AddItemForm from '../components/AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const addItemCallback = action('Add item')

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    addItem: addItemCallback
}

