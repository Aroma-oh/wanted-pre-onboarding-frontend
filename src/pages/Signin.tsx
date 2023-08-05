import { useInput } from '../hooks/useInput';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { emailValidate, passwordValidate } from '../utils/validation';
import { signinAPI } from '../apis/signApi';

import { useNavigate, Link } from 'react-router-dom';

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
      throw new Error("Sign in failed");
    }
  }
  // 8879841@mmm.com
  return (
    <div>
      <h1>로그인</h1>
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
          type='로그인'
          testid='signin-button'
          disabled={!emailValidate(email) || !passwordValidate(password)}
          onClick={handleSubmit}
        />
      </form>

      <Link to='/signup'>회원가입</Link>
      <span>으로 이동하기 </span>
    </div>
  )
}