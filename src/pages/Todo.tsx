import { useEffect, useState } from 'react'
import { TodoAdd } from '../components/TodoAdd'

import { getTodosAPI, updateTodo } from '../apis/todoApi';
import { TodoItem } from '../components/TodoItem';

interface Props {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number,
}
export const Todo = () => {
  const [todoList, setTodoList] = useState<Props[]>([]);

  // 데이터 관리
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getTodosAPI();
    setTodoList(data);
  };

  // 핸들러 관리
  const handleCheckBox = async (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const [target] = todoList.filter((todo) => todo.id === id);
    const todo = { todo: target.todo, isCompleted: event.target.checked };
    await updateTodo(id, todo);
    fetchData();
  };

  return (
    <div>
      <h1>I Can Do It !</h1>
      <TodoAdd fetchData={fetchData} />
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
    </div>
  )
}