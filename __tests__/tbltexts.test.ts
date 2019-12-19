import TblTexts, {Respond,stCodes} from '../lib'

const respond: Respond = {
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
  error: null,
  status: stCodes.success,
}
test('Creates a new object', () => {
    const t = new TblTexts()
    expect(t).not.toBe(null)
})

test('Reads a Respond', ()=>{
    const t = new TblTexts()
    t.fromRespond(respond)
    expect(t.categoryId).toBe(1)
    expect(t.id).toBe(30)
    expect(t.text).toBe('POEM TEXT')
    expect(t.textId).toBe(12)
})