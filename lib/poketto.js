const debug = require('debug')('poketto')

/**
* Format phone number from 0919919919 to 0919-919919
*
* @param {string} phone Phone number
*/
exports.format_phone_with_dash = function (phone) {
  if (/\d{4}-\d{6}/.test(phone)) {
    return phone
  }
  if (/\+886\d{9}/.test(phone)) {
    phone = phone.replace('+886', '0')
  }
  if (/09\d{8}/.test(phone)) {
    return `${phone.substr(0, 4)}-${phone.substring(4)}`
  }
  return phone
}

/**
* Format phone number from +886919919919 to 0919919919
*
* @param {string} phone Phone number
*/
exports.format_phone_without_dash = function (phone) {
  phone = phone.replace(/^\+886/, '0').replace('-', '')
  return phone
}

/**
* Generate random string
*
* @param {int}  length  String length
* @param {string} pattern Character pattern
*/
exports.random_str = function(length, pattern) {
  var text = ''
  var possible = ''
  var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var lowercase = 'abcdefghijklmnopqrstuvwxyz'
  var number = '0123456789'
  var url = '-._~:/?#[]@!$&\'()*+,;=\`.'
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

  for( var i=0; i < length; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

exports.load_config = function(){
  var config = {}
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
