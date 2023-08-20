import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

import {
  Heading,
  VStack,
  Image,
  Container,
  HStack,
  Text,
  RadioGroup,
  Radio,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import pkFlag from '../assets/free-vector-pakistan-flag.jpg';
import usaFlag from '../assets/american-flag-icon-png-23.jpg';
import { useToast } from '@chakra-ui/react';

const Coins = () => {
  const toast = useToast();

  const id = 'error-toast';
  const successId = 'success-toast';

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('pkr');
  const [page, setPage] = useState(1);

  const currencySymbol = currency === 'pkr' ? 'Rs.' : '$';

  const btns = new Array(101).fill(1);

  const changePage = val => {
    setPage(val);
    setLoading(true);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&order=market_cap_desc&page=${page}&sparkline=false&locale=en`
        );

        setCoins(data);
        console.log(data);
        setLoading(false);
        if (!toast.isActive(successId)) {
          toast({
            successId,
            title: `Coins Fetched Successfully`,
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

    fetchCoins();
  }, [currency, page]);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: `Error While Fetching Coins`,
        status: 'error',
        isClosable: true,
        duration: 1000,
        position: 'top',
      });
    }

    return <ErrorComponent message={'Error While Fetching Coins'} />;
  }

  return (
    <Container maxW={'container.xl'} centerContent>
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
      {loading ? (
        <Loader />
      ) : (
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          {coins.map(i => (
            <CoinCard
              key={i.id}
              id={i.id}
              name={i.name}
              image={i.image}
              symbol={i.symbol}
              price={i.current_price}
              currencySymbol={currencySymbol}
            />
          ))}
        </HStack>
      )}

      <HStack maxW={['70%', '90%']} spacing={1} overflow={'auto'}>
        {btns.map((i, index) => (
          <Button
            key={index}
            p={4}
            mx={2}
            mb={4}
            w={5}
            h={5}
            variant={'outline'}
            colorScheme={'purple'}
            onClick={() => changePage(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
    </Container>
  );
};

const CoinCard = ({ id, name, image, symbol, price, currencySymbol }) => (
  <Link to={'/coins/' + id}>
    <VStack
      bgColor={'#FAF5FF'}
      w={52}
      p={8}
      transition={'all 0.3s'}
      shadow={'lg'}
      borderRadius={'lg'}
      m={'4'}
      css={{
        '&:hover': {
          transform: 'scale(1.2)',
        },
      }}
    >
      <Image src={image} alt={name} h={10} w={10} objectFit={'contain'} />

      <Heading>{symbol.toUpperCase()}</Heading>

      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>
        {currencySymbol} {price}
      </Text>
    </VStack>
  </Link>
);

export default Coins;
