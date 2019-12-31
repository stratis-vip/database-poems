import { EMPTY_TABLE, EMPTY_VALUES, FIELD_NOT_EXIST } from '../consts'
import {equalArrays, getRowIds} from '../helpers'
import { deleteProperty, joinWithAND, joinWithComma } from '../helpers'
import { IGeneralRespond, IJsonObject } from '../types'
import { DataTypes } from './data-types'
import Field from './field'

export default class DbTbl {
  protected name: string = ''
  protected fields: Field[] = []
  protected values: IJsonObject[] = []
  protected indices: string[] = []

  constructor(name: string) {
    this.name = name
    this.addField(new Field('id', DataTypes.Numeral, true))
    this.indices.push('id')
  }

  public fillTable(res: IGeneralRespond<any>): number {
    const { data } = res
    let count = 0;

    if (data.length !== 0) {
      for (let i = 0; i !== data.length; i++) {
        count += this.addData(data[i])
      }
    }
    return count
  }

  public checkIfRowIsValid(row: any): boolean {
    let retVal = true
    this.indices.forEach(index => {
      const vals = this.values.map(v => v[index])
      const indexOf = vals.some(val => val === row[index])
      if (indexOf) {
        retVal = false
      }
    })
    return retVal
  }

  /** add a data in table in form { fieldId: fieldValue } */
  public addData(row: IJsonObject): number {
    if (this.checkIfRowIsValid(row) && this.checkIfDataIsValid(row)) {
      const beforeLen = this.values.length
      // TODO check index
      return this.values.push(row) - beforeLen
    }
    return 0
  }

  public removeField(fieldName: string) {
    const retVal = this.findFieldIndex(fieldName)
    let removedFieldsCount = 0
    if (this.findFieldIndex(fieldName) >= 0) {
      removedFieldsCount = this.fields.splice(retVal, 1).length
      deleteProperty(fieldName, this.values)
      this.indices.splice(this.indices.findIndex(v => fieldName === v), 1)

    }
    return removedFieldsCount
  }

  /** Add the field to Table
   * @param field
   */
  public addField(field: Field) {
    if (!this.fields.find(f => f.getName === field.getName)) {
      this.fields.push(field)
    }
  }

  /** import fileds from fields-array to database. Duplicates are not imported
   * @param fields an array of fields
   */
  public addFields(fields: Field[]) {
    fields.map(field => this.addField(field))
  }

  /** Returns the number of fields in table */
  get fieldsCount(): number {
    return this.fields.length
  }

  /** returns an array of strings with field names */
  get fieldsArray(): string[] {
    const a: string[] = []
    this.fields.map(f => a.push(f.getName))
    return a
  }

  /** returns the field with name fieldName or null if doesn't exists one */
  public findField(fieldName: string): Field | null {
    const retVal = this.fields.find(s => s.getName === fieldName)
    return retVal === undefined ? null : retVal
  }

  /** returns the field with name fieldName or null if doesn't exists one */
  public findFieldIndex(fieldName: string): number {
    return this.fields.findIndex(s => s.getName === fieldName)
  }

  /** returns a string with INSERT mysql compliant query.
   * If there are no fileds or values in the table, throws an error! 
   */
  public queryInsert(): string {
    if (this.fields.length === 0) {
      throw Error(EMPTY_TABLE)
    }
    if (this.values.length === 0) { throw Error(EMPTY_VALUES) }
    return createInsert(this.name, this.fieldsArray, this.values)
  }

  /** returns a string with INSERT mysql compliant query.
   * If there are no fileds or values in the table, throws an error! 
   */
  public queryDelete(column: string, value: any): string {
    if (this.findFieldIndex(column) === -1) {
      throw Error(FIELD_NOT_EXIST)
    }
    return `DELETE FROM ${this.name} WHERE ${column} in ('${value}')`
  }

  public queryUpdate(row: IJsonObject, id: any, idValue: any): string {
    const rowIds = getRowIds(row)
    if (this.findFieldIndex(id) === -1) {
      throw Error(FIELD_NOT_EXIST)
    }
    const ar = []
    for (let i = 0; i !== rowIds.length; i++) {
      if (this.findFieldIndex(rowIds[i]) === -1) {
        throw Error(FIELD_NOT_EXIST)
      }
      ar.push(`${rowIds[i]} = '${row[rowIds[i]]}'`)
    }
    return `UPDATE ${this.name} SET ${joinWithComma(ar)} WHERE ${id} in ('${idValue}')`
  }

  public querySelect(columns?: string[], from?: string[], where?: Array<{ column: string, value: any }> | []): string {
    let retVal = 'SELECT '
    if (!columns || columns.length === 0) {
      retVal += `* `
    } else {
      retVal += `${joinWithComma(columns)} `
    }
    retVal += 'FROM '
    if (!from || (from && from.length === 0)) {
      retVal += this.name
    } else {
      retVal += joinWithComma(from!)
    }

    if (!where || (where && where.length === 0) ){
      retVal += ``
    } else {
      const ar = []
      for (let i=0; i!== where.length; ++i){
        ar.push(`${where[i].column} in ('${where[i].value}')`)
      }
      retVal += ` WHERE ${joinWithAND(ar)}`
    }
    return retVal
  }


  /** check if rowObject has the same keys with table fields */
  private checkIfDataIsValid(row: IJsonObject): boolean {
    const rowIds = getRowIds(row)
    if (rowIds.length !== this.fields.length) { return false } else {
      return equalArrays(rowIds, this.fieldsArray)
    }
  }

  get dbValues(): IJsonObject[] {
    return this.values
  }
}

export const fillTableFromRespond = <T extends DbTbl>(c: new () => T, respond: any): T => {
  const t = new c()
  t.fillTable(respond)
  return t
}


/** Create an INSERT query for the table
 *
 * @param to Table name
 * @param columns
 * @param values in form {tableName: value}
 */
const createInsert = (to: string, columns: string[], values: IJsonObject[]): string => {
  let retVal = `INSERT INTO ${to} (`
  columns.map((value, index) => {
    retVal += index + 1 !== columns.length ? `${value}, ` : `${value}) VALUES `
  })
  values.map((value, vIndex) => {
    retVal += '('
    columns.map((d, dIndex) => {
      retVal += typeof value[d] === 'number' ? `${value[d]}` : `'${value[d]}'`
      if (dIndex + 1 !== columns.length) {
        retVal += ', '
      }
    })

    if (vIndex + 1 !== values.length) {
      retVal += '), '
    } else {
      retVal += ')'
    }
  })
  return retVal
}



