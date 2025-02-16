export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 3;
export const NAME: RegExp = /^[A-Za-z]{3,}$/;
export const PASSWORD_VALID: RegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
