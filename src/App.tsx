import * as React from 'react';
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { AIConversation } from '@aws-amplify/ui-react-ai';
import { Flex, TextAreaField, Text, View, Button, Card, Heading } from "@aws-amplify/ui-react"
import { useAIConversation, useAIGeneration } from "./client";

function AppContent() {
  const { user, signOut } = useAuthenticator();
  const [description, setDescription] = React.useState("");
  const [{ data, isLoading }, generateRecipe] =
    useAIGeneration("generateRecipe");

  const [
    {
      data: { messages },
      isLoading: chatLoading,
    },
    handleSendMessage,
  ] = useAIConversation('chat');

  const handleClick = async () => {
    generateRecipe({ description });
  };

  if (!user) {
    return <div>Please sign in to use the AI features.</div>;
  }

  return (
    <Flex direction="column" minHeight="100vh" backgroundColor="background.primary">
      {/* Header */}
      <div style={{ padding: '1rem 2rem', backgroundColor: 'var(--amplify-colors-background-secondary)', borderBottom: '1px solid var(--amplify-colors-border-primary)' }}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex direction="column">
            <Text fontSize="2rem" fontWeight="bold" color="font.primary">
              AI-Powered <Text as="span" color="brand.primary">Recipe Generator</Text>
            </Text>
            <Text color="font.secondary">
              Create delicious recipes with AI assistance
            </Text>
          </Flex>
          <Button onClick={signOut} variation="destructive">
            Sign Out
          </Button>
        </Flex>
      </div>

      {/* Main Content */}
      <Flex direction="column" flex="1" padding="2rem" gap="2rem">
        {/* Recipe Generation Section */}
        <Card>
          <Heading level={3}>Generate Recipe</Heading>
          <Text marginBottom="1rem">
            Describe the type of recipe you want, including ingredients, cuisine, or dietary preferences.
          </Text>
          <Flex direction="column" gap="1rem">
            <TextAreaField
              label="Recipe Description"
              placeholder="e.g., A healthy vegetarian pasta dish with tomatoes and basil"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <Button
              onClick={handleClick}
              isLoading={isLoading}
              loadingText="Generating recipe..."
              variation="primary"
            >
              Generate Recipe
            </Button>
          </Flex>

          {data && (
            <Card marginTop="1rem" variation="outlined">
              <Heading level={4}>{data.name}</Heading>
              <Text fontWeight="bold" marginBottom="0.5rem">Ingredients:</Text>
              <View as="ul" margin="0 0 1rem 0" paddingLeft="1.5rem">
                {(data as any)?.ingredients?.map((ingredient: string, index: number) => (
                  <View as="li" key={index} marginBottom="0.25rem">
                    {ingredient}
                  </View>
                ))}
              </View>
              <Text fontWeight="bold" marginBottom="0.5rem">Instructions:</Text>
              <Text whiteSpace="pre-wrap">{data.instructions}</Text>
            </Card>
          )}
        </Card>

        {/* AI Chat Section */}
        <Card>
          <Heading level={3}>AI Assistant Chat</Heading>
          <Text marginBottom="1rem">
            Chat with our AI assistant for cooking tips, recipe modifications, or any questions.
          </Text>
          <View height="400px">
            <AIConversation
              messages={messages}
              isLoading={chatLoading}
              handleSendMessage={handleSendMessage}
            />
          </View>
        </Card>
      </Flex>
    </Flex>
  );
}

function App() {
  return (
    <Authenticator>
      <AppContent />
    </Authenticator>
  );
}

export default App;
