/* eslint-env mocha */

const assert = require('chai').assert
const p = require('../index')

suite('poketto', () => {
  suite('format_phone_with_dash', () => {
    test('should format phone number from 0919919919 to 0919-919919', () => {
      let phone = '0919919919'
      assert.equal(p.format_phone_with_dash(phone), '0919-919919')
    })
    test('should format phone number from +886919919919 to 0919-919919', () => {
      let phone = '+886919919919'
      assert.equal(p.format_phone_with_dash(phone), '0919-919919')
    })
  })
  suite('format_phone_without_dash', () => {
    test('should format phone number from +886919919919 to 0919919919', () => {
      let phone = '+886919919919'
      assert.equal(p.format_phone_without_dash(phone), '0919919919')
    })
  })
  suite('random_str', () => {
    test('should generate a random string that length = 10', () => {
      let str = p.random_str(10)
      assert.equal(str.length, 10)
      assert.match(str, /[a-zA-Z0-9]{10}/)
    })
    test('should generate a random string that length = 10 with uppercase and number character', () => {
      let str = p.random_str(10, 'UPPER_NUMBER')
      assert.equal(str.length, 10)
      assert.match(str, /[A-Z0-9]{10}/)
    })
    test('should generate a random string that length = 10 with lowercase and number character', () => {
      let str = p.random_str(10, 'LOWER_NUMBER')
      assert.equal(str.length, 10)
      assert.match(str, /[a-z0-9]{10}/)
    })
    test('should generate a random string that length = 10 with number character', () => {
      let str = p.random_str(10, 'NUMBER')
      assert.equal(str.length, 10)
      assert.match(str, /[0-9]{10}/)
    })
    test('should generate a random string that length = 10 with uppercase character', () => {
      let str = p.random_str(10, 'UPPER')
      assert.equal(str.length, 10)
      assert.match(str, /[A-Z]{10}/)
    })
    test('should generate a random string that length = 10 with lowercase character', () => {
      let str = p.random_str(10, 'LOWER')
      assert.equal(str.length, 10)
      assert.match(str, /[a-z]{10}/)
    })
  })
  suite('load_config', () => {
    test('should load default config file', () => {
      let config = p.load_config()
      assert.deepEqual(config, { foo: 'bar'})
    })
    test('should load beta config file', () => {
      process.env.NODE_ENV = 'beta'
      let config = p.load_config()
      assert.deepEqual(config, { foo: 'baz'})
    })
  })
})
