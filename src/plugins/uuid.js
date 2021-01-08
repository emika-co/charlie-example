import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line no-empty-pattern
export default ({ }, inject) => {
  inject('uuid', uuidv4)
}
