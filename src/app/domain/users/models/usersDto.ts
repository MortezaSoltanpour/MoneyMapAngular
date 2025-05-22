export interface userDto {
  email: string;
  password: string;
  fullName: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface TokenDto {
  jwt: string;
}
