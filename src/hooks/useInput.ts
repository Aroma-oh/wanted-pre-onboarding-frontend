import { ChangeEvent, useState } from 'react';

type ReturnTypes = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
];

export const useInput = (initialData: string): ReturnTypes => {

  const [value, setValue] = useState(initialData);

  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return [value, handler];
}