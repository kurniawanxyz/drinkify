export type Register = {
    name: string|null
    email: string|null,
    password: string|null
}

export type Login = Omit<Register, "name">

export type LoginResponse = {
    token: string,
    expired_at: string,
}