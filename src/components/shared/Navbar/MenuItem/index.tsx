import { Link, Text } from '@chakra-ui/react';

const MenuItem = (props: any) => {
  const {
    children, isLast, to = '/', ...rest
  } = props;

  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
