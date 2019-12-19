import { Nullable } from '..'
import DbTbl from './general/general-tbls'
import RespondCategories from './respondCategories'

class TblCategory extends DbTbl {
  public id: Nullable<number> = null
  public description: string

  constructor(id?: number, description?: string) {
    super()
    this.id = id || null
    this.description = description || ''
  }

  public fill(res: RespondCategories) {
    const cat = res.data[0]
    this.id = cat.id
    this.description = cat.description
  }
}

export default TblCategory
