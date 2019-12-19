export declare enum stCodes {
  success = 'success',
  error = 'error',
  fail = 'fail',
}
export declare type Nullable<T> = T | null
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
export {}