import { JsonClass } from '../models/general/helper-classes/json-class'
import { IJsonObject, Nullable } from '../models/types'

class JC extends JsonClass {
  protected static term = 'WHERE'
  constructor(columns?: IJsonObject[]) {
    super(JC.term, columns)
  }
}

describe('Check class JsonClass', () => {
  test('create a JsonClass with no values', () => {
    const l = new JC()
    expect(l).not.toBe(null)
    expect(l.toString()).toBe(null)
  })

  test('create a JsonClass with a value', () => {
    const l = new JC([{ id: 3 }])
    expect(l).not.toBe(null)
    expect(l.toString()).toBe(`WHERE id = '3'`)
  })

  test('create a JsonClass with more values', () => {
    const l = new JC([{ id: 3 }, { keimena: 'skata' }])
    expect(l).not.toBe(null)
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' `)
    l.operator = 'OR'
    expect(l.toString()).toBe(`WHERE id = '3' OR keimena = 'skata' `)
    l.act = '>'
    expect(l.toString()).toBe(`WHERE id > '3' OR keimena > 'skata' `)
  })

  test('Check addToColumns and removeFromColumns', () => {
    const l = new JC([{ id: 3 }, { keimena: 'skata' }])
    l.addToColumns({ door: 'closed' })
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
    l.addToColumns({ door: 'closed' }) // will not add anything
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
    l.removeFromColumns({ door: 'closed' })
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
    l.removeFromColumns({ door: 'open' }) // will not remove anything
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
  })

  test('Check addToColumns and removeFromColumns', () => {
    const l = new JC([{ id: 3 }, { keimena: 'skata' }])
    l.addToColumns({ door: 'closed' })
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
    l.addToColumns({ door: 'closed' }) // will not add anything
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
    l.removeFromColumns({ door: 'closed' })
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
    l.removeFromColumns({ door: 'open' }) // will not remove anything
    expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
  })

  test('Combine wheres', () => {
    const l = new JC([{ id: 3 }, { keimena: 'skata' }])
    const m = new JC([{ door: 'closed' }])
    expect(JC.combine([l, m], 'OR', false)).toBe(`id = '3' AND keimena = 'skata' OR door = 'closed'`)
    expect(JC.combine([l, m], 'OR')).toBe(`WHERE id = '3' AND keimena = 'skata' OR door = 'closed'`)
    expect(JC.combine([l, m], 'OR', true)).toBe(`WHERE id = '3' AND keimena = 'skata' OR door = 'closed'`)
  })
})
