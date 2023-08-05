import { ChangeEvent } from 'react'

interface Props {
  testid: string,
  id: string,
  type: string,
  placeholder: string,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const AuthInput = ({ testid, id, type, placeholder, value, onChange }: Props) => {
  return (
    <div className='auth-input'>
      <label htmlFor={id}></label>
      <input
        id={id}
        type={type}
        data-testid={testid}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>

  )
}