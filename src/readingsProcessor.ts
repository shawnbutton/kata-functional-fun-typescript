export interface Reading {
  name: string
  type: string
  inactive: boolean
  data: [number] | []
  temperature: number
}

export interface ReadingGroup {
  vehicle?: Reading[]
  asset?: Reading[]
  environmental?: Reading[]
}

export class ReadingProcessor {
  processReadings (readings: Reading[]): ReadingGroup {
    const grouped: ReadingGroup = {}

    for (let i = 0; i < readings.length; i++) {
      const reading = readings[i]

      // only process if we received data for reading
      if (reading.data.length > 0 && !reading.inactive) {
        // convert temperature readings to Fahrenheit
        reading.temperature = reading.temperature * 1.8 + 32

        // group by reading type
        if (reading.type === 'environmental') {
          if (grouped.environmental == null) grouped.environmental = []
          grouped.environmental.push(reading)
        } else if (reading.type === 'asset') {
          if (grouped.asset == null) grouped.asset = []
          grouped.asset.push(reading)
        } else if (reading.type === 'vehicle') {
          if (grouped.vehicle == null) grouped.vehicle = []
          grouped.vehicle.push(reading)
        }
      }
    }

    return grouped
  }
}
