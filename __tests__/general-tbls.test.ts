import { DataTypes } from '../models/general/data-types'
import Field from '../models/general/field'
import DbTbl from '../models/general/general-tbls'
import { EMPTY_VALUES } from '../models/consts'


class GDbTbl extends DbTbl {
 public checkIfRowIsValid(row:any):boolean {
   return true
 }

  public fillTable(res: any): number {
    return 0
  }
}

const before = () => {
  return {
    f: new Field('testField', DataTypes.Characters, false, false, 100),
    f1: new Field('testFieldOne', DataTypes.Characters, false, false, 130),
    t: new GDbTbl('Test'),
  }
}

describe('create new Object', () => {
  test('Creates initial object', () => {
    const { t } = before()
    expect(t).not.toBe(undefined)
    expect(t.fieldsArray).toStrictEqual(['id'])
  })

  test('Add Field', () => {
    const { f, t } = before()
    t.addField(f)
    expect(t.fieldsArray).toStrictEqual(['id', 'testField'])
    expect(t.count).toBe(2)
  })

  test('Add Fields', () => {
    const { f, f1, t } = before()
    t.addFields([f, f1])
    expect(t.fieldsArray).toStrictEqual(['id', 'testField', 'testFieldOne'])
    expect(t.count).toBe(3)
  })

  test('Find Fields', () => {
    const { f, f1, t } = before()
    t.addFields([f, f1])
    expect(t.findField('testField')).toStrictEqual(f)
    expect(t.findField('testFieldOne')).toStrictEqual(f1)
  })

  test('Add Data', () => {
    const { f, f1, t } = before()
    expect(t.addData({id:1})).toBe(1)
    expect(t.queryInsert()).toBe(`INSERT INTO Test (id) VALUES (1)`)
  })

  test('Add Data Error', () => {
    const { f, f1, t } = before()
    expect(t.addData({id:1, description: 'esc'})).toBe(0)
    expect(()=>{t.queryInsert()}).toThrowError(EMPTY_VALUES)
  })

  test('Add Data 1', () => {
    const { f, f1, t } = before()
    t.addFields([f, f1])
    expect(t.addData({id:1, testField:'test 1', testFieldOne:'testOne 1'})).toBe(1)
    expect(t.queryInsert()).toBe(`INSERT INTO Test (id, testField, testFieldOne) VALUES (1, 'test 1', 'testOne 1')`)
  })



})

describe('Create object tblText from RespondTexts', () => {


  // test('Reads a RespondTexts', () => {
  //   const t: TblText = createfromRespond(TblText, respondText)
  //   expect(t.categoryId).toBe(1)
  //   expect(t.id).toBe(30)
  //   expect(t.text).toBe('POEM TEXT')
  //   expect(t.textId).toBe(12)
  // })

  // test('Raise an exception on bad RespondTexts', () => {
  //   expect(() => createfromRespond(TblText, badResponseText)).toThrowError(MALLFORMED_RESPONSE_ERROR)
  // })
})

// describe('Insert object tblCategory from RespondCategories', () => {
//   const respondCategory: RespondCategories = {
//     code: 200,
//     data: [
//       {
//         description: 'Ποιητικά',
//         id: 1,
//       },
//     ],
//     error: undefined,
//     status: stCodes.success,
//   }
//   test('Reads a RespondCategory', () => {
//     const t: TblCategory = createfromRespond(TblCategory, respondCategory)
//   })

//   test('Raise an exception on bad RespondCategories', () => {
//     expect(() => createfromRespond(TblCategory, badResponseText)).toThrowError(MALLFORMED_RESPONSE_ERROR)
//   })
// })

// test('Insert', () => {
//   expect(Insert(2, `sdnls"klse'sfdf`, `2012-12-22`)).toBe(
//     `INSERT INTO texts (categoryId, text, date, textId) VALUES (3, 'tria', '2013-04-05', 23), (4, 'tessera', '2013-04-05', 24)`,
//   )
// })

// test('Delete', () => {
//   expect(Delete(2)).toBe(`DELETE FROM texts WHERE id = 2`)
// })
