import { routes as users } from './users'
import { routes as main } from './main'

console.log([...main]);

export default [...main].concat([...users])


