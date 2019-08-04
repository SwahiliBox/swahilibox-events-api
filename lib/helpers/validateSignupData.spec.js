import validateSignupData from './validateSignupData'

describe('#validateSignupData', () => {
	const validData = {
		first_name: 'Joe',
		last_name: 'Doe',
		email: 'joedoe@gmail.com',
		password: 'mypasswod123'
	}
	const invalidData = {
		first_name: 'Joe',
		last_name: 'Doe',
		email: 'joedoegmail.com',
		password: 'mypasswod123'
	}
	test('should return no erros if data is valid', () => {
		const erros = validateSignupData(validData)
		expect(erros).toEqual([])
	})
	test('it should retun an erro if data is not valid', () => {
		const erros = validateSignupData(invalidData)
		expect(erros[0].message).toEqual('please provide a valid email')
	})
})