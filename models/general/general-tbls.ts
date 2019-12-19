import { MALLFORMED_RESPONSE_ERROR } from '../consts'
import GeneralRespond, { checkRespond } from './general-respond'

export default abstract class DbTbl {
  public abstract fill(res: GeneralRespond): void
}

export const fill = <T extends DbTbl>(c: new () => T, respond: GeneralRespond): T => {
  const t = new c()
  t.fill(respond)
  return t
}

export const createfromRespond = <T extends DbTbl>(c: new () => T, respond: GeneralRespond): T => {
  if (!checkRespond(respond)) {
    throw new Error(MALLFORMED_RESPONSE_ERROR)
  }
  return fill(c, respond)
}
