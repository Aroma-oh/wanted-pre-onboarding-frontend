
import { TodoItem } from '../components/TodoItem';
import { updateTodo } from '../apis/todoApi';

interface TodoProps {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number,
}

interface Props {
  todoList: TodoProps[];
  fetchData: () => Promise<void>
}
export const TodoList = ({ todoList, fetchData }: Props) => {
  // 핸들러 관리
  const handleCheckBox = async (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const [target] = todoList.filter((todo) => todo.id === id);
    const todo = { todo: target.todo, isCompleted: event.target.checked };
    await updateTodo(id, todo);
    fetchData();
  };

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={(event) => handleCheckBox(todo.id, event)}
          />
          <TodoItem
            todo={todo.todo}
            id={todo.id}
            isCompleted={todo.isCompleted}
            fetchData={fetchData}
          />
        </li>
      ))}
    </ul>
  )
}
