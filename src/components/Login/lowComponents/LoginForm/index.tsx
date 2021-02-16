import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box, Button, Checkbox, Flex, Input, InputGroup, InputRightElement, Spacer, Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import Card from '../../../shared/Card';

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Card width={['18rem', '23rem', '25rem']}>
      <form>
        <Box
          d="flex"
          alignContent="center"
          justifyContent="center"
          textAlign="center"
          flexDirection="column"
        >
          <Text fontWeight="black" fontSize={24} mb={2}>
            Welcome back!
          </Text>
          <Input
            m={1}
            w={['15rem', '20rem', '20rem']}
            size="md"
            pr="1rem"
            type="text"
            placeholder="Username"
          />
          <InputGroup size="md" m={1}>
            <Input
              pr="1rem"
              w={['15rem', '20rem', '20rem']}
              size="md"
              type={show ? 'text' : 'password'}
              placeholder="Password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex d="flex" my={5} alignItems="space-around" justifyItems="flex-end">
            <Checkbox colorScheme="primary">
              Keep me logged in
            </Checkbox>
            <Spacer />
            <Text>
              Forgot password
            </Text>
          </Flex>
          <Button colorScheme="primary" mb={3}>
            Login
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default LoginForm;
