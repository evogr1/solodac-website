/** Numbers the way our readers count them: 40992678 → "4 crore", 636000 → "6.3 lakh". Rounds down, never up. */
export function indianNumber(value: number) {
  const oneDecimal = (n: number) => {
    const rounded = Math.floor(n * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  };
  if (value >= 10_000_000) return `${oneDecimal(value / 10_000_000)} crore`;
  if (value >= 100_000) return `${oneDecimal(value / 100_000)} lakh`;
  return value.toLocaleString("en-IN");
}

/** Where a reel lives: its Instagram post or its YouTube Short. */
export const reelUrl = (reel: { id: string; platform?: "youtube" | "instagram" }) =>
  reel.platform === "instagram" ? `https://www.instagram.com/reel/${reel.id}/` : `https://www.youtube.com/shorts/${reel.id}`;
