// react router import 
import { useNavigate, Link } from 'react-router-dom';
// custom hook, api import
import { useInput } from 'hooks/useInput';
import { signupAPI } from 'apis/signApi';
// component import
import { AuthForm } from 'components/AuthForm';


export const Signup = () => {
  const navigate = useNavigate();

  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");

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
      <AuthForm
        email={email}
        handleEmail={handleEmail}
        password={password}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        type='회원가입'
        testid='signup-button'
      />
      <Link to='/signin'>로그인</Link>
      <span>으로 이동하기 </span>
    </div>
  )
}