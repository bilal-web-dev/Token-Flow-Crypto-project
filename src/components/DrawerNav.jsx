import React from 'react';
import { VStack, useDisclosure, Image, Heading, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { FcCurrencyExchange } from 'react-icons/fc';
import { SiBitcoin } from 'react-icons/si';
import { RiMenuFill } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import logo from '../assets/mylogo.png';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function DrawerNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        size={'lg'}
        color={'white'}
        p={'0'}
        w={14}
        h={'40px'}
        ref={btnRef}
        colorScheme="purple"
        onClick={onOpen}
        border={'2px solid white'}
        opacity={0.8}
        position={'fixed'}
        top={5}
        left={[5, 5, 5, 5, 350]}
        zIndex={'overlay'}
        css={{
          '&:hover': {
            backgroundColor: 'purple.700',
          },
        }}
        className="animated-element"
        boxShadow={'dark-lg'}
      >
        <RiMenuFill size={'20'} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'xs'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'}>
            <Heading color={'purple.500'} mt={4} fontFamily={'Caveat'}>
              TokenFlow.Pk
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <VStack py={16}>
              <Link to="/">
                <Button
                  size={'lg'}
                  variant={'ghost'}
                  colorScheme="purple"
                  onClick={onClose}
                  py={4}
                  my={4}
                  leftIcon={<AiFillHome />}
                >
                  Home
                </Button>
              </Link>

              <Link to={'/exchanges'}>
                <Button
                  size={'lg'}
                  variant={'ghost'}
                  colorScheme="purple"
                  onClick={onClose}
                  py={4}
                  my={4}
                  leftIcon={<FcCurrencyExchange />}
                >
                  Exchanges
                </Button>
              </Link>

              <Link to="/coins">
                <Button
                  size={'lg'}
                  variant={'ghost'}
                  colorScheme="purple"
                  onClick={onClose}
                  py={4}
                  my={4}
                  leftIcon={<SiBitcoin />}
                >
                  Coins
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  size={'lg'}
                  variant={'ghost'}
                  colorScheme="purple"
                  onClick={onClose}
                  py={4}
                  my={4}
                  leftIcon={<AiOutlineSearch />}
                >
                  Search
                </Button>
              </Link>
            </VStack>
          </DrawerBody>

          <DrawerFooter
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-end'}
          >
            <a
              style={{
                height: '45%',
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
              target="_blank"
              href="https://www.linkedin.com/in/bilal-webdev/"
            >
              <Image
                src={logo}
                alt="logo"
                w={'70%'}
                height={'60%'}
                objectFit={'cover'}
              />
            </a>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerNav;
