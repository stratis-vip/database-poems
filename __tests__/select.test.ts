import { Select } from '../models/general/helper-classes/select'

describe('Check class Select', () => {
  test('create a Select with no values', () => {
    const l = new Select()
    expect(l).not.toBe(null)
    expect(l.toString).toBe('SELECT *')
  })

  test('create a Select with empty columns', () => {
    const l = new Select([])
    expect(l).not.toBe(null)
    expect(l.toString).toBe('SELECT *')
  })

  test('create a Select with columns', () => {
    const l = new Select(['*', 'id'])
    expect(l).not.toBe(null)
    expect(l.toString).toBe('SELECT *, id')
  })

  test('Add columns manually', () => {
    const l = new Select()
    expect(l).not.toBe(null)
    expect(l.toString).toBe('SELECT *')
    l.addToColumns('*')
    expect(l.toString).toBe('SELECT *')
    l.addToColumns('id')
    expect(l.toString).toBe('SELECT *, id')
  })

  test('remove columns manually', () => {
    const l = new Select(['*', 'id', 'count(id)'])
    expect(l).not.toBe(null)
    expect(l.toString).toBe('SELECT *, id, count(id)')
    l.removeFromColumns('id')
    expect(l.toString).toBe('SELECT *, count(id)')
    l.removeFromColumns('*')
    expect(l.toString).toBe('SELECT count(id)')
  })
})
