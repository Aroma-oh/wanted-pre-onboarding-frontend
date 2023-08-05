import { signAxios } from './axios';


export const signinAPI = async (email: string, password: string) => {
  try {
    const response = await signAxios.post('/auth/signin', { email, password });
    return response;
  }
  catch {
    throw new Error('로그인에 실패했습니다.');
  }
}

export const signupAPI = async (email: string, password: string) => {
  try {
    const response = await signAxios.post('/auth/signup', { email, password });
    return response;
  }
  catch {
    throw new Error('회원가입에 실패했습니다.');
  }
}