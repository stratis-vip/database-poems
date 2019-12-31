import { joinWithComma } from '../../helpers'
import { ColumnClass } from './column-class'

export class From extends ColumnClass {
  constructor(tblName: string, columns?: string[]) {
    if (!columns) {
      columns = []
    }
    super([tblName, ...columns])
  }

  get toString(): string | null {
    let retVal = 'FROM '
    if (this._columns.length !== 0) {
      retVal += joinWithComma(this._columns)
    } else {
      retVal += '*'
    }
    return retVal
  }
}
