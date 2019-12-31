export enum stCodes {
  success = 'success',
  error = 'error',
  fail = 'fail',
}

export type Nullable<T> = T | null
interface IBaseDBTable {
  id: number
}

export interface IText extends IBaseDBTable {
  text: string
  textId: number
  categoryId: number
  date: string
}

export interface ICategory extends IBaseDBTable {
  description: string
}

export interface IJsonObject {
  [key: string]: any
}

export interface IGeneralRespond<T>{
  data: T[]
}
