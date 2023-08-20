import {
  Avatar,
  Box,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import dp from '../assets/dp.jpeg';
import { FaFacebook, FaTwitter, FaLinkedin, FaLink } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

const Footer = () => {
  return (
    <Box
      bgColor={'purple.50'}
      color={'black'}
      minH={'48'}
      px={'16'}
      py={['16', '8']}
    >
      <Stack direction={['column', 'row']} h={'full'} alignItems={'center'}>
        <VStack w={'full'} alignItems={['center', 'flex-start']}>
          <Text fontWeight={'bold'}>About Us</Text>
          <Text
            fontSize={'sm'}
            letterSpacing={'widest'}
            textAlign={['center', 'left']}
          >
            We are Pakistan's 1st Cryptocurrency Data and Insights Company
            committed 24/7 to provide the real time data.
          </Text>

          <p
            style={{
              opacity: 0.4,
              fontSize: 12,
              textAlign: 'center',
              color: '#000',
            }}
          >
            © 2023 All Rights Reserved
          </p>

          <HStack my={4}>
            <a href="https://www.facebook.com/savageBilal" target="_blank">
              <FaFacebook size={30} />
            </a>
            <a href="https://www.linkedin.com/in/bilal-webdev" target="_blank">
              <FaLinkedin size={30} />
            </a>
            <a href="bilalchaudhary6061@gmail.com" target="_blank">
              <AiOutlineMail size={30} />
            </a>
          </HStack>
        </VStack>

        <VStack>
          <Avatar boxSize={'28'} mt={['1', '0']} src={dp} mr={5} />
          <p
            style={{
              opacity: 0.7,
              fontSize: 13,
              textAlign: 'center',
              color: '#000',
              fontFamily: 'roboto',
              marginTop: 2,
              marginRight: 15,
            }}
          >
            Made With ❤️ by &nbsp;
            <a
              style={{ textDecoration: 'underline' }}
              target="_blank"
              href="https://www.linkedin.com/in/bilal-webdev"
            >
              &lt;Bilal /&gt;
            </a>
          </p>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
