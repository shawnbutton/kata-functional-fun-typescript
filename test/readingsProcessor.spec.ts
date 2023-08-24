import {Reading, ReadingProcessor} from "../src/readingsProcessor";
import {clone} from "ramda";

describe('process readings', () => {
  const buildReading = (type: string = 'environmental'): Reading => {
    return {
      data: [0],
      name: 'test data',
      inactive: false,
      temperature: 0,
      type
    }
  }

  const buildFarenheitReading = (type: string = 'environmental'): Reading => {
    const reading = buildReading(type)
    reading.temperature = 32
    return reading
  }

  it('should ignore readings with no data', () => {
    const given = buildReading()
    given.data = []

    const expected = {}

    expect(ReadingProcessor.processReadings([given])).toEqual(expected)
  })

  it('should ignore readings that are inactive', () => {
    const given = buildReading()
    given.inactive = true

    const expected = {}

    expect(ReadingProcessor.processReadings([given])).toEqual(expected)
  })

  test('environmental is grouped', () => {
    const given = buildReading()
    given.type = 'environmental'

    const expected = {
      environmental: [buildFarenheitReading()]
    }

    expect(ReadingProcessor.processReadings([given])).toEqual(expected)
  })

  test('asset is grouped', () => {
    const given = buildReading('asset')

    const expected = {
      asset: [buildFarenheitReading('asset')]
    }

    expect(ReadingProcessor.processReadings([given])).toEqual(expected)
  })

  test('vehicle is grouped', () => {
    const given = buildReading('vehicle')

    const expected = {
      vehicle: [buildFarenheitReading('vehicle')]
    }

    expect(ReadingProcessor.processReadings([given])).toEqual(expected)
  })

  test('other types are ignored', () => {
    const given = buildReading('something unknown')

    expect(ReadingProcessor.processReadings([given])).toEqual({})
  })

  test('will group multiple readings', () => {
    const given = [
      buildReading('environmental'),
      buildReading('environmental'),
      buildReading('asset'),
      buildReading('vehicle')
    ]

    const expected = {
      environmental: [buildFarenheitReading(), buildFarenheitReading()],
      asset: [buildFarenheitReading('asset')],
      vehicle: [buildFarenheitReading('vehicle')]
    }

    expect(ReadingProcessor.processReadings(given)).toEqual(expected)
  })

  // todo this test does not pass because currently the code mutates the input. This is a bad thing. Perhaps after your functional refactoring you can enable this test and get it to pass?
  xit('should not mutate readings', () => {
    const given: Reading[] = [buildReading()]

    const identicalToGiven = clone(given)

    ReadingProcessor.processReadings(given)

    expect(given).toEqual(identicalToGiven)
  })
})
