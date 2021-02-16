import { Box, Text } from '@chakra-ui/react';

const Logo = (props: any) => {
  const { brandName, ...rest } = props;

  return (
    <Box {...rest}>
      <Text fontSize="lg" fontWeight="bold">
        {brandName}
      </Text>
    </Box>
  );
};

export default Logo;
