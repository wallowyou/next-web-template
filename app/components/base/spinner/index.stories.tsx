import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Spinner from './index'

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Base/Spinner',
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: true,
  },
}

export const Hidden: Story = {
  args: {
    loading: false,
  },
}

export const WithChildren: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
}
