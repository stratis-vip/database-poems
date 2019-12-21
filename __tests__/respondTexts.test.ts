import RespondTexts from '../models/respondTexts'

describe('Insert object RespondTexts', () => {
  test('Created not null', () => {
    const t = new RespondTexts()
    expect(t).not.toBe(null)
    expect(t.data).toStrictEqual([])
  })
})
