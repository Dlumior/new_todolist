import { useState } from 'react';
import Logo from './Logo';
import MenuLinks from './MenuLinks';
import NavbarContainer from './NavbarContainer';
import MenuToggle from './ToggleMenu';

const Navbar = (props: any) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavbarContainer {...props}>
      <Logo
        w="100px"
        color={['white', 'white', 'primary.500', 'primary.500']}
        brandName="ELYST"
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavbarContainer>
  );
};

export default Navbar;
