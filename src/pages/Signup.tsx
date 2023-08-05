import { useInput } from '../hooks/useInput';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { emailValidate, passwordValidate } from '../utils/validation';
import { signupAPI } from '../apis/signApi';

import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => {
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await signupAPI(email, password);
      navigate('/signin');
    }
    catch {
      throw new Error("Sign up failed");
    }
  }

  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <Input
          id='eamil'
          type='text'
          testid='email-input'
          placeholder='user@wanted.com'
          value={email}
          onChange={handleEmail}
        />
        <Input
          id='password'
          type='password'
          testid='password-input'
          placeholder='********'
          value={password}
          onChange={handlePassword}
        />
        <Button
          type='회원가입'
          testid='signin-button'
          disabled={!emailValidate(email) || !passwordValidate(password)}
          onClick={handleSubmit}
        />
      </form>
      <Link to='/signin'>로그인</Link>
      <span>으로 이동하기 </span>
    </div>
  )
}