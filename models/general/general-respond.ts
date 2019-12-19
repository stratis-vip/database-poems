import { stCodes } from '../types'

export default class GeneralRespond {
  public code: number
  public data: Array<{}>
  public error?: string
  public status: stCodes

  constructor() {
    this.status = stCodes.success
    this.code = 200
    this.data = []
    this.error = undefined
  }
}

export const checkRespond = (respond: GeneralRespond | undefined): boolean => {
  if (!respond || respond.status !== stCodes.success) {
    return false
  }

  if (!respond.data) {
    return false
  } else {
    return true
  }
}
