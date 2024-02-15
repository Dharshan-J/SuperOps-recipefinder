import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import SearchBar from './components/SearchBar';
import RecipeDetail from './components/RecipeDetail';
import WishList from './components/WishList'
import { WishlistProvider } from './components/WishListContext';
import HeaderComponent from './components/HeaderComponent';
import styled from 'styled-components';

const Layout = styled.div`
display: flex;
flex-direction: column;
height: 100vh;`

function App() {

  return (
    <ChakraProvider>
    <Router>
      <Layout>
        <WishlistProvider>
          <HeaderComponent></HeaderComponent>
        <Routes>
          <Route
            path="/"
            element={<SearchBar  />}
          />
          <Route
            path="/recipe/:id"
            element={<RecipeDetail  />}
          />
          <Route
            path="/wishlist"
            element={<WishList />}
          />

        </Routes>
        </WishlistProvider>
      </Layout>
    </Router>
    </ChakraProvider>
  );
}

export default App;
