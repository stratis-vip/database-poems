import { JsonClass} from './models/general/helper-classes/json-class'

class JC extends JsonClass {


}


        const l = new JC('WHERE')
        l.addToColumns({door: 'closed'})
        // expect(l.toString()).toBe(`WHERE id = '3' AND keimena = 'skata' AND door = 'closed' `)
        // l.addToColumns({door: 'closed'}) 
        // console.log(combineJsonClasses([l],'OR'))
