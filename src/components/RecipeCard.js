import React from 'react';
import { Card ,CardBody,Image,Stack,Text,Heading} from '@chakra-ui/react'
import styled from 'styled-components';

const RecipeCard = ({recipe}) => {
    const {label,image,ingredients} = recipe || {}
    return (
        <Card height={300} width={300} margin="auto">
            <CardBody>
            <Image
           height={150}
           width={300}
      src={image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    </CardBody>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>

        </Card>
    )
}

export default RecipeCard;