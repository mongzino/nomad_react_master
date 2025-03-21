import styled from "styled-components";

interface IPrice {
  priceData?: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

const PriceList = styled.ul``;

const PriceLi = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 15px;
  gap: 10px;
  span {
    display: block;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

function Price({ priceData }: IPrice) {
  return (
    <PriceList>
      <PriceLi>
        <span>All Time High</span>
        <span>{priceData?.ath_price.toFixed(2)} $</span>
      </PriceLi>
      <PriceLi>
        <span>Market Cap</span>
        <span>{priceData?.market_cap} $</span>
      </PriceLi>
      <PriceLi>
        <span>Price Change 24H </span>
        <span>{priceData?.percent_change_24h}%</span>
      </PriceLi>
      <PriceLi>
        <span>Volume 24H</span>
        <span>{priceData?.volume_24h.toFixed(2)} $</span>
      </PriceLi>
    </PriceList>
  );
}

export default Price;
