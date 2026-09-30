export const SIMULATION_TICKS_PER_SECOND = 10;
export const GAME_DAY_SECONDS = 5 * 60;
export const GAME_NIGHT_SECONDS = 60;
export const GAME_DAY_TICKS = GAME_DAY_SECONDS * SIMULATION_TICKS_PER_SECOND;
export const GAME_NIGHT_TICKS = GAME_NIGHT_SECONDS * SIMULATION_TICKS_PER_SECOND;

export const STAFF_WAITING_AREA = Object.freeze({
  minX: -24.8,
  minZ: -7.65,
  columns: 5,
  spacing: 0.65,
});

export function gameDayNumber(tick) {
  return Math.floor(Math.max(0, tick) / GAME_DAY_TICKS) + 1;
}

export function gameDaylight(tick) {
  const position = Math.max(0, tick) % GAME_DAY_TICKS;
  const nightStartsAt = GAME_DAY_TICKS - GAME_NIGHT_TICKS;
  if (position < nightStartsAt) return 1;

  const nightPosition = position - nightStartsAt;
  const transitionTicks = GAME_NIGHT_TICKS * 0.2;
  if (nightPosition < transitionTicks) {
    const progress = nightPosition / transitionTicks;
    return 1 - progress * progress * (3 - 2 * progress);
  }
  if (nightPosition > GAME_NIGHT_TICKS - transitionTicks) {
    const progress = (nightPosition - (GAME_NIGHT_TICKS - transitionTicks)) / transitionTicks;
    return progress * progress * (3 - 2 * progress);
  }
  return 0;
}
