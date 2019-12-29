import isEqual from 'lodash.isequal'
import { IJsonObject } from './types'

/** using lodash isEqual to find if 2 arrays are equal */
export const equalArrays = (a: any[] | null = null, b: any[] | null = null): boolean => {
    if (a === null || b === null) {
        return false
    }

    if (a.length !== b.length) { return false }
    if (a === b) { return true }
    const aCloned = Object.assign([], a).sort(sort)
    const bCloned = Object.assign([], b).sort(sort)
    // for (let i = 0; i !== aCloned.length; i++) {
    //     if (Array.isArray(aCloned[i] && (Array.isArray(bCloned)))){
    //         return (equalArrays(aCloned[i],bCloned[i]))
    //     }else
    //     if (aCloned[i] !== bCloned[i]) { return false }
    // }
    return isEqual(aCloned,bCloned)
}

const sort = (a: any, b: any) => {
    // console.log('a= ',a,' b= ',b)
    if (typeof a === typeof b) {
        if (a === b) { return 0 } else {
            return a < b ? -1 : 1
        }
    }else {
        if (Array.isArray(a)){
            return -1
        }
        if (Array.isArray(b)){return 1}
        return 0
    }
}
/** delete a property from all objects in array o objects */
export const deleteProperty= (id:string, obj:IJsonObject[]) =>{
    const retVal:object[] = []
    if (obj.length !== 0){
        for (let i = 0; i !== obj.length; i++)
        {
            const ob = Object.assign({},obj[i])
            if (id in ob){
                delete ob[id]
            }
            retVal.push(ob)
        }
    }
    return retVal

}