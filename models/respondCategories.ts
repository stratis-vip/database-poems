import GeneralRespond from '../models/general/general-respond'
import { ICategory } from '../models/types'

class RespondCategories extends GeneralRespond {
  public data: ICategory[]

  constructor() {
    super()
    this.data = []
  }
}

export default RespondCategories
