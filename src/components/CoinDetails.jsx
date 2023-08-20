import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

import {
  VStack,
  Image,
  Container,
  HStack,
  Text,
  RadioGroup,
  Radio,
  Button,
  Box,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
} from '@chakra-ui/react';

import pkFlag from '../assets/free-vector-pakistan-flag.jpg';
import usaFlag from '../assets/american-flag-icon-png-23.jpg';
import { useParams } from 'react-router-dom';
import Chart from './Chart';
import { useToast } from '@chakra-ui/react';

const CoinDetails = () => {
  const params = useParams();
  const toast = useToast();
  const id = 'error-toast';
  const successId = 'success-toast';

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('pkr');
  const [days, setDays] = useState('1');
  const [chartData, setChartData] = useState([]);

  const currencySymbol = currency === 'pkr' ? 'Rs.' : '$';

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max'];

  const SwitchChartStats = key => {
    switch (key) {
      case '24h':
        setDays('24h');

        break;
      case '7d':
        setDays('7');

        break;
      case '14d':
        setDays('14');

        break;
      case '30d':
        setDays('30');

        break;
      case '60d':
        setDays('60');

        break;
      case '200d':
        setDays('200');

        break;
      case '1y':
        setDays('365d');

        break;
      case 'max':
        setDays('max');

        break;

      default:
        setDays('24h');

        break;
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        console.log(chartData.prices);
        console.log(data);
        setChartData(chartData.prices);

        setCoin(data);
        setLoading(false);
        if (!toast.isActive(successId)) {
          toast({
            successId,
            title: `Coin Details Fetched Successfully`,
            status: 'success',
            isClosable: true,
            duration: 1000,
            position: 'top',
          });
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
    
  }, [params.id, currency, days]);

  const getPercentage = () => {
    const currentPrice = coin.market_data.current_price[currency];
    const TotalPrice = coin.market_data.ath[currency];

    const percentage = (currentPrice / TotalPrice) * 100;
    return percentage;
  };

  const getColorer = () => {
    const color =
      coin.market_data.price_change_percentage_24h_in_currency[currency] > 0
        ? 'green'
        : 'red';
    return color;
  };

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: `Error While Fetching Coin Details`,
        status: 'error',
        isClosable: true,
        duration: 1000,
        position: 'top',
      });
    }

    return <ErrorComponent message={'Error While Fetching Coin Details'} />;
  }

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <VStack p={7} spacing={4} alignItems={'flex-start'}>
            <RadioGroup
              onChange={setCurrency}
              defaultValue={currency}
              padding={4}
              w={'full'}
              display={'flex'}
              justifyContent={'center'}
            >
              <Radio value={'pkr'} mx={4}>
                PKR
              </Radio>
              <Image
                src={pkFlag}
                height={6}
                w={6}
                objectFit={'contain'}
                position={'relative'}
                right={3}
              ></Image>
              <Radio value={'usd'} mx={4}>
                USD
              </Radio>
              <Image
                src={usaFlag}
                height={6}
                w={6}
                objectFit={'contain'}
                position={'relative'}
                right={3}
              ></Image>
            </RadioGroup>

            <Image
              src={coin.image.large}
              w={85}
              h={85}
              my={4}
              objectFit={'contain'}
            ></Image>
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_24h_in_currency[currency] > 0
                      ? 'increase'
                      : 'decrease'
                  }
                ></StatArrow>
                {
                  coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ]
                }
                %
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={'2xl'}
              bgColor={'blackAlpha.800'}
              color={'white'}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={coin.market_data.ath[currency]}
              low={coin.market_data.atl[currency]}
              percentage={getPercentage()}
              color={getColorer()}
            />

            <Box w={'full'} p={4}>
              <Item
                title={'24H LOW'}
                value={`${currencySymbol}` + coin.market_data.low_24h[currency]}
              ></Item>
              <Item
                title={'24H HIGH'}
                value={
                  `${currencySymbol}` + coin.market_data.high_24h[currency]
                }
              ></Item>
              <Item
                title={'TOKEN FLOW SCORE'}
                value={coin.coingecko_score}
              ></Item>
              <Item
                title={'MAX SUPPLY'}
                value={coin.market_data.max_supply}
              ></Item>
              <Item
                title={'CIRCULATING SUPPLY'}
                value={coin.market_data.circulating_supply}
              ></Item>
              <Item
                title={'MARKET CAP'}
                value={
                  `${currencySymbol}` + coin.market_data.market_cap[currency]
                }
              ></Item>
              <Item
                title={'ALL TIME LOW DATE'}
                value={new Date(
                  coin.market_data.atl_date[currency]
                ).toLocaleDateString()}
              ></Item>
              <Item
                title={'All TIME HIGH DATE'}
                value={new Date(
                  coin.market_data.ath_date[currency]
                ).toLocaleDateString()}
              ></Item>
            </Box>

            <Text
              textAlign={'center'}
              alignSelf={'center'}
              fontSize={'smaller'}
            >
              Last Updated At {Date(coin.market_data.last_updated)}
            </Text>
          </VStack>

          <HStack
            justifyContent={['', 'center']}
            overflow={'auto'}
            mb={5}
            w={['80%', 'full']}
            mx={'7'}
          >
            {btns.map(i => (
              <Button
                key={i}
                onClick={() => SwitchChartStats(i)}
                disabled={i === days}
                variant={'outline'}
                colorScheme="purple"
              >
                {i}
              </Button>
            ))}
          </HStack>

          <Box
            w={'full'}
            borderWidth={1}
            borderColor={'gray.200'}
            my={4}
            borderRadius={'lg'}
            boxShadow={'lg'}
          >
            <Chart arr={chartData} currency={currencySymbol} days={days} />
          </Box>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={'full'} my={4}>
    <Text
      fontFamily={'Roboto'}
      letterSpacing={'widest'}
      fontSize={['sm', 'lg']}
    >
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low, percentage, color }) => (
  <VStack w={'full'}>
    <Progress w={'full'} colorScheme={color} size={'md'} value={percentage} />
    <HStack w={'full'} justifyContent={'space-between'}>
      <Badge children={low} colorScheme="red" />
      <Text>All Time Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinDetails;
