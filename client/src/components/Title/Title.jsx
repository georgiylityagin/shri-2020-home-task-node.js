import React from 'react'
import styled from 'styled-components';

const StyledTitle = styled.h1`
  margin: 0;
  font-size: ${props => props.isMobile ? 'var(--font-size-l)' : 'var(--font-size-xl)'};
  font-weight: 500;
  line-height: ${props => props.isMobile ? 'var(--line-height-l)' : 'var(--line-height-xl)'};
  letter-spacing: var(--letter-spacing-m);
  color: var(--text-color-muted);
`;

export const Title = ({isMobile, children}) => {
  return (
    <StyledTitle isMobile={isMobile}>
      {children}
    </StyledTitle>
  )
}
