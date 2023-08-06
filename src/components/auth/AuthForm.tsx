// component import
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
// validate import
import { emailValidate, passwordValidate } from 'utils/validation';
// type import
import { AuthProps } from 'types/authTypes';

export const AuthForm = ({
  email,
  handleEmail,
  password,
  handlePassword,
  handleSubmit,
  type,
  testid
}: AuthProps) => {

  return (
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
        type={type}
        testid={testid}
        disabled={!emailValidate(email) || !passwordValidate(password)}
        onClick={handleSubmit}
      />
    </form>
  )
}