import { createfromRespond, MALLFORMED_RESPONSE_ERROR, RespondTexts, stCodes, TblText } from '..'
import GeneralRespond from '../models/general/general-respond'
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

describe('Create object tblCategory from RespondCategories', () => {
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
    expect(t.id).toBe(1)
    expect(t.description).toBe('Ποιητικά')
  })

  test('Raise an exception on bad RespondCategories', () => {
    expect(() => createfromRespond(TblCategory, badResponseText)).toThrowError(MALLFORMED_RESPONSE_ERROR)
  })
})
