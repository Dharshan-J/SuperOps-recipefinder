import React, {  useState } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import { Input, Button } from '@chakra-ui/react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  overflow: hidden;
  padding: 20px 100px;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    padding: 20px 10px;   

  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 768px) {
   flex-direction: column; 
  }
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
      field: ['uri', 'label', 'image', 'calories', 'yield', 'source', 'ingredients'],
      type: 'public',
    };
    try {
      setLoading(true);
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
    setLoading(false);
  }

  const handleSearch = () => {
    searchRecipes();
  };

  return (
    <HomeContainer>
      <SearchBarContainer>
        <Input
          htmlSize={4}
          width='60'
          placeholder="Search for recipes..."
          border="1px solid #170426"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          backgroundColor='#f05'
          color="#fff"
          borderRadius="5px"
          boxShadow="0 0 0 1px #170426"
          _hover={{
            boxShadow: '0 0 0 1px #170426, 0 6px 0 1px #170426',
            color: '#fff!important',
            transform: 'translateY(-6px)'
          }}
        >
          Search
        </Button>
      </SearchBarContainer>
      <RecipeList recipes={recipes} loading={loading} style={{ flexGrow: '1' }} />
    </HomeContainer>
  );
};

export default SearchBar;
