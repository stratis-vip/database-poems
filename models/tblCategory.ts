import { EMPTY_VALUES, FIELD_NOT_EXIST, VALUE_OUT_OF_LIMITS } from './consts'
import { DataTypes } from './general/data-types'
import Field from './general/field'
import DbTbl, { createInsert } from './general/general-tbls'
import RespondCategories from './respondCategories'
import { IJsonObject } from './types'

class TblCategory extends DbTbl {
  constructor() {
    super()
    this.name = 'Categories'
    this.addField(new Field('id', DataTypes.Numeral))
    this.addField(new Field('description', DataTypes.Characters, false, 100))
  }

  public fillTable(res: RespondCategories) {
    const cat = res.data[0]
    const f = this.fieldsArray
    this.values.push(cat)
  }

  public insert(values: IJsonObject[]): string {
    if (values.length === 0) {
      throw Error(EMPTY_VALUES)
    }
    values.forEach(value => {
      Object.keys(value).map(fieldName => {
        const field = this.findField(fieldName)
        if (!field) {
          throw Error(FIELD_NOT_EXIST)
        } else {
          if (!field.checkIfValueIsAcceptable(value[fieldName])) {
            throw Error(VALUE_OUT_OF_LIMITS)
          }
        }
      })
    })
    return createInsert(this.name, this.fieldsArray, values)
  }

  get fieldsArray(): string[] {
    const a: string[] = []
    this.fields.map(f => a.push(f.getName))
    return a
  }
}

export default TblCategory
