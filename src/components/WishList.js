import React from "react";
import RecipeCard from "./RecipeCard";
import { useWishlist } from "./WishListContext";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import {  Link 
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const RecipeCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 40px;
  height: 100%;
`;

const EmptyWishlistMessage = styled.div`
  margin: auto;
`;

const WishList = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <>
    <Link color="teal.500" onClick={goBack} margin="5">
        <ArrowBackIcon /> Back
      </Link>
    <RecipeCardWrapper>

      {wishlist.length === 0 ? (
        <EmptyWishlistMessage>Your WishList is currently empty.</EmptyWishlistMessage>
      ) : (
        wishlist.map((data) => (
          <RecipeCard key={data.id} recipe={data} />
        ))
      )}
    </RecipeCardWrapper>
    </>
  );
};

export default WishList;
