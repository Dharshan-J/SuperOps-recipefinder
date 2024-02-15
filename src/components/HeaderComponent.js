import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyLogo from '../assets/svgviewer-output.png';
import RecipeFinder from '../assets/recipe.png';

const HeaderContainer = styled.div`
  background-color: rgb(255, 228, 224);
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 132px;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 134px;
`;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOnWishlistPage, setIsOnWishlistPage] = useState(location.pathname.includes('/wishlist'));

  useEffect(() => {
    setIsOnWishlistPage(location.pathname.includes('/wishlist'));
  }, [location.pathname]);
  
  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  return (
    <HeaderContainer>
      <LogoImage src={MyLogo} alt="My PNG" />
      <LogoImage src={RecipeFinder} alt="My PNG" />
      <div>
        {!isOnWishlistPage && (
          <Button
            size='sm'
            backgroundColor='#f05'
            borderRadius='5px'
            boxShadow='0 0 0 1px #170426'
            color='#fff'
            _hover={{
              boxShadow: '0 0 0 1px #170426,0 6px 0 1px #170426!important',
              color: '#fff',
              transform: 'translateY(-6px)'
            }}
            onClick={handleWishlistClick}
          >
            WishList
          </Button>
        )}
      </div>
    </HeaderContainer>
  );
};

export default HeaderComponent;
