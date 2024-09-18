export interface ResponseInterface<T> {
  code: number
  ok: boolean
  data: T
  message: string
}
