export type ResponseJson<T> = {
    success: boolean,
    message: string,
    data?: T,
    errors?: any
}

// type Error = {

// }