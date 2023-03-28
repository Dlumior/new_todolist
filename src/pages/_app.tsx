import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { TopicProvider } from "@/hooks/useTopic";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <TopicProvider>
        <Component {...pageProps} />
      </TopicProvider>
    </ChakraProvider>
  );
}
