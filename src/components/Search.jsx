import React from 'react';
import {
  Container,
  Input,
  Button,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { AiOutlineSearch } from 'react-icons/ai';
import ErrorComponent from './ErrorComponent';

const Search = () => {
  const toast = useToast();
  const id = 'error-toast';
  const successId = 'success-toast';
  const queryId = 'query-toast';

  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${server}/search?query=${query}`);
      setSearchData(data.coins);
      console.log(data.coins);
      setLoading(false);
      if (!toast.isActive(successId)) {
        toast({
          successId,
          title: `Results Fetched Successfully`,
          status: 'success',
          isClosable: true,
          duration: 1000,
          position: 'top',
        });
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const search = () => {
    if (query !== '') {
      setLoading(true);
      fetchData();
    } else {
      if (!toast.isActive(queryId)) {
        toast({
          queryId,
          title: `Please Enter Something To Search`,
          status: 'error',
          isClosable: true,
          duration: 1000,
          position: 'top',
        });
      }
    }
  };

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
    <Container
      display={'flex'}
      justifyContent={'center'}
      minH={'70vh'}
      maxW={'container.xl'}
      flexWrap={'wrap'}
    >
      <Box
        w={'full'}
        h={'30%'}
        display={'flex'}
        justifyContent={'center'}
        flexWrap={'wrap'}
      >
        <Input
          display={'block'}
          m={6}
          w={['80%', '90%']}
          placeholder="Search Coins"
          onChange={e => setQuery(e.target.value)}
          value={query}
        />

        <Button
          leftIcon={<AiOutlineSearch />}
          variant={'outline'}
          colorScheme="purple"
          onClick={search}
        >
          Search
        </Button>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <HStack wrap={'wrap'} justifyContent={'space-evenly'} p={4}>
          {searchData.map((item, index) => {
            return (
              <CoinCard
                key={index}
                id={item.id}
                name={item.name}
                image={item.large}
                symbol={item.symbol}
              />
            );
          })}
        </HStack>
      )}
    </Container>
  );
};

const CoinCard = ({ id, name, image, symbol }) => (
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
    </VStack>
  </Link>
);

export default Search;
