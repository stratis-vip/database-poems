export declare enum stCodes {
    success = "success",
    error = "error",
    fail = "fail"
}
declare class Respond {
    code: number;
    data: Array<{}>;
    error: string | null;
    status: stCodes;
    constructor();
}
export default Respond;
