import {equalArrays} from '../models/helpers'

const a = [1,2,3]
const b = [3,1,2]
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