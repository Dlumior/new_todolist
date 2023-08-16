import { createFetcher } from "@/utils/fetchData";
import axios from "axios";

const fetcher = createFetcher(
  process.env.NEXT_TODOS_API ?? "https://y9x4xk16fe.execute-api.us-east-1.amazonaws.com/v1"
);

export const poolTaskEndpoint = "/topics";

type Topic = {
  id: string;
  name: string;
  tasks: string[];
};

const headers = {
  "auth-token": "token",
  Origin: "http://localhost:3000",
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br",
  "Content-Type": "application/json",
  "Sec-Fetch-Site": "cors",
};

export const getTopics = async ({ userId, token }: { userId: string; token: any }) => {
  const response = await fetcher<Topic[]>(`${poolTaskEndpoint}/${userId}`, {
    method: "GET",
  });

  return response;
};

export const createTopic = async ({ name, user_id }: { name: string; user_id: string }) => {
  const response = await fetcher<Topic>(`${poolTaskEndpoint}/${user_id}`, {
    method: "POST",
    body: JSON.stringify({ name: name, user_id: user_id, tasks: [] }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
