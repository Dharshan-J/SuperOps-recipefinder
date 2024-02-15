import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';

const ListWrapper = styled.div`
  height: 100%;
  margin-top: 40px;
  overflow: auto;
`;

const SpinnerWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecipeCardWrapper = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); //using grid for responsive page where it takes the extra space
  gap: 20px;
  justify-items: start;
`;

const EmptyStateMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #888;
`;

const RecipeList = ({ recipes, loading }) => {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    if (recipes) {
      const mappedRecipes = recipes.map(data => {
        const { recipe, _links } = data || {};
        const { self: { href } } = _links;
        const parts = href.split('/');
        const lastPart = parts[parts.length - 1];
        const id = lastPart.split('?')[0];
        return { ...recipe, id };
      });
      setRecipeList(mappedRecipes);
    }
  }, [recipes]);

  return (
    <ListWrapper>
      {loading ? (
        <SpinnerWrapper>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#f05'
            size='xl'
          />
        </SpinnerWrapper>
      ) : (
        recipeList.length > 0 ? (
          <RecipeCardWrapper>
            {recipeList.map((data) => (
              <RecipeCard key={data.id} recipe={data} />
            ))}
          </RecipeCardWrapper>
        ) : (
          <EmptyStateMessage>No recipes available</EmptyStateMessage>
        )
      )}
    </ListWrapper>
  );
};

export default RecipeList;
