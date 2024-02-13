import React from 'react';
import RecipeCard from './RecipeCard'
import styled from 'styled-components';
import { Spinner} from '@chakra-ui/react'

const ListWrapper = styled.div`
height: 100%;
border: 1px solid #E2E8F0;
margin: 20px;
overflow: auto;`

const SpinnerWrapper = styled.div`
height: 100%;
display:flex;
align-items: center;
justify-content: center`

const RecipeCardWrapper = styled.div`
padding:20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;
  
`;


const RecipeList = ({ recipes,loading }) => {
  return (
    <ListWrapper>
    {loading ? (
      <SpinnerWrapper>
      <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
</SpinnerWrapper>
    ): <RecipeCardWrapper>
    {recipes.map((data, index) => (
     <RecipeCard key={index} recipe={data.recipe} ></RecipeCard>
    ))}
</RecipeCardWrapper>}
    
    </ListWrapper>
  );
};

export default RecipeList;
