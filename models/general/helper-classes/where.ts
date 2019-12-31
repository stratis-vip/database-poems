import { IJsonObject } from '../../types'
import { JsonClass } from './json-class'

export class Where extends JsonClass {
    protected static term = 'WHERE'
    constructor(columns?: IJsonObject[]){
        super(Where.term,columns)
    }
}