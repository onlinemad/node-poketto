const debug = require('debug')('poketto')

/**
* Generate random string
*
* @param {int}  length  String length
* @param {string} pattern Character pattern
*/
exports.random_str = (length, pattern) => {
  let text = ''
  let possible = ''
  let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lowercase = 'abcdefghijklmnopqrstuvwxyz'
  let number = '0123456789'
  let url = '-._~:/?#[]@!$&\'()*+,;=\`.'
  if (pattern) {
    switch (pattern) {
      case 'URL':
        possible = uppercase + lowercase + number + url
        break
      case 'UPPER_NUMBER':
        possible = uppercase + number
        break
      case 'LOWER_NUMBER':
        possible = lowercase + number
        break
      case 'NUMBER':
        possible = number
        break
      case 'UPPER':
        possible = uppercase
        break
      case 'LOWER':
        possible = lowercase
        break
      default:
        possible = pattern
    }
  } else {
    possible = uppercase + lowercase + number
  }

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

exports.load_config = () => {
  let config = {}
  try {
    if (process.env.NODE_ENV) {
      config = require(`${process.cwd()}/config.${process.env.NODE_ENV}.json`)
    } else {
      config = require(`${process.cwd()}/config.json`)
    }
  } catch (e) {
    console.warn(e.message)
    config = {}
  }
  debug('loaded config', config)
  return config
}
