import DbTbl from './general/general-tbls';
import RespondTexts from './respondTexts';
import { Nullable } from './types';
export default class TblText extends DbTbl {
    id: Nullable<number>;
    categoryId: Nullable<number>;
    date: string;
    text: string;
    textId: Nullable<number>;
    /**
     * Construct a new poem. Id is given by database server!!!!
     * @param text Text of poem
     * @param textId id of poem in category
     * @param categoryId id of category
     * @param date date of creation
     */
    constructor(text?: string, textId?: Nullable<number>, categoryId?: Nullable<number>, date?: string);
    fillTable(res: RespondTexts): void;
    setId(value: number): void;
}
