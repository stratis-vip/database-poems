import RespondCategories from '../models/respondCategories'

describe('Create object RespondCategories', () => {
    test('Created not null', () => {
        const t = new RespondCategories()
        expect(t).not.toBe(null)
        expect(t.data).toStrictEqual([])
    })
})