import { expect, describe, it } from 'bun:test'
import { formatUnits } from 'viem'

const gateKey = process.env.GATE_IO_KEY ?? ''
const gateSecret = process.env.GATE_IO_SECRET ?? ''

const pair = 'ORDS_USDT'

let currency: Record<string, number | string>

describe('New Listings Sniper', () => {
  it('check currency', async () => {
    try {
      const details = await fetch(
        `https://api.gateio.ws/api/v4/spot/currency_pairs/${pair}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      )

      currency = await details.json()
    } catch {
      console.error('error fetcing')
    }

    console.log(currency)

    expect(currency).pass()
  })
})

describe('Buy Until Timeout', () => {
  it('Buy', async () => {
    try {
      const details = await fetch(
        `https://api.gateio.ws/api/v4/spot/currency_pairs/${pair}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      )

      currency = await details.json()
    } catch {
      console.error('error fetcing')
    }

    console.log(currency)

    expect(currency).pass()
  })
})
