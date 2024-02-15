import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  Image, Text, Tag, ListItem, List, ListIcon, Spinner, 
  Stat, StatLabel, StatNumber, Link 
} from '@chakra-ui/react';
import { CheckCircleIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import WishlistButton from './WishlistButton';

const DetailBanner = styled.div`
  border: 1px solid #170426;
  border-radius: 20px;
  background-color: #f3f3f3;
  padding: 20px 40px;
  margin: 20px 40px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const SpinnerWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecipeDetails = styled.div`
  display: flex;
  gap: 20px;
`;

const DetailsContainer = styled.div`
  border: 1px solid #170426;
  border-radius: 20px;
  background-color: #f3f3f3;
  padding: 20px;
  margin: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: scroll;
`;

const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 400px;
  overflow: scroll;
`;

const StatGroupContainer = styled.div`
  display: flex;
  gap: 30px;
  width: 25%;
`;

const RecipeDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipeDetail, setRecipeDetail] = useState({});

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}`, {
          params: {
            app_id: '55860e8a',
            app_key: '2c4615d71298e5457d4ca5d1ca38df8d',
            type: 'public',
          },
          paramsSerializer: params => {
            return Object.entries(params)
              .map(([key, value]) => {
                if (Array.isArray(value)) {
                  return value.map(val => `${key}=${encodeURIComponent(val)}`).join('&');
                }
                return `${key}=${encodeURIComponent(value)}`;
              })
              .join('&');
          },
        });
        setRecipeDetail({ ...response.data.recipe, id });
      } catch (error) {
        console.error('Error fetching recipe detail:', error);
      }
      setLoading(false);
    };

    fetchRecipeDetail();
  }, [id]);

  const getCalories = (data) => {
    return `${Math.ceil(data) / 10} kcal`;
  };

  const renderIngredientLines = () => (
    <IngredientList>
      <Text>Ingredients :</Text>
      <List>
        {recipeDetail.ingredientLines.map((list, index) => (
          <ListItem key={index}>
            <ListIcon as={CheckCircleIcon} color='green.500' />
            {list}
          </ListItem>
        ))}
      </List>
    </IngredientList>
  );

  const renderTags = () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {recipeDetail.tags && recipeDetail.tags.length > 0 && (
        <>
          <Text>Tags :</Text>
          {recipeDetail.tags.map((tag, index) => (
            <Tag key={index} variant='subtle' colorScheme='cyan'>
              {tag}
            </Tag>
          ))}
        </>
      )}
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
        <>
          <DetailBanner>
            <RecipeDetails>
              <Image borderRadius='full' boxSize='100px' src={recipeDetail.image} alt={recipeDetail.label} />
              <div>
                <Text fontSize='xs'>{`#${id}`}</Text>
                <Text fontSize='4xl' as='b'>
                  {recipeDetail.label}
                </Text>
              </div>
            </RecipeDetails>
            <WishlistButton recipe={recipeDetail} id={id} />
          </DetailBanner>

          <DetailsContainer>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
              {renderIngredientLines()}
              <StatGroupContainer>
                <Stat>
                  <StatLabel>Calories</StatLabel>
                  <StatNumber>{getCalories(recipeDetail.calories)}</StatNumber>
                </Stat>
                <Link href={recipeDetail.url} color='blue.500' isExternal>
                  Go To Instruction <ExternalLinkIcon mx='2px' />
                </Link>
              </StatGroupContainer>
            </div>
            {renderTags()}
          </DetailsContainer>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
