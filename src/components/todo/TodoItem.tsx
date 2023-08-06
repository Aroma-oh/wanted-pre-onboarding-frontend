// react import
import { useState } from 'react'
// custom hook, api import 
import { useInput } from 'hooks/useInput';
import { deleteTodo, updateTodo } from 'apis/todoApi';
// component import 
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';

import { TodoProps } from 'types/todoTypes';

interface Props {
  todoData: TodoProps;
  fetchData: () => Promise<void>;
};

export const TodoItem = ({ todoData, fetchData }: Props) => {
  const { todo, id, isCompleted } = todoData;

  const [isModifyMode, setIsModifyMode] = useState(false);
  const [todoModify, handleTodoModify, setTodoModify] = useInput('');

  const handleModify = () => {
    setIsModifyMode(true);
    setTodoModify(todo);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchData();
  };

  const handleSubmit = async (id: number) => {
    await updateTodo(id, { todo: todoModify, isCompleted });
    await fetchData();
    setIsModifyMode(false);
  }
  const handleCancel = async () => {
    setIsModifyMode(false);
  };

  return (
    <>
      {isModifyMode
        ? (
          <div>
            <Input
              testid='modify-input'
              id='todo'
              type='text'
              value={todoModify}
              onChange={handleTodoModify}
            />
            <div className='button-group'>
              <Button
                type='제출'
                testid='submit-button'
                onClick={() => handleSubmit(id)}
              />
              <Button
                type='취소'
                testid='cancel-button'
                onClick={handleCancel}
              />
            </div>
          </div>
        )
        : (
          <div>
            <span>{todo}</span>
            <div className='button-group'>
              <Button
                type='수정'
                testid='modify-button'
                onClick={handleModify}
              />
              <Button
                type='삭제'
                testid='delete-button'
                onClick={() => handleDelete(id)}
              />
            </div>
          </div>
        )
      }
    </>

  )
}