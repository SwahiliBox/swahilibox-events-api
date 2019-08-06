import EncryptData from './encrypt'

describe('EncryptData', () => {
  test('it should encrypt a string and return a hash', () => {
    const originalString = 'myPassword'
    const hashedString = EncryptData.generateHash(originalString)
    expect(originalString).not.toEqual(String(hashedString))
  })

  test('it should return true if a hash matches the originalString string', async () => {
    const originalString = 'myPassword'
    const hashedString = EncryptData.generateHash(originalString)
    const isMatch = await EncryptData.compareHash(originalString, hashedString)
    expect(isMatch).toBeTruthy()
  })
  test('it should return false if a hash does not match the originalString string', async () => {
    const hashedString = EncryptData.generateHash('myPassword')
    const isMatch = await EncryptData.compareHash(
      'SomeRandomString',
      hashedString,
    )
    expect(isMatch).toBeFalsy()
  })
})
