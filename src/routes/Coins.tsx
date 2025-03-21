import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title> Coins</Title>
      </Header>
      {isLoading ? (
        <>Loading..</>
      ) : (
        <CoinList>
          {data ? (
            <>
              {data.slice(0, 100).map((coin) => (
                <Coin key={coin.id}>
                  <Link
                    to={{
                      pathname: `/${coin.id}`,
                      state: { name: coin.name },
                    }}
                  >
                    <Logo
                      src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                      alt={coin.name}
                    />
                    {coin.name} &rarr;
                  </Link>
                </Coin>
              ))}
            </>
          ) : (
            <>error</>
          )}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
