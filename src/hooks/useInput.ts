import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';

type ReturnTypes = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<string>>,
];

export const useInput = (initialData: string): ReturnTypes => {

  const [value, setValue] = useState(initialData);

  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return [value, handler, setValue];
}