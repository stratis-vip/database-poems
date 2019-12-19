import {TblText} from '..'

describe('create new Object', () => {
  test('Creates a new object from null', () => {
    const t = new TblText()
    expect(t).not.toBe(null)
  })

  test('Creates a new object from values', () => {
    const t = new TblText('H καρδιά μου χτυπά', 33, 2, '2013-12-03')
    expect(t).not.toBe(null)
    expect(t.categoryId).toBe(2)
    expect(t.id).toBe(null)
    expect(t.text).toBe('H καρδιά μου χτυπά')
    expect(t.textId).toBe(33)
    expect(t.date).toBe('2013-12-03')
  })
})
