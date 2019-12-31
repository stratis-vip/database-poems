import {From} from '../models/general/helper-classes/from'

describe('Check class From',()=>{
    test('create a From with tblName', ()=>{
        const l = new From('Generic')
        expect(l).not.toBe(null)
        expect(l.toString).toBe('FROM Generic')
    })

    test('create a From with tblName and empty Columns', ()=>{
        const l = new From('Generic',[])
        expect(l).not.toBe(null)
        expect(l.toString).toBe('FROM Generic')
    })

    test('create a From with tblName and Columns', ()=>{
        const l = new From('Generic',['Table1', 'Table2'])
        expect(l).not.toBe(null)
        expect(l.toString).toBe('FROM Generic, Table1, Table2')
    })
})