import { useEffect, useState } from 'react'
import { TodoAdd } from '../components/TodoAdd'
import { TodoList } from '../components/TodoList';

import { getTodosAPI } from '../apis/todoApi';

interface TodoProps {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number,
}
export const Todo = () => {
  const [todoList, setTodoList] = useState<TodoProps[]>([]);

  // 데이터 관리
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getTodosAPI();
    setTodoList(data);
  };

  return (
    <div>
      <h1>I Can Do It !</h1>
      <TodoAdd fetchData={fetchData} />
      <TodoList fetchData={fetchData} todoList={todoList} />
    </div>
  )
}