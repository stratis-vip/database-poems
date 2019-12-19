import { TblCategory } from '..'

describe('create new Object', () => {
  test('Creates a new object from null', () => {
    const t = new TblCategory()
    expect(t).not.toBe(null)
  })

  test('Creates a new object from values', () => {
    const t = new TblCategory(2, 'Παλιοκατηγορία')
    expect(t).not.toBe(null)
    expect(t.id).toBe(2)
    expect(t.description).toBe('Παλιοκατηγορία')
  })
})
