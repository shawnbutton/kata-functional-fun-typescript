import { Kata } from '../src/kata'

describe('Empty Kata', () => {
  it('should pass this test', () => {
    const sut = new Kata()
    expect(sut.someFunction()).toEqual('expectation')
  })
})
