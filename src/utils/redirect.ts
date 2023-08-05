import { redirect } from "react-router-dom";

export const redirectTodo = () => {
  const token = localStorage.getItem('access_token');

  if (token !== null) {
    return redirect('/todo');
  }

  return null;
}

export const redirectSignin = () => {
  const token = localStorage.getItem('access_token');

  if (token === null) {
    return redirect('/signin');
  }

  return null;
}