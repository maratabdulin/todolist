import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {action} from '@storybook/addon-actions';
import EditableSpan from '../components/EditableSpan';

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Onchange description'
        },
        value: {
            defaultValue: 'HTML'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    onChange: action('onChange')
}

