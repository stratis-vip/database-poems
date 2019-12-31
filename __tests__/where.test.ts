import {Where} from '../models/general/helper-classes/where'

describe('Check class Where',()=>{
    test('create a Where with no values', ()=>{
        const l = new Where()
        expect(l).not.toBe(null)
        expect(l.toString()).toBe(null)
    })
})