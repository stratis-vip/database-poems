import DbTbl from './general/general-tbls'
import RespondTexts from './respondTexts'
import { Nullable } from './types'

export default class TblText extends DbTbl {
  public id: Nullable<number> = null
  public categoryId: Nullable<number> = null
  public date: string = ''
  public text: string = ''
  public textId: Nullable<number> = null

  /**
   * Construct a new poem. Id is given by database server!!!!
   * @param text Text of poem
   * @param textId id of poem in category
   * @param categoryId id of category
   * @param date date of creation
   */
  constructor(text?: string, textId?: Nullable<number>, categoryId?: Nullable<number>, date?: string) {
    super()
    this.text = text || ''
    this.textId = textId || null
    this.categoryId = categoryId || null
    this.date = date || ''
  }

  public fill(res: RespondTexts) {
    const text = res.data[0]
    this.text = text.text
    this.textId = text.textId
    this.categoryId = text.categoryId
    this.date = text.date
    this.id = text.id
  }

  public setId(value: number) {
    if (value !== this.id) {
      this.id = value
    }
  }
}
