import React from 'react';
import { Button } from '@chakra-ui/react';
import { useWishlist } from './WishListContext';

const WishlistButton = ({ recipe, id }) => {
  const { addToWishlist, wishlist, removeFromWishlist } = useWishlist();
  const isSelected = wishlist.some(item => item.id === id);

  const handleWishlist = (event) => {
    event.stopPropagation();
    if (isSelected) {
      removeFromWishlist(id);
    } else {
      addToWishlist(recipe);
    }
  };

  const wishListText = isSelected ? 'Remove from Wishlist' : 'Add To Wishlist';

  return (
    <Button
      onClick={handleWishlist}
      size='sm'
      backgroundColor={isSelected ? 'transparent' : '#f05'}
      borderRadius='5px'
      boxShadow='0 0 0 1px #170426'
      color={isSelected ? '#170426' : '#fff'}
      _hover={{
        boxShadow: '0 0 0 1px #170426,0 6px 0 1px #170426!important',
        color: isSelected ? '#170426' : '#fff',
        transform: 'translateY(-6px)'
      }}
    >
      {wishListText}
    </Button>
  );
};

export default WishlistButton;
