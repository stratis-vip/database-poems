import { stCodes } from '../types';
export default class GeneralRespond {
    code: number;
    data: Array<{}>;
    error?: string;
    status: stCodes;
    constructor();
}
export declare const checkRespond: (respond: GeneralRespond | undefined) => boolean;
