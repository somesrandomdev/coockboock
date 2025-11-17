import { generateClient } from "aws-amplify/api";
import type { Schema } from "../amplify/data/resource";
import { createAIHooks } from "@aws-amplify/ui-react-ai";

let client: ReturnType<typeof generateClient<Schema>> | null = null;
let hooks: any = null;

function getClient() {
  if (!client) {
    client = generateClient<Schema>({ authMode: "userPool" });
  }
  return client;
}

function getHooks() {
  if (!hooks) {
    hooks = createAIHooks(getClient());
  }
  return hooks!;
}

export const useAIConversation = (id: "chat") => getHooks().useAIConversation(id);
export const useAIGeneration = (id: "generateRecipe") => getHooks().useAIGeneration(id);