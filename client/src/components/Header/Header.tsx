import React, { ReactChildren } from 'react';
import styled from 'styled-components';

type HeaderProps = {
  isMobile: boolean,
  children: ReactChildren
}

const StyledHeader = styled.header`
  padding: 0 var(--content-mobile-indent);
  margin-bottom: var(--space-xxxs);
`;

const HeaderContent = styled.div`
  max-width: var(--content-max-width);
  margin: auto;
  padding: ${(props: HeaderProps) =>
      props.isMobile ? 'var(--space-xs)' : 'var(--space-xxs)'}
    0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header: React.FC<HeaderProps> = ({ isMobile, children }) => {
  return (
    <StyledHeader>
      <HeaderContent isMobile={isMobile}>{children}</HeaderContent>
    </StyledHeader>
  );
};
