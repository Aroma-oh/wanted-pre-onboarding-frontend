import { InputProps } from 'types/commonTypes';

export const Input = ({ testid, id, type, placeholder, value, onChange }: InputProps) => {
  return (
    <div className='input'>
      <label htmlFor={id} />
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