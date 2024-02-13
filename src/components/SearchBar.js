import React, { useState } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import { Input, Button } from '@chakra-ui/react';
import styled from 'styled-components';

const Header = styled.div`
height: 40px;`

const Footer = styled.div`
height: 20px;`

const HomeContainer = styled.div`
height: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    let params = {
      q: query,
      app_id: '55860e8a',
      app_key: '2c4615d71298e5457d4ca5d1ca38df8d',
      field: ['uri', 'label', 'image', 'calories', 'yield', 'source', 'ingredientLines', 'ingredients', 'id'],
      type: 'public'
    };
    try {
      setLoading(true)
      const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
        params,
        paramsSerializer: params => {
          return Object.entries(params)
            .map(([key, value]) => {
              if (Array.isArray(value)) {
                return value.map(val => `${key}=${encodeURIComponent(val)}`).join('&');
              }
              return `${key}=${encodeURIComponent(value)}`;
            })
            .join('&');
        }
      });
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false)
  };

  return (
    <HomeContainer>
      <Header></Header>
      <SearchBarContainer>
        <Input
          htmlSize={4}
          width='60'
          placeholder="Search for recipes..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button onClick={searchRecipes}>Search</Button>
      </SearchBarContainer>
      <RecipeList recipes={recipes} loading={loading} style={{ flexGrow: '1' }} />
      <Footer></Footer>
    </HomeContainer>
  );
};

export default SearchBar;
