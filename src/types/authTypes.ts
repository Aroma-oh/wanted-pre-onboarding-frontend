import { ChangeEvent } from 'react';

export interface AuthProps {
  email: string;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  type: string;
  testid: string;
}
