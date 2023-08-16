import { createFetcher } from "@/utils/fetchData";

const fetcher = createFetcher(
  process.env.NEXT_TODOS_API ?? "https://y9x4xk16fe.execute-api.us-east-1.amazonaws.com/v1"
);

export const SEND_MAIL_ENDPOINT = "/send-mail";

export const sendMail = async ({ topicId }: { topicId: string }) => {
  const response = await fetcher(`${SEND_MAIL_ENDPOINT}/${topicId}`);
  return response;
};
