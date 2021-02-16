import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  width: string[];
}

const Card = (props: Props) => {
  const { children, width } = props;
  return (
    <Box
      d="flex"
      alignContent="center"
      justifyContent="center"
      p={3}
      borderWidth="1px"
      borderRadius="lg"
      width={width}
      bgColor="white"
      zIndex="docked"
    >
      {children}
    </Box>
  );
};

export default Card;
