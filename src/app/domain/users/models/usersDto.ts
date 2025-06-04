export interface userDto {
  idUser?: string;
  email: string;
  password?: string;
  fullname: string;
  dateRegistered?: Date;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface TokenDto {
  jwt: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
