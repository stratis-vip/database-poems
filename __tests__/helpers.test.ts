import {deleteProperty, equalArrays, joinWithAND, joinWithComma} from '../models/helpers'

const a = [1,2,3]
const b = [3,1,2]
const arrayOfSinglePropertyObjects = [{id:1}, {id:2}]
const arrayOfComplexPropertyObjects = [{id:1, description: 2}, {id:2, description: 3}]

describe('Check deleteProperty', ()=>{
    test('it deletes id',()=>{
        expect(deleteProperty('id',arrayOfSinglePropertyObjects)).toStrictEqual([{},{}])
        expect(deleteProperty('id',arrayOfComplexPropertyObjects)).toStrictEqual([{description: 2}, {description: 3}])
    })

    test('Try to delete property nonexisted',()=>{
        expect(deleteProperty('ids',arrayOfSinglePropertyObjects)).toStrictEqual(arrayOfSinglePropertyObjects)
        expect(deleteProperty('ids',arrayOfComplexPropertyObjects)).toStrictEqual(arrayOfComplexPropertyObjects)
    })

})

describe('Test equalArrays', ()=>{
    test('a is null',()=>{
        expect(equalArrays(null, a)).toBe(false)
    })
    
    test('b is null',()=>{
        expect(equalArrays(a, null)).toBe(false)
    })
    
    test('a and b is null',()=>{
        expect(equalArrays(null, null)).toBe(false)
    })
    
    test('no arrays given',()=>{
        expect(equalArrays()).toBe(false)
    })
    
    test('a and b are equals (same array)',()=>{
        expect(equalArrays(a,a)).toBe(true)
    })
    
    test('a and b are equals (unsorted)',()=>{
        expect(equalArrays(a,b)).toBe(true)
    })
    
    test('a and b are unequals (unsorted)',()=>{
        expect(equalArrays(a,[...b,...a])).toBe(false)
    })
    
    test('a and b are arrays on array', ()=>{
        expect(equalArrays([1,[1,2],[3],[1]],[[3],1,[1,2],1])).toBe(false)  
    })
    
    test('a and b are arrays on array', ()=>{
        expect(equalArrays([1,[1,2],[3],[1]],[[3],[1],[1,2],1])).toBe(true)  
    })
})

describe('Test joinWithComma', ()=>{
    test('emtpy array', ()=>{
        expect(joinWithComma([])).toBe('')
    })

    test('string array', ()=>{
        expect(joinWithComma(['id'])).toBe('id')
        expect(joinWithComma(['id', 'test'])).toBe('id, test')
        expect(joinWithComma(['id', 'test', 'call'])).toBe('id, test, call')
        expect(joinWithComma([5])).toBe('5')
        expect(joinWithComma([5, 6, 7, 8])).toBe('5, 6, 7, 8')
    })
})
describe('Test joinWithAND', ()=>{

    test('string array', ()=>{
        expect(joinWithAND(['id'])).toBe('id')
        expect(joinWithAND(['id', 'test'])).toBe('id AND test')
        expect(joinWithAND(['id', 'test', 'call'])).toBe('id AND test AND call')
        expect(joinWithAND([5])).toBe('5')
        expect(joinWithAND([5, 6, 7, 8])).toBe('5 AND 6 AND 7 AND 8')
    })
})