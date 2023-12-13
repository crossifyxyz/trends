export function calculateMetric(data: { value: number; weight: number }[]) {
  // Calculate the weighted sum
  let metric = 0
  for (const item of data) {
    if (!item.value) return 0
    if (item.weight < 0) {
      metric += normalize(Math.abs(item.value)) * Math.abs(item.weight)
    } else {
      metric += normalize(item.value) * item.weight
    }
  }

  // Normalize the metric to a range of 0 to 100
  metric = (metric + 1) * 50

  // Clamp the metric to a range of 0 to 100
  metric = Math.max(0, Math.min(100, metric))

  return metric
}

// Normalize x to a range of 0 to 1
const normalize = (value: number) => {
  if (Math.abs(Number(value)) >= 1.0e9) {
    return Math.abs(Number(value)) / 1.0e9
  } else if (Math.abs(Number(value)) >= 1.0e6) {
    return Math.abs(Number(value)) / 1.0e6
  } else if (Math.abs(Number(value)) >= 1.0e3) {
    return Math.abs(Number(value)) / 1.0e3
  } else {
    const last = Math.abs(Number(value))
    if (last === 0) return 0
    return last
  }
}
