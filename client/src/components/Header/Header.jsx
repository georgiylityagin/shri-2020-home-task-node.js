import React from 'react'
import styled from 'styled-components';
import { Title } from '../Title/Title';

const StyledHeader = styled.header`
  padding: 0 var(--content-mobile-indent);
`;

const HeaderContent = styled.div`
  max-width: var(--content-max-width);
  margin: auto;
  padding: var(--space-xxs) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = ({title, children}) => {
  return (
    <StyledHeader>
      <HeaderContent>
        <Title>{title}</Title>
        {children}
      </HeaderContent>
    </StyledHeader>
  )
}
