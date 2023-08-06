// react router import 
import { useNavigate, Link } from 'react-router-dom';
// custom hook, api import
import { useInput } from 'hooks/useInput';
import { signinAPI } from 'apis/signApi';
// component import
import { AuthForm } from 'components/auth/AuthForm';
import { AuthStyle } from 'components/auth/AuthStyle';

export const Signin = () => {
  const navigate = useNavigate();

  const [email, handleEmail] = useInput('');
  const [password, handlePassword] = useInput('');


  const handleSubmit = async () => {
    try {
      await signinAPI(email, password);
      navigate('/todo');
    }
    catch {
      throw new Error('Sign in failed');
    }
  }

  return (
    <AuthStyle>
      <h1>로그인</h1>
      <AuthForm
        email={email}
        handleEmail={handleEmail}
        password={password}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        type='로그인'
        testid='signin-button'
      />
      <div className='link'>
        <Link to='/signup'>회원가입</Link>
        <span>으로 이동하기 </span>
      </div>
    </AuthStyle>
  )
}
