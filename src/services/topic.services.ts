import { createFetcher } from "@/utils/fetchData";

const fetcher = createFetcher(
  process.env.NEXT_TODOS_API ?? "https://y9x4xk16fe.execute-api.us-east-1.amazonaws.com"
);

export const poolTaskEndpoint = "/topics";

type Topic = {
  id: string;
  name: string;
  tasks: string[];
};

export const getTopics = async ({ userId }: { userId: string }) => {
  const response = await fetcher<Topic[]>(`${poolTaskEndpoint}/${userId}`);
  return response;
};

export const createTopic = async ({ name }: { name: string }) => {
  const response = await fetcher<Topic>(poolTaskEndpoint, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
