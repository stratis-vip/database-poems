import { checkArrayForObject, getRowIds, joinWithCustomValue } from '../../helpers'
import { IJsonObject } from '../../types'

export class JsonClass {
  set columns(value: IJsonObject[]) {
    if (value !== this._columns) {
      this._columns = value
    }
  }

  public static combine(ar: JsonClass[], operator: string, addTerm: boolean = true): string {
    const add = addTerm !== undefined ? addTerm : true
    let where: string | null = this.term ? this.term : null

    if (!add) {
      where = null
    }
    let retVal: string | null = null
    if (ar.length !== 0) {
      const res: string[] = []
      ar.forEach(jc => {
        res.push(jc.toString(false) as string)
      })
      retVal = joinWithCustomValue(res, operator)
    }
    retVal = where ? `${where} ${retVal}` : retVal
    return retVal!
  }
  protected static term?: string
  public operator: string | null = null
  public act: string = '='

  // tslint:disable-next-line: variable-name
  protected _columns: IJsonObject[] = []
  // tslint:disable-next-line: variable-name
  protected _descriptors: string[]
  // tslint:disable-next-line: variable-name
  protected _values: any[]
  // tslint:disable-next-line: variable-name
  private _term: string

  constructor(term: string, columns?: IJsonObject[]) {
    this._descriptors = []
    this._values = []
    this._term = term
    if (columns) {
      this._columns = columns
      columns.forEach(col => {
        this.dealColumn(col)
      })
    } else {
      this._columns = []
    }
  }

  public addToColumns(value: IJsonObject) {
    if (Object.keys(value).length !== 0 && checkArrayForObject(this._columns, value) === -1) {
      this._columns.push(value)
      this.dealColumn(value)
    }
  }

  public removeFromColumns(value: IJsonObject) {
    if (value.length !== 0) {
      const index = this._columns.indexOf(value)
      if (index !== -1) {
        this._columns.splice(index, 1)
      }
    }
  }

  public toString(addTerm: boolean = true): string | null {
    let retVal: string | null = null
    const where = addTerm ? this._term : null
    if (this._columns.length !== 0) {
      if (this._columns.length === 1) {
        retVal = `${this._descriptors[0]} ${this.act} '${this._values[0]}'`
      } else {
        const ar = []
        for (let i = 0; i !== this._descriptors.length; ++i) {
          ar.push(`${this._descriptors[i]} ${this.act} '${this._values[i]}' `)
        }
        const operator = this.operator ? this.operator : 'AND'
        retVal = `${joinWithCustomValue(ar, operator)}`
      }
      return where ? `${where} ${retVal}` : retVal
    } else {
      return null
    }
  }

  private dealColumn(val: IJsonObject) {
    const rowIds = getRowIds(val)
    for (let i = 0; i !== rowIds.length; ++i) {
      this._descriptors.push(rowIds[i])
      this._values.push(val[rowIds[i]])
    }
  }
}

// export const combineJsonClasses = (ar: JsonClass[], operator: string, addTerm?: string): string => {
//     const where = addTerm ? addTerm : null
//     let retVal: string | null = null
//     if (ar.length !== 0) {
//         const res: string[] = []
//         ar.forEach(jc => {
//             res.push(jc.toString(false) as string)
//         });
//         retVal = joinWithCustomValue(res, operator)

//     }
//     retVal = where ? `${where} ${retVal}` : retVal
//     return retVal!
// }
