import { Box } from '@chakra-ui/react';
import Navbar from '../components/shared/Navbar';
import ListsSide from '../components/TodoList/highComponents/ListsSide';

const Index = () => (
  <Box height="100vh">
    <Navbar />
    <ListsSide />
  </Box>
);

export default Index;
