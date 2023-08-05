import { signAxios } from './axios';


export const signinAPI = async (email: string, password: string) => {
  try {
    const response = await signAxios.post('/auth/signin', { email, password });
    localStorage.setItem("access_token", response.data.access_token);
    return response;
  }
  catch {
    alert("로그인에 실패했습니다.");
  }
}

export const signupAPI = async (email: string, password: string) => {
  try {
    const response = await signAxios.post('/auth/signup', { email, password });
    return response;
  }
  catch {
    alert("회원가입에 실패했습니다.");
  }
}