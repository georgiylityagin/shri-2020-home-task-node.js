import React from 'react';
import styled from 'styled-components';

type titleProps = {
  isMobile: boolean,
  children: string
  isRepoName?: boolean,
  id?: string,
};

const StyledTitle = styled.h1`
  margin: 0;
  font-size: ${(props: titleProps) =>
    props.isMobile ? 'var(--font-size-l)' : 'var(--font-size-xl)'};
  font-weight: 500;
  line-height: ${(props) =>
    props.isMobile ? 'var(--line-height-l)' : 'var(--line-height-xl)'};
  letter-spacing: var(--letter-spacing-m);
  color: ${(props) =>
    props.isRepoName ? 'var(--text-color-default)' : 'var(--text-color-muted)'};
`;

export const Title: React.FC<titleProps> = ({ id, isMobile, isRepoName, children }) => {
  return (
    <StyledTitle id={id} isMobile={isMobile} isRepoName={isRepoName}>
      {children}
    </StyledTitle>
  );
};
