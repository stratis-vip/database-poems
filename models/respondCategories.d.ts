import GeneralRespond from '../models/general/general-respond';
import { ICategory } from '../models/types';
declare class RespondCategories extends GeneralRespond {
    data: ICategory[];
    constructor();
}
export default RespondCategories;
