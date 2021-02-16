import { Flex, forwardRef } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const MotionBox = motion.custom(
  forwardRef<any, any>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
    );
    return <Flex ref={ref} {...chakraProps} />;
  }),
);

const NavbarContainer = (props: any) => {
  const { children, ...rest } = props;

  return (
    <MotionBox
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={4}
      bg={['primary.500', 'primary.500', 'quaternary.800', 'quaternary.800']}
      color={['white', 'white', 'white', 'white']}
      position="sticky"
      zIndex="docked"
      {...rest}
    >
      {children}
    </MotionBox>
  );
};

export default NavbarContainer;
