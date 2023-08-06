import { ChangeEvent } from 'react';

export interface ButtonProps {
  type: string;
  testid: string;
  disabled?: boolean;
  onClick: () => Promise<void> | void;
}

export interface InputProps {
  type: string;
  testid: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}