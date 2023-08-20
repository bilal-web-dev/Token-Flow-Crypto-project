import './home.css';
import React from 'react';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import btc from '../assets/btc.png';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { SiBitcoin } from 'react-icons/si';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent={'center'}
      height={['70vh', '100vh']}
      bgColor={'#FAF5FF'}
      textAlign="center"
      wrap={'wrap'}
    >
      <motion.div
        style={{
          height: '40vh',
          width: '100%',
        }}
        animate={{
          translateY: '30px',
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Image
          w={'full'}
          h={['40vh', '70vh']}
          objectFit={['cover', 'contain']}
          src={btc}
        />
      </motion.div>

      <div className="home-data">
        <Heading
          as="h1"
          size="2xl"
          mb={4}
          color={'black'}
          fontFamily={'Caveat'}
        >
          Welcome to Token Flow
        </Heading>
        <Text fontSize="xl" mb={8} color={'black'} mx={[4, 4, 4, 4, 4]}>
          Your one-stop destination for cryptocurrency data and insights.
        </Text>
        <Button
          leftIcon={<SiBitcoin />}
          variant={'outline'}
          className="get-started"
          colorScheme="purple"
          onClick={() => {
            navigate('/coins');
          }}
        >
          Get Started
        </Button>
        <Button
          leftIcon={<AiOutlineSearch />}
          my={2}
          variant={'solid'}
          className="get-started"
          colorScheme="purple"
          onClick={() => {
            navigate('/search');
          }}
        >
          Search
        </Button>
      </div>
    </Flex>
  );
};

export default Home;
