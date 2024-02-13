import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import SearchBar from './components/SearchBar';
import RecipeDetail from './components/RecipeDetail';
import styled from 'styled-components';

const Layout = styled.div`
height: 100vh;`

function App() {

  return (
    <ChakraProvider>
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<SearchBar  />}
          />
          <Route
            path="/recipe/:id"
            element={<RecipeDetail  />}
          />

        </Routes>
      </Layout>
    </Router>
    </ChakraProvider>
  );
}

export default App;
