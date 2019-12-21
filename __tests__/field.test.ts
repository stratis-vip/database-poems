import { DataTypes } from '../models/general/data-types'
import Field from '../models/general/field'

describe('Field checks', () => {
  test('Creates a numeral no null field', () => {
    const t = new Field('id', DataTypes.Numeral)
    expect(t).not.toBeNull()
    expect(t.checkIfValueIsAcceptable('a')).toBeFalsy()
    expect(t.checkIfValueIsAcceptable(null)).toBeFalsy()
    expect(t.checkIfValueIsAcceptable(true as boolean)).toBe(false)
  })

  test('Creates an allow null 100 character long string field', () => {
    const t = new Field('id', DataTypes.Characters, true, 100)
    expect(t).not.toBeNull()
    expect(t.checkIfValueIsAcceptable('a')).toBeTruthy()
    expect(t.checkIfValueIsAcceptable(null)).toBeTruthy()
    expect(t.checkIfValueIsAcceptable(new Array(101).join('b'))).toBeTruthy()
    expect(t.checkIfValueIsAcceptable(new Array(102).join('b'))).toBeFalsy()
    expect(t.checkIfValueIsAcceptable(true as boolean)).toBe(false)
  })
})
