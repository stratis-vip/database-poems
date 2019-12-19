export enum stCodes {
  success = 'success',
  error = 'error',
  fail = 'fail',
}

class Respond {
  public code: number
  public data: Array<{}>
  public error: string | null
  public status: stCodes
  constructor() {
    this.status = stCodes.success
    this.code = 200
    this.data = []
    this.error = null
  }
}

export default Respond
