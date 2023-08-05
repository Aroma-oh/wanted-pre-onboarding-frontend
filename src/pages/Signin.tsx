import { useInput } from '../hooks/useInput';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { emailValidate, passwordValidate } from '../utils/validation';
import { signinAPI } from '../apis/signApi';

import { useNavigate } from 'react-router';

export const Signin = () => {
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await signinAPI(email, password);
      navigate('/todo');
    }
    catch {
      alert("실패");
    }
  }

  return (
    <div>
      <h1>로그인</h1>
      <AuthInput
        id='eamil'
        type='text'
        testid='email-input'
        placeholder='user@wanted.com'
        value={email}
        onChange={handleEmail}
      />
      <AuthInput
        id='password'
        type='password'
        testid='password-input'
        placeholder='********'
        value={password}
        onChange={handlePassword}
      />
      <AuthButton
        type='로그인'
        testid='signin-button'
        disabled={!emailValidate(email) || !passwordValidate(password)}
        onClick={handleSubmit}
      />
    </div>
  )
}