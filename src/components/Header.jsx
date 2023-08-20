import React from 'react';
import { HStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import mainLogo from '../assets/Tt.png';

const Header = () => {
  function scroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <HStack
      opacity={0.8}
      w={'100%'}
      bgColor={'purple.400'}
      justifyContent={'center'}
      position={'sticky'}
      top={0}
      zIndex={999}
    >
      <Link to={'/'}>
        <Image
          onClick={scroll}
          src={mainLogo}
          w={[200, 350]}
          h={20}
          objectFit={'cover'}
        />
      </Link>
    </HStack>
  );
};

export default Header;
