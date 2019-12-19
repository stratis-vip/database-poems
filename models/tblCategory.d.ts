import { Nullable } from '..';
import DbTbl from './general/general-tbls';
import RespondCategories from './respondCategories';
declare class TblCategory extends DbTbl {
    id: Nullable<number>;
    description: string;
    constructor(id?: number, description?: string);
    fill(res: RespondCategories): void;
}
export default TblCategory;
