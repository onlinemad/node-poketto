/**
* Format phone number from 0919919919 to 0919-919919
*
* @param {string} phone Phone number
*/
exports.format_phone_with_dash = function (phone) {
  if (phone.startsWith('+886')) {
    phone = phone.replace('+886', '0')
  }
  if (phone.startsWith('09')) {
    return `${phone.substr(0, 4)}-${phone.substring(4)}`
  } else {
    return phone
  }
}

/**
* Format phone number from +886919919919 to 0919919919
*
* @param {string} phone Phone number
*/
exports.format_phone_without_dash = function (phone) {
  if (phone.startsWith('+886')) {
    phone = phone.replace('+886', '0')
  }
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

  for( var i=0; i < length; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
