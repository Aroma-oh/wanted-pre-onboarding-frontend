import { createBrowserRouter } from "react-router-dom";
import { Todo } from 'pages/Todo';
import { Signin } from 'pages/Signin';
import { Signup } from 'pages/Signup';

import { redirectTodo, redirectSignin } from 'utils/redirect';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
    loader: redirectTodo,
  },
  {
    path: "/signin",
    element: <Signin />,
    loader: redirectTodo,
  },
  {
    path: "/signup",
    element: <Signup />,
    loader: redirectTodo,
  },
  {
    path: "/todo",
    element: <Todo />,
    loader: redirectSignin,
  },
])