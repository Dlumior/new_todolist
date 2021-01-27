import { Box } from '@chakra-ui/react';
import AddButton from '../../lowComponents/ListsSide/AddButton';
import TodoCards from '../../lowComponents/ListsSide/TodoCards';

const ListsSide = () => (
  <Box display="flex">
    <Box height="100vh" w={3 / 5} bg="quaternary.800">
      <TodoCards />
    </Box>
    <Box height="100vh" w={2 / 5} bg="quaternary.100">
      <AddButton />
    </Box>
  </Box>
);

export default ListsSide;
