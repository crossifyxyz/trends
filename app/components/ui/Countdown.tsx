'use client'

import { unixTime } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Countdown as DaisyCountdown } from 'react-daisyui'

export default function Countdown({
  skip,
  seconds,
  timestamp,
}: {
  skip?: boolean
  seconds: number
  timestamp?: number
}) {
  // Set the secondsLeft to the seconds prop
  const [secondsLeft, setSecondsLeft] = useState(0)
  useEffect(() => {
    if (skip) return () => setSecondsLeft(0)

    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) =>
        prevSeconds >= seconds
          ? 0
          : !timestamp
            ? prevSeconds + 1
            : (Math.floor(timestamp / 1000) - unixTime()) * -1
      )
    }, 1000)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, seconds, timestamp])
  return <DaisyCountdown className="text-2xl" value={secondsLeft} />
}
