import React from "react";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/provider/AuthProvider";
import { ThemeProvider } from "react-native-rapi-ui";
// import { InMemoryCache, ApolloProvider } from "@apollo/client";
// import ApolloClient from "apollo-boost";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default function App() {
  const images = [
    require("./assets/images/login.png"),
    require("./assets/images/register.png"),
    require("./assets/images/forget.png"),
  ];

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme="dark" images={images}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
