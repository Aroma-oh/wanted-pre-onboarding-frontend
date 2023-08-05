export const emailValidate = (email: string) => {
  return !!email.includes("@");
}

export const passwordValidate = (password: string) => {
  return password.length >= 8;
}
