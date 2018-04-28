import axios from '../plugins/axios'

export default function ({ route }) {
  return function (req, res, next) {
    return next()
  }
}