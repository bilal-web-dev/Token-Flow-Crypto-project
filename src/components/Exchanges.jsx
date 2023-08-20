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
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';

const Exchanges = () => {
  const toast = useToast();

  const id = 'error-toast';
  const successId = 'success-toast';

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);

        setExchanges(data);
        console.log(data);
        setLoading(false);

        if (!toast.isActive(successId)) {
          toast({
            successId,
            title: `Exchanges Fetched Successfully`,
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

    fetchExchanges();
  }, []);

  if (error) {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: `Error While Fetching Exchanges`,
        status: 'error',
        isClosable: true,
        duration: 1000,
        position: 'top',
      });
    }

    return <ErrorComponent message={'Error While Fetching Exchanges'} />;
  }

  return (
    <Container maxW={'container.xl'} mb={4}>
      {loading ? (
        <Loader />
      ) : (
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          {exchanges.map(i => (
            <ExchangeCard
              key={i.id}
              name={i.name}
              url={i.url}
              image={i.image}
              rank={i.trust_score_rank}
            />
          ))}
        </HStack>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, url, image, rank }) => (
  <a href={url} target={'blank'}>
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

      <Heading size={'md'} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
