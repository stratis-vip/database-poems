import GeneralRespond from './general-respond'
export default abstract class DbTbl {
  abstract fill(res: GeneralRespond): void
}
export declare const fill: <T extends DbTbl>(c: new () => T, respond: GeneralRespond) => T
export declare const createfromRespond: <T extends DbTbl>(c: new () => T, respond: GeneralRespond) => T
