import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputField } from "./InputField";

const meta = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "Choose a unique username",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    value: "invalid-email",
    invalid: true,
    errorMessage: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    showPasswordToggle: true,
  },
};

export const WithClearButton: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search...",
    showClearButton: true,
    value: "Search term",
  },
};

export const FilledVariant: Story = {
  args: {
    label: "Filled Input",
    placeholder: "This is a filled input",
    variant: "filled",
  },
};

export const GhostVariant: Story = {
  args: {
    label: "Ghost Input",
    placeholder: "This is a ghost input",
    variant: "ghost",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size",
    size: "lg",
  },
};
