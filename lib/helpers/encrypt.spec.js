import EncryptData from './encrypt'

describe('EncryptData', () => {
  test('it should encrypt a string and return a hash', () => {
    const originalString = 'myPassword'
    const hashedString = EncryptData.generateHash(originalString)
    // lets assert that the string is not the same.
    expect(originalString).not.toEqual(String(hashedString))
  })

  test('it should return true if a hash matches the originalString string', async () => {
    const originalString = 'myPassword'
    const hashedString = EncryptData.generateHash(originalString)
    const isMatch = await EncryptData.compareHash(originalString, hashedString)
    // isMatch should be true
    expect(isMatch).toBeTruthy()
  })
  test('it should return false if a hash does not match the originalString string', async () => {
    const hashedString = EncryptData.generateHash('myPassword')
    const isMatch = await EncryptData.compareHash(
      'SomeRandomString',
      hashedString,
    )
    // isMatch should be true
    expect(isMatch).toBeFalsy()
  })
})
