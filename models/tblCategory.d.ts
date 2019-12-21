import DbTbl from './general/general-tbls';
import RespondCategories from './respondCategories';
import { IJsonObject } from './types';
declare class TblCategory extends DbTbl {
    constructor();
    fillTable(res: RespondCategories): void;
    insert(values: IJsonObject[]): string;
    get fieldsArray(): string[];
}
export default TblCategory;
