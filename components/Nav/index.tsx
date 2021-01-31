import { Text, Flex, Spacer, Link, useColorModeValue } from '@chakra-ui/react';
import { Fragment } from 'react';
import NextLink from 'next/link';

import ColorModeSwitch from '../ColorModeSwitch';

const Nav: React.FC = () => {
  const background = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      as="header"
      align="center"
      borderBottom="1px"
      borderBottomColor={background}
      h="64px"
      px={5}
    >
      <NextLink href="/">
        <Link
          _hover={{ textDecoration: 'none' }}
          fontWeight="semibold"
          fontSize="lg"
        >
          My App
        </Link>
      </NextLink>
      <Spacer />
      <Fragment>
        <Text display={['none', 'block']} fontSize="sm">
          Signed in as: test@gmail.com
        </Text>
        <ColorModeSwitch />
      </Fragment>
    </Flex>
  );
};

export default Nav;
