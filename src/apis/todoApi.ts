import { todoAxios } from './axios'

export const createTodoAPI = async (todo: string) => {
  try {
    const response = await todoAxios.post('/todos', { todo });
    return response;
  }
  catch {
    alert("할 일 생성에 실패했습니다.");
  }
};

export const getTodosAPI = async () => {
  try {
    const response = await todoAxios.get('/todos');
    return response.data;
  }
  catch {
    alert("잠시 후 다시 시도해주세요.");
  }
};

export const updateTodo = async (id: number, todo: object) => {
  try {
    const response = await todoAxios.put(`todos/${id}`, todo);
    return response;
  }
  catch {
    alert("잠시 후 다시 시도해주세요.");
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const response = await todoAxios.delete(`todos/${id}`);
    return response;
  }
  catch {
    alert("잠시 후 다시 시도해주세요.");
  }
};


