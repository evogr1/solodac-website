export type TickerQuote = { symbol: string; name: string; price: number; change: number; changePct: number };

export const TICKER_SYMBOLS: { symbol: string; name: string }[] = [
  { symbol: "^NSEI", name: "Nifty 50" },
  { symbol: "^BSESN", name: "Sensex" },
  { symbol: "ETERNAL.NS", name: "Eternal" },
  { symbol: "SWIGGY.NS", name: "Swiggy" },
  { symbol: "NYKAA.NS", name: "Nykaa" },
  { symbol: "PAYTM.NS", name: "Paytm" },
  { symbol: "POLICYBZR.NS", name: "PB Fintech" },
  { symbol: "NAUKRI.NS", name: "Info Edge" },
  { symbol: "GROWW.NS", name: "Groww" },
  { symbol: "MEESHO.NS", name: "Meesho" },
  { symbol: "LENSKART.NS", name: "Lenskart" },
  { symbol: "URBANCO.NS", name: "Urban Company" },
  { symbol: "IXIGO.NS", name: "ixigo" },
  { symbol: "OLAELEC.NS", name: "Ola Electric" },
  { symbol: "NAZARA.NS", name: "Nazara" },
];

async function fetchQuote(symbol: string, name: string): Promise<TickerQuote | null> {
  const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { chart?: { result?: { meta?: { regularMarketPrice?: number; chartPreviousClose?: number } }[] } };
  const meta = data.chart?.result?.[0]?.meta;
  if (!meta?.regularMarketPrice || !meta.chartPreviousClose) return null;
  const change = meta.regularMarketPrice - meta.chartPreviousClose;
  return { symbol, name, price: meta.regularMarketPrice, change, changePct: (change / meta.chartPreviousClose) * 100 };
}

export async function getTicker(): Promise<TickerQuote[]> {
  const quotes = await Promise.all(TICKER_SYMBOLS.map(({ symbol, name }) => fetchQuote(symbol, name).catch(() => null)));
  return quotes.filter((quote): quote is TickerQuote => quote !== null);
}
