export interface IuserTokenResponse {
  acessToken?: string;
  refreshToken?: string;
  error?: string;
}

export interface IUser {
  email: string
  firstName: string
  lastName: string
}

export interface IJob {
  name: string
  external_link: string
}
