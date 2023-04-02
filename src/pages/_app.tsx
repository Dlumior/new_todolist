import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TopicProvider } from "@/hooks/useTopic";
import { TaskProvider } from "@/hooks/useTask";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TopicProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </TopicProvider>
  );
}
