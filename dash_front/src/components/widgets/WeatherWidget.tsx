import { Box, Text, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Weather, WeatherData, WidgetParameter } from 'services/widget';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';

interface WidgetProps {
  id: string;
  serviceId: string;
  lastRefresh: Date | null;
  parameters: WidgetParameter[];
  refreshRate: number;
  data?: WeatherData;
}

export type NivoBarData = Array<{
  id: string | number;
  data: Array<{
    x: number | string | Date;
    y: number | string | Date;
  }>;
}>;

const WeatherChart = ({ data }: { data: NivoBarData }) => (
  <div id="chart"></div>
);

const WeatherWidget = ({ lastRefresh, parameters, data }: WidgetProps) => {
  const [options, setOptions] = useState({
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: new Array<string>(),
    },
  });
  const [series, setSeries] = useState<
    Array<{ name: string; data: Array<number> }>
  >([]);
  const nivoData =
    data !== undefined
      ? [
          {
            id: data.city,
            data: data.weather.map((d: Weather) => ({
              x: new Date(d.dt * 1000),
              y: d.temp.toFixed(0),
            })),
          },
        ]
      : undefined;

  useEffect(() => {
    if (data !== undefined) {
      setOptions({
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: data.weather.map((d: Weather) =>
            new Date(d.dt * 1000).toUTCString(),
          ),
        },
      });

      setSeries([
        {
          name: data.city,
          data: data.weather.map((d: Weather) => d.temp),
        },
      ]);
    }
  }, [data]);

  return data === undefined ? (
    <Skeleton />
  ) : (
    <VStack
      align="start"
      spacing="24px"
      w="100%"
      p={{ base: '12px', sm: '16px', md: '24px' }}
    >
      {console.log(nivoData)}
      <VStack align="start" spacing="12px">
        <Text
          color="black"
          fontSize={{ base: '14px', md: '15px', lg: '16px' }}
          fontWeight="700"
        >
          Temperature & weather in{' '}
          <Text as="pre" display="inline" fontWeight="500">
            {parameters[0].value_string}
          </Text>{' '}
          for next 18 hours
        </Text>
        <Text
          color="black"
          fontSize={{ base: '13px', sm: '13px', md: '14px', lg: '16px' }}
          opacity="0.54"
        >
          Last refresh: {lastRefresh}
        </Text>
      </VStack>

      <VStack
        w="100%"
        align="start"
        minH="250px"
        overflowY="auto"
        overflowX="hidden"
      >
        <VStack w="100%" align="start" color="black">
          <Chart options={options} series={series} type="line" width="500" />{' '}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default WeatherWidget;
