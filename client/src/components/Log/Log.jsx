import React from 'react';
import styled from 'styled-components';

const LogStyled = styled.pre`
  padding: var(--space-xxxs) var(--space-xs);
  margin-bottom: var(--space-xl);
  overflow-x: auto;
  background-color: var(--bg-log);
  font-family: monospace;
  font-size: var(--font-size-xs);
  line-height: var(--line-height-m);

  ${props => props.isMobile && 'margin-left: calc(0px - var(--content-mobile-indent));'}
`;

export const Log = ({ children, isMobile }) => {
  return (
    <LogStyled isMobile={isMobile}>
        { children }
    </LogStyled>
  )
}
