import { TblCategory } from '..'
import { EMPTY_VALUES, FIELD_NOT_EXIST, VALUE_OUT_OF_LIMITS } from '../models/consts'
import { DataTypes } from '../models/general/data-types'
import Field from '../models/general/field'
import RespondCategories from '../models/respondCategories'
import { ICategory, IJsonObject, stCodes } from '../models/types'

const fields = [new Field('id', DataTypes.Numeral), new Field('description', DataTypes.Characters, false, false, 100)]

describe('create new Object', () => {
  test('Creates a new object from null', () => {
    const t = new TblCategory()
    expect(t).not.toBe(null)
  })

  test('Add a Field', () => {
    const t = new TblCategory()
    expect(t).not.toBe(null)
    expect(t.fieldsArray).toStrictEqual(['id', 'description'])
    t.addField(new Field('info', DataTypes.Characters, false, true, 50))
    expect(t.count).toBe(3)
    t.addFields(fields)
    expect(t.count).toBe(3)
    expect(t.fieldsArray).toStrictEqual(['id', 'description', 'info'])
  })

  test('Creates a new object from values', () => {
    const t = new TblCategory()
    expect(t).not.toBe(null)
  })
})

describe('create Queries', () => {
  const t = new TblCategory()
  const values: IJsonObject[] = [
    { id: 3, description: 'tria' },
    { id: 4, description: 'tessera' },
  ]
  const errorValues: IJsonObject[] = [
    { id: 3, description: 'tria' },
    { id: true, description: 'tessera' },
  ]

  const extraField: IJsonObject[] = [
    { id: 3, description: 'tria', test: true },
    { id: true, description: 'tessera' },
  ]
  const minusField: IJsonObject[] = [
    { id: 3, description: 'tria', test: true },
    { id: true, description: 'tessera' },
  ]
  const errorField: IJsonObject[] = [{ ids: '345' }]
  const noFields: IJsonObject[] = []

  expect(()=>{t.queryInsert()}).toThrowError(EMPTY_VALUES)
  // toBe(`INSERT INTO Categories (id, description) VALUES (3, 'tria'), (4, 'tessera')`)
  expect(t.addData(values[0])).toBe(1)
  expect(t.queryInsert()).toBe(`INSERT INTO Categories (id, description) VALUES (3, 'tria')`)
  expect(t.addData(values[1])).toBe(1)
  expect(t.queryInsert()).toBe(`INSERT INTO Categories (id, description) VALUES (3, 'tria'), (4, 'tessera')`)
  // expect(() => t.insert(errorField)).toThrowError(FIELD_NOT_EXIST)
  // expect(() => t.insert(errorValues)).toThrowError(VALUE_OUT_OF_LIMITS)
  // expect(() => t.insert(extraField)).toThrowError(FIELD_NOT_EXIST)
  // expect(() => t.insert(minusField)).toThrowError(FIELD_NOT_EXIST)
  // expect(() => t.insert(noFields)).toThrowError(EMPTY_VALUES)
})

describe('Fill Data', () => {
  // tslint:disable-next-line: one-variable-per-declaration
  const res: RespondCategories = {
    code: 200,
    data: [
      { description: 'Ποιητικά', id: 1 },
      { description: 'Λογοπλοκίες', id: 2 },
      { description: 'Ιστορίες', id: 3 },
    ],
    status: stCodes.success,
  }
  const t = new TblCategory()
  test('fillTable', () => {
    expect(t.fillTable(res)).toBe(3)
    expect(t.dbValues.length).toBe(3)
  })

  test('addData correct', () => {
    expect(t.addData({ description: 'Μαλακίες', id: 4 })).toBe(1)
    expect(t.dbValues.length).toBe(4)
  })

  test('addData erroneous', () => {
    expect(t.dbValues.length).toBe(4)
    expect(t.addData({ description: 'Μαλακίες', id: 4, error: false })).toBe(0)
    expect(t.dbValues.length).toBe(4)
  })

})