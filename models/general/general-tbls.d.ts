import { IJsonObject } from '../types';
import Field from './field';
import GeneralRespond from './general-respond';
export default abstract class DbTbl {
    protected name: string;
    protected fields: Field[];
    protected values: IJsonObject[];
    abstract fillTable(res: GeneralRespond): void;
    /** Add the field to Table
     * @param field
     */
    addField(field: Field): void;
    /** import fileds from fields-array to database. Duplicates are not imported
     * @param fields an array of fields
     */
    addFields(fields: Field[]): void;
    /** Returns the number of fields in table */
    get count(): number;
    findField(fieldName: string): Field | null;
}
export declare const fillTableFromRespond: <T extends DbTbl>(c: new () => T, respond: GeneralRespond) => T;
export declare const createfromRespond: <T extends DbTbl>(c: new () => T, respond: GeneralRespond) => T;
export declare const Insert: (cat: number, text: string, date: string) => string;
export declare const Delete: (id: number) => string;
/**
 * Create an INSERT query for the table
 *
 * @param to Table name
 * @param columns
 * @param values in form {tableName: value}
 */
export declare const createInsert: (to: string, columns: string[], values: IJsonObject[]) => string;
