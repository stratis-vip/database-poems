import GeneralRespond from './general/general-respond'
import { IText } from './types'

class RespondTexts extends GeneralRespond {
  public data: IText[]

  constructor() {
    super()
    this.data = []
  }
}

export default RespondTexts
