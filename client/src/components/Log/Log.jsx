import React from 'react';
import styled from 'styled-components';
import Convert from 'ansi-to-html';

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

const convert = new Convert({ fg: '#000', bg: '#000' });

export const Log = ({ children, isMobile }) => {
  return (
    <LogStyled isMobile={isMobile}>
        { convert.toHtml(children) }
    </LogStyled>
  )
}
