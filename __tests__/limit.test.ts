import {Limit} from '../models/general/helper-classes/limit'

describe('Check class Limit',()=>{
    test('create a Limit with no values', ()=>{
        const l = new Limit()
        expect(l).not.toBe(null)
        expect(l.toString).toBe(null)
    })

    test('create a Limit with 0 limit', ()=>{
        const l = new Limit(0)
        expect(l).not.toBe(null)
        expect(l.toString).toBe(null)
    })
    
    test('create a Limit with 0 limit and from > 0', ()=>{
        const l = new Limit(0, 5)
        expect(l).not.toBe(null)
        expect(l.toString).toBe(null)
    })

    test('create a Limit with values', ()=>{
        const l = new Limit(10,4)
        expect(l).not.toBe(null)
        expect(l.toString).toBe('LIMIT 4, 10')
    })

    test('create a Limit with no values and set them manually', ()=>{
        const l = new Limit()
        expect(l).not.toBe(null)
        expect(l.toString).toBe(null)
        l.from = 4
        l.limit = 13
        expect(l.toString).toBe('LIMIT 4, 13')
    })
})