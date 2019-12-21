import { createfromRespond, MALLFORMED_RESPONSE_ERROR, RespondTexts, stCodes, TblText } from '..'
import GeneralRespond from '../models/general/general-respond'
import { Delete, Insert } from '../models/general/general-tbls'
import RespondCategories from '../models/respondCategories'
import TblCategory from '../models/tblCategory'

const badResponseText = {} as GeneralRespond

describe('Create object tblText from RespondTexts', () => {
  const respondText: RespondTexts = {
    code: 200,
    data: [
      {
        categoryId: 1,
        date: '2000-06-30T21:00:00.000Z',
        id: 30,
        text: 'POEM TEXT',
        textId: 12,
      },
    ],
    error: undefined,
    status: stCodes.success,
  }

  test('Reads a RespondTexts', () => {
    const t: TblText = createfromRespond(TblText, respondText)
    expect(t.categoryId).toBe(1)
    expect(t.id).toBe(30)
    expect(t.text).toBe('POEM TEXT')
    expect(t.textId).toBe(12)
  })

  test('Raise an exception on bad RespondTexts', () => {
    expect(() => createfromRespond(TblText, badResponseText)).toThrowError(MALLFORMED_RESPONSE_ERROR)
  })
})

describe('Insert object tblCategory from RespondCategories', () => {
  const respondCategory: RespondCategories = {
    code: 200,
    data: [
      {
        description: 'Ποιητικά',
        id: 1,
      },
    ],
    error: undefined,
    status: stCodes.success,
  }
  test('Reads a RespondCategory', () => {
    const t: TblCategory = createfromRespond(TblCategory, respondCategory)

    console.log(t)
  })

  test('Raise an exception on bad RespondCategories', () => {
    expect(() => createfromRespond(TblCategory, badResponseText)).toThrowError(MALLFORMED_RESPONSE_ERROR)
  })
})

test('Insert', () => {
  expect(Insert(2, `sdnls"klse'sfdf`, `2012-12-22`)).toBe(
    `INSERT INTO texts (categoryId, text, date, textId) VALUES (3, 'tria', '2013-04-05', 23), (4, 'tessera', '2013-04-05', 24)`,
  )
})

test('Delete', () => {
  expect(Delete(2)).toBe(`DELETE FROM texts WHERE id = 2`)
})
