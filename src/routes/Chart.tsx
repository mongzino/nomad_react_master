import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface IChart {
  coinId: string;
}

interface Ihistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: IChart) {
  const { isLoading, data } = useQuery<Ihistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading,,"
      ) : (
        // <ApexCharts
        //   type="line"
        //   series={[
        //     {
        //       name: "Price",
        //       data: data?.map((price) => parseFloat(price.close)) ?? [],
        //     },
        //   ]}
        //   options={{
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: { show: false },
        //       background: "transparent",
        //     },
        //     theme: { mode: "dark" },
        //     stroke: {
        //       curve: "smooth",
        //       width: 5,
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     xaxis: {
        //       labels: {
        //         show: false,
        //       },
        //       axisTicks: {
        //         show: false,
        //       },
        //       axisBorder: {
        //         show: false,
        //       },
        //       type: "datetime",
        //       categories: data?.map((price) => price.time_close * 1000),
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["#2ecc71"], stops: [0, 100] },
        //     },
        //     colors: ["#3498db"],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `${value.toFixed(2)}$`,
        //       },
        //     },
        //   }}
        // />
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => ({
                  x: price.time_open * 1000,
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 300,
              width: 500,
              background: "transparent",
            },
            theme: { mode: "dark" },
            xaxis: {
              type: "datetime",
            },
          }}
        ></ApexCharts>
      )}
    </div>
  );
}

export default Chart;
