import React from 'react';
import { Card, CardBody, Image, Text, Heading, Tag } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import WishlistButton from './WishlistButton';

const RecipeCard = ({ recipe }) => {
    const { label, image, id } = recipe || {};
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/recipe/${id}`);
    };

    const getCalories = (data) => {
        return `${Math.ceil(data) / 10}`;
    };

    return (
        <Card height={300} width={300} onClick={handleCardClick} _hover={{
            cursor: 'pointer',
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.4)',
            transition: 'box-shadow 0.3s ease',
        }}>
            <CardBody>
                <Image
                    height={140}
                    width={300}
                    src={image}
                    alt={label}
                    borderRadius='lg'
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <Heading size='md' isTruncated>{label}</Heading>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Text>Calories</Text>
                        <Tag variant='subtle' colorScheme='cyan' size='sm'>{getCalories(recipe.calories)}</Tag>
                        <Text>|</Text>
                        <Text>Ingredients</Text>
                        <Tag variant='subtle' colorScheme='cyan' size='sm'>{recipe.ingredients.length}</Tag>
                    </div>
                </div>
            </CardBody>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', padding: '10px 20px' }}>
                <WishlistButton recipe={recipe} id={id} />
            </div>
        </Card>
    );
};

export default RecipeCard;
