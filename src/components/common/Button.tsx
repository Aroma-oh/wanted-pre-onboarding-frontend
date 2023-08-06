import { ButtonProps } from 'types/commonTypes'

export const Button = ({ type, testid, disabled, onClick }: ButtonProps) => {
  return (
    <button
      type='button'
      data-testid={testid}
      disabled={disabled}
      onClick={onClick}
    >
      {type}
    </button>
  )
}