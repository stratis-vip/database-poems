import { Nullable } from '../..'
import { DataTypes } from './data-types'

export default class Field {
  private name: string
  private type: DataTypes
  private size: Nullable<number>
  private allowNull: boolean

  constructor(name: string, type: DataTypes, allowNull: boolean = false, size: Nullable<number> = null) {
    this.name = name
    this.type = type
    this.size = size
    this.allowNull = allowNull
    if (this.type === DataTypes.Characters && size === null) {
      this.size = 65535
    }
  }
  /** Returns field's name */
  get getName(): string {
    return this.name
  }

  /** check if value is in the acceptable limits
   *
   * @param value
   */
  public checkIfValueIsAcceptable(value: any | null): boolean {
    if (!this.allowNull && value === null) {
      return false
    }
    if (value === null && this.allowNull) {
      return true
    }
    switch (this.type) {
      case DataTypes.Boolean:
        return typeof value === 'boolean' ? true : false
      case DataTypes.Numeral:
        return typeof value === 'number' && !isNaN(value as number) ? true : false
      case DataTypes.Characters:
        return (value! as string).length <= this.size! ? true : false
      case DataTypes.Date:
        return true // TODO έλεγχος ημερομηνίας
      case DataTypes.Time:
        return true // TODO έλεγχος ώρας
      case DataTypes.TimeStamp:
        return true // TODO έλεγχος τιμεσταμπ
    }
  }
}
