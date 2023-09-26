export declare interface RestoreRequest {
  user_tel: string
  password: string
  restore: boolean
}

export declare interface RestoreResponse {
  accessToken: string
  refreshToken: string
}
