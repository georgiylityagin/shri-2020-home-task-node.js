import React from 'react'
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Title } from '../Title/Title';
import { mobileMaxWidth } from '../../breakpoints';

const StyledHeader = styled.header`
  padding: 0 var(--content-mobile-indent);
`;

const HeaderContent = styled.div`
  max-width: var(--content-max-width);
  margin: auto;
  padding: ${props => props.isMobile ? 'var(--space-xs)' : 'var(--space-xxs)'} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = ({title, children}) => {
  const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });

  return (
    <StyledHeader>
      <HeaderContent isMobile={isMobile}>
        <Title isMobile={isMobile}>{title}</Title>
        {children}
      </HeaderContent>
    </StyledHeader>
  )
}
