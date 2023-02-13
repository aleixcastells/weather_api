export function windCardinalDirection(degrees) {

    const CARDINAL_POINTS = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5]
    const DELTAS = []
    CARDINAL_POINTS.forEach((point) => { DELTAS.push(Math.abs(degrees - point)) })

    let smallest_delta = Math.min(...DELTAS)
    let closest_degree = CARDINAL_POINTS[DELTAS.indexOf(smallest_delta)]

    // ↖ ↗ ↘ ↙ ← → ↑ ↓
    switch (closest_degree) {
        case 0: return `N ↓ (${degrees}°)`
        case 22.5: return `NNE ↙ (${degrees}°)`
        case 45: return `NE ↙ (${degrees}°)`
        case 67.5: return `NEE ↙ (${degrees}°)`
        case 90: return `E ← (${degrees}°)`
        case 112.5: return `SEE ↖ (${degrees}°)`
        case 135: return `SE ↖ (${degrees}°)`
        case 157.5: return `SSE ↖ (${degrees}°)`
        case 180: return `S ↑ (${degrees}°)`
        case 202.5: return `SSO ↗ (${degrees}°)`
        case 225: return `SO ↗ (${degrees}°)`
        case 247.5: return `SOO ↗ (${degrees}°)`
        case 270: return `O → (${degrees}°)`
        case 292.5: return `NOO ↘ (${degrees}°)`
        case 315: return `NO ↘ (${degrees}°)`
        case 337.5: return `NNO ↘ (${degrees}°)`
    }
}