// tslint:disable-next-line: max-classes-per-file
export class Limit {
  // tslint:disable-next-line: variable-name
  private _from: number = 0
  // tslint:disable-next-line: variable-name
  private _limit: number = 0

  constructor(limit?: number, from?: number) {
    this._limit = limit ? limit : 0
    this._from = from ? from : 0
  }

  set from(value: number) {
    if (value !== this._from) {
      this._from = value
    }
  }

  set limit(value: number) {
    if (value !== this._limit) {
      this._limit = value
    }
  }

  get toString(): string | null {
    let retVal = null
    if (this._limit !== 0) {
      retVal = this._from === 0 ? `LIMIT 0, ${this._limit}` : `LIMIT ${this._from}, ${this._limit}`
    }
    return retVal
  }
}
