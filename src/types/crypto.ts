export interface CryptoData {
  symbol: string;
  price: string;
  priceChangePercent: string;
  volume: string;
  highPrice: string;
  lowPrice: string;
  lastPrice?: string;
}

export interface CryptoTickerResponse {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  bidPrice: string;
  askPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}