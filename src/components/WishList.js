import React from "react";
import RecipeCard from "./RecipeCard";
import { useWishlist } from "./WishListContext";
import styled from "styled-components";

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

  return (
    <RecipeCardWrapper>
      {wishlist.length === 0 ? (
        <EmptyWishlistMessage>Your WishList is currently empty.</EmptyWishlistMessage>
      ) : (
        wishlist.map((data) => (
          <RecipeCard key={data.id} recipe={data} />
        ))
      )}
    </RecipeCardWrapper>
  );
};

export default WishList;
