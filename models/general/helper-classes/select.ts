import { joinWithComma } from '../../helpers'
import { ColumnClass } from './column-class'

export class Select extends ColumnClass {
  get toString(): string | null {
    let retVal = 'SELECT '
    if (this._columns.length !== 0) {
      retVal += joinWithComma(this._columns)
    } else {
      retVal += '*'
    }
    return retVal
  }
}
