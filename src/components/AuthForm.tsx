// react import
import { ChangeEvent } from 'react';
// component import
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
// validate import
import { emailValidate, passwordValidate } from 'utils/validation';

interface Props {
  email: string;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  type: string;
  testid: string;
}

export const AuthForm = ({
  email,
  handleEmail,
  password,
  handlePassword,
  handleSubmit,
  type,
  testid
}: Props) => {

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