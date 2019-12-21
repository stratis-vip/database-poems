import { MALLFORMED_RESPONSE_ERROR, TABLES_LENGTH_DIFFERS } from '../consts'
import { IJsonObject } from '../types'
import Field from './field'
import GeneralRespond, { checkRespond } from './general-respond'

export default abstract class DbTbl {
  protected name: string = ''
  protected fields: Field[] = []
  protected values: IJsonObject[] = []
  public abstract fillTable(res: GeneralRespond): void

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
  get count(): number {
    return this.fields.length
  }

  public findField(fieldName: string): Field | null {
    const retVal = this.fields.find(s => s.getName === fieldName)
    return retVal === undefined ? null : retVal
  }
}

export const fillTableFromRespond = <T extends DbTbl>(c: new () => T, respond: GeneralRespond): T => {
  const t = new c()
  t.fillTable(respond)
  return t
}

export const createfromRespond = <T extends DbTbl>(c: new () => T, respond: GeneralRespond): T => {
  if (!checkRespond(respond)) {
    throw new Error(MALLFORMED_RESPONSE_ERROR)
  }
  return fillTableFromRespond(c, respond)
}

export const Insert = (cat: number, text: string, date: string): string => {
  return createInsert(
    'texts',
    ['categoryId', 'text', 'date', 'textId'],
    [
      { categoryId: 3, text: 'tria', date: '2013-04-05', textId: 23 },
      { categoryId: 4, text: 'tessera', date: '2013-04-05', textId: 24 },
    ],
  )

  //   return `INSERT INTO texts (categoryId, text, date,textId)
  // SELECT ${cat} as categoryId,
  // '${text}' as text,
  // '${date}' as date,
  // IFNULL(max(textId)+1, 1) from  texts where categoryId = ${cat}`
}

export const Delete = (id: number): string => {
  return createDelete('texts', ['id'], [id])
}

const createDelete = (from: string, wheres: string[], values: any[]): string => {
  if (wheres.length !== values.length) {
    throw Error(TABLES_LENGTH_DIFFERS)
  }
  let retVal = `DELETE FROM ${from} WHERE `
  wheres.map((value, index) => (retVal += `${value} = ${values[index]}`))
  return retVal
}

/**
 * Create an INSERT query for the table
 *
 * @param to Table name
 * @param columns
 * @param values in form {tableName: value}
 */
export const createInsert = (to: string, columns: string[], values: IJsonObject[]): string => {
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
