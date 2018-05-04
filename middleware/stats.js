import axios from '../plugins/axios'

export default function ({ route }) {
  return function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    return next()
  }
}