import DbTbl from './general/general-tbls'
import RespondTexts from './respondTexts'
import { IJsonObject, Nullable } from './types'

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
    this.name = 'Texts'
    this.text = text || ''
    this.textId = textId || null
    this.categoryId = categoryId || null
    this.date = date || ''
  }

  public fillTable(res: RespondTexts) {
    // TODO add rows not a single row
    const text = res.data[0]
    this.text = text.text
    this.textId = text.textId
    this.categoryId = text.categoryId
    this.date = text.date
    this.id = text.id
    return 1
  }

  public addData(row:IJsonObject):number {
    return 1
  }

  public setId(value: number) {
    if (value !== this.id) {
      this.id = value
    }
  }
}
