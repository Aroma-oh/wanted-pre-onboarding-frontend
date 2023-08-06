// react import
import { useEffect, useState } from 'react';
// component import
import { TodoAdd } from 'components/todo/TodoAdd';
import { TodoList } from 'components/todo/TodoList';
// api, type import
import { getTodosAPI } from 'apis/todoApi';
import { TodoProps } from 'types/todoTypes';

export const Todo = () => {
  const [todoList, setTodoList] = useState<TodoProps[]>([]);

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