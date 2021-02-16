import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const MenuToggle = (props: any) => {
  const { toggle, isOpen } = props;

  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? (<CloseIcon />) : (<HamburgerIcon />)}
    </Box>
  );
};

export default MenuToggle;
