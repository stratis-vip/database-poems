import { EMPTY_VALUES } from '../models/consts'
import { DataTypes } from '../models/general/data-types'
import Field from '../models/general/field'
import DbTbl from '../models/general/general-tbls'

let f: Field
let f1: Field
let t: DbTbl

beforeEach(() => {
  f = new Field('testField', DataTypes.Characters, false, false, 100)
  f1 = new Field('testFieldOne', DataTypes.Characters, false, false, 130)
  t = new DbTbl('Test')
});

describe('create new Object', () => {
  test('Creates initial object', () => {
    // object must not be null or undefined
    expect(t).not.toBe(undefined)
    expect(t).not.toBe(null)

    // public fields
    expect(t.fieldsArray).toStrictEqual(['id'])
    expect(t.dbValues).toStrictEqual([])
    expect(t.fieldsCount).toBe(1)
  })

  test('Add Field', () => {
    t.addField(f)
    expect(t.fieldsArray).toStrictEqual(['id', 'testField'])
    expect(t.fieldsCount).toBe(2)
  })

  test('Remove Field', () => {
    expect(t.removeField('id')).toBe(1)
    expect(t.fieldsArray).toStrictEqual([])
    expect(t.fieldsCount).toBe(0)
    expect(t.dbValues).toStrictEqual([])
    expect(t.removeField('id')).toBe(0)
  })

  test('Add Fields', () => {
    t.addFields([f, f1])
    expect(t.fieldsArray).toStrictEqual(['id', 'testField', 'testFieldOne'])
    expect(t.fieldsCount).toBe(3)
  })

  test('Find Fields', () => {
    t.addFields([f, f1])
    expect(t.findField('testField')).toStrictEqual(f)
    expect(t.findField('testFieldOne')).toStrictEqual(f1)
  })

  test('Add Data', () => {
    expect(t.addData({ id: 1 })).toBe(1)
    expect(t.queryInsert()).toBe(`INSERT INTO Test (id) VALUES (1)`)
  })

  test('Add Data Error', () => {
    expect(t.addData({ id: 1, description: 'esc' })).toBe(0)
    expect(() => { t.queryInsert() }).toThrowError(EMPTY_VALUES)
  })

  test('Add Data 1', () => {
    t.addFields([f, f1])
    expect(t.addData({ id: 1, testField: 'test 1', testFieldOne: 'testOne 1' })).toBe(1)
    expect(t.queryInsert()).toBe(`INSERT INTO Test (id, testField, testFieldOne) VALUES (1, 'test 1', 'testOne 1')`)
  })



})

