import { EMPTY_VALUES, FIELD_NOT_EXIST, VALUE_OUT_OF_LIMITS } from './consts'
import { DataTypes } from './general/data-types'
import Field from './general/field'
import DbTbl, { createInsert } from './general/general-tbls'
import { equalArrays } from './helpers'
import RespondCategories from './respondCategories'
import { IJsonObject } from './types'

class TblCategory extends DbTbl {
  constructor() {
    super('Categories')
    this.addField(new Field('description', DataTypes.Characters, false, false, 100))
  }

  public fillTable(res: RespondCategories) {
    const lenBefore = this.values.length
    const cat = res.data
    
    for (let i=0; i!==cat.length ; i++){
      this.addData(cat[i] as IJsonObject)
    }

    return this.values.length - lenBefore

  }

  public addData(row:IJsonObject){
    if (!this.checkIfDataIsValid(row)){return 0}
    const lenBefore = this.values.length
    return this.values.push(row) - lenBefore
  }

  // public insert(values: IJsonObject[]): string {
  //   if (values.length === 0) {
  //     throw Error(EMPTY_VALUES)
  //   }
  //   values.forEach(value => {
  //     Object.keys(value).map(fieldName => {
  //       const field = this.findField(fieldName)
  //       if (!field) {
  //         throw Error(FIELD_NOT_EXIST)
  //       } else {
  //         if (!field.checkIfValueIsAcceptable(value[fieldName])) {
  //           throw Error(VALUE_OUT_OF_LIMITS)
  //         }
  //       }
  //     })
  //   })
  //   return createInsert(this.name, this.fieldsArray, values)
  // }

  get fieldsArray(): string[] {
    const a: string[] = []
    this.fields.map(f => a.push(f.getName))
    return a
  }

  get dbValues(): IJsonObject[] {
   
    return this.values
  }

  private checkIfDataIsValid (row:IJsonObject):boolean{
    const rowIds = Object.keys(row)
    return equalArrays(rowIds, this.fieldsArray)
  }
}

export default TblCategory
