import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './images.module.css';

interface Props {
  children: ReactNode
}

const Background = (props: Props) => {
  const { children } = props;
  return (
    <Box d="flex" alignItems="center" justifyContent="center" bg="quaternary.800" height="93.3vh" position="relative">
      <Box zIndex={0}>
        <Box className={styles.img1}>
          <Image
            src="/d1.svg"
            alt="degraded purple"
            layout="intrinsic"
            width={700}
            height={475}
          />
        </Box>
        <Box className={styles.img2}>
          <Image
            src="/d2.svg"
            alt="degraded green"
            layout="intrinsic"
            width={700}
            height={475}
            quality={100}
          />
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default Background;
