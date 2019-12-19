import Respond, { stCodes } from './Respond'

type Nullable<T> = T | null
interface IText {
  id: number
  text: string
  textId: number
  categoryId: number
  date: string
}

class TblTexts {
  public id: Nullable<number> = null
  public categoryId: Nullable<number> = null
  public date: string = ''
  public text: string = ''
  public textId: Nullable<number> = null

  constructor(id?: number, text?: string, textId?: number, categoryId?: number, date?: string) {
    id = id
    text = text
    textId = textId
    categoryId = categoryId
    date = date
  }

  public fromRespond(respond: Respond) {
    if (!respond || respond.status !== stCodes.success) {
      return
    }

    const data = respond.data[0] as IText
    if (data !== undefined) {
      this.id = data.id
      this.textId = data.textId
      this.text = data.text
      this.categoryId = data.categoryId
      this.date = data.date
    }
  }
}

export default TblTexts
