// component import 
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
// custom hook, api import 
import { useInput } from 'hooks/useInput';
import { createTodoAPI } from 'apis/todoApi';

interface Props {
  fetchData: () => Promise<void>;
}

export const TodoAdd = ({ fetchData }: Props) => {
  const [todo, handleTodo, setTodo] = useInput('');

  const handleSubmit = async () => {
    await createTodoAPI(todo);
    await fetchData();
    setTodo('');
  };

  return (
    <form>
      <Input
        id='todo'
        type='text'
        testid='new-todo-input'
        placeholder='할 일을 입력해주세요'
        value={todo}
        onChange={handleTodo}
      />
      <Button
        type='추가'
        testid='new-todo-add-button'
        disabled={todo === ''}
        onClick={handleSubmit}
      />
    </form>
  )
}