import Respond from './Respond';
declare type Nullable<T> = T | null;
declare class TblTexts {
    id: Nullable<number>;
    categoryId: Nullable<number>;
    date: string;
    text: string;
    textId: Nullable<number>;
    constructor(id?: number, text?: string, textId?: number, categoryId?: number, date?: string);
    fromRespond(respond: Respond): void;
}
export default TblTexts;
