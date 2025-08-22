import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "./DataTable";

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: "John Doe", age: 30, city: "New York" },
  { id: 2, name: "Jane Smith", age: 25, city: "Los Angeles" },
  { id: 3, name: "Bob Johnson", age: 35, city: "Chicago" },
  { id: 4, name: "Alice Brown", age: 28, city: "Houston" },
  { id: 5, name: "Charlie Wilson", age: 32, city: "Phoenix" },
];

const columns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    sortable: true,
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    sortable: true,
  },
  {
    key: "city",
    title: "City",
    dataIndex: "city",
    sortable: true,
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
  },
};

export const Selectable: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
  },
};
