import React from 'react'
import styled from 'styled-components';

const StyledTitle = styled.h1`
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: 500;
  line-height: var(--line-height-xl);
  letter-spacing: var(--letter-spacing-m);
  color: var(--text-color-muted);
`;

export const Title = ({children}) => {
  return (
    <StyledTitle>
      {children}
    </StyledTitle>
  )
}
