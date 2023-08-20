import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <Alert
      status="error"
      position={'fixed'}
      top={['40%', '20%']}
      left={'50%'}
      transform={'translateX(-50%)'}
      w={['90%', 'container.lg']}
      height={['10vh', '20vh']}
      borderRadius={'lg'}
      shadow={'lg'}
      justifyContent={'center'}
    >
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default ErrorComponent;
