
interface Props {
  type: string,
  testid: string,
  disabled: boolean,
  onClick: () => Promise<void>,
}
export const AuthButton = ({ type, testid, disabled, onClick }: Props) => {
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