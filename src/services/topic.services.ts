import { createFetcher } from "@/utils/fetchData";

const fetcher = createFetcher(
  process.env.NEXT_TODOS_API ?? "https://y9x4xk16fe.execute-api.us-east-1.amazonaws.com/v1"
);

export const TOPIC_ENDPOINT = "/topic";

type Topic = {
  id: string;
  name: string;
  tasks: string[];
};

export const getTopic = async ({ topicId }: { topicId: string }) => {
  const response = await fetcher<Topic>(`${TOPIC_ENDPOINT}/${topicId}`);
  return response;
};

export const deleteTopic = async ({ topicId }: { topicId: string }) => {
  const response = await fetcher<Topic>(`${TOPIC_ENDPOINT}/${topicId}`, {
    method: "DELETE",
  });

  return response;
};
