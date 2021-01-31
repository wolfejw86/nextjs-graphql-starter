import {
  Box,
  Flex,
  HStack,
  Link as CLink,
  Text,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useUserQuery } from '@/graphql/user/UserQuery.generated';

import { SkeletonList } from '../SkeletonList';

const Sidebar: React.FC = () => {
  const { data, loading } = useUserQuery();
  const background = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      w={['full', '256px']}
      borderRight="1px"
      borderRightColor={background}
      h="full"
      pt={5}
    >
      <HStack justifyContent="space-between" py={5} px={5}>
        <Text fontWeight="semibold" fontSize="md">
          {loading ? <Spinner /> : `${data?.user.email}'s Sidepanel`}
        </Text>
      </HStack>
      {loading && <SkeletonList horizontalPadding={5} />}
      {!loading && (
        <Flex direction="column">
          <Text
            background={'blue.900'}
            isTruncated
            maxWidth="100%"
            py={1}
            px={5}
          >
            <CLink as={Link} href={`#`}>
              Link 1
            </CLink>
          </Text>
          <Text
            background={'transparent'}
            isTruncated
            maxWidth="100%"
            py={1}
            px={5}
          >
            <CLink as={Link} href={`#`}>
              Link 1
            </CLink>
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Sidebar;
