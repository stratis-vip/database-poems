import GeneralRespond, { checkRespond } from '../models/general/general-respond'
import { stCodes } from '../models/types'

describe('Create class GeneralRespond', () => {
  const gResponse = new GeneralRespond()
  test('default code = 200', () => {
    expect(gResponse.code).toBe(200)
  })
  test('default data = [{}]', () => {
    expect(gResponse.data).toStrictEqual([])
  })
  test('default error = undefined', () => {
    expect(gResponse.error).toBe(undefined)
  })
  test('default status = success', () => {
    expect(gResponse.status).toStrictEqual(stCodes.success)
  })
})

describe('Check checkRespond', () => {
  test('False if response is undefined', () => {
    const undefinedResponse: GeneralRespond = {} as GeneralRespond
    expect(checkRespond(undefinedResponse)).toBe(false)
  })
  test('False if response.status is Fail', () => {
    const gResponse = new GeneralRespond()
    gResponse.status = stCodes.fail
    expect(checkRespond(gResponse)).toBe(false)
  })
  test('False if response.status is Error', () => {
    const gResponse = new GeneralRespond()
    gResponse.status = stCodes.error
    expect(checkRespond(gResponse)).toBe(false)
  })
  test('True if response.status is success', () => {
    const gResponse = new GeneralRespond()
    gResponse.status = stCodes.success
    expect(checkRespond(gResponse)).toBe(true)
  })
  test('False if response.data is undefined or null', () => {
    const gResponse = new GeneralRespond()
    gResponse.data = (undefined as unknown) as Array<{}>
    expect(gResponse.status).toBe(stCodes.success)
    expect(checkRespond(gResponse)).toBe(false)
    gResponse.data = (null as unknown) as Array<{}>
    expect(checkRespond(gResponse)).toBe(false)
  })
})
