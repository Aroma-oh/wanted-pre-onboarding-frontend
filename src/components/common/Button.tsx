interface Props {
  type: string,
  testid: string,
  disabled?: boolean,
  onClick: () => Promise<void> | void;
}

export const Button = ({ type, testid, disabled, onClick }: Props) => {
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