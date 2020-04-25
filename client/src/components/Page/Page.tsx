import React, { ReactChildren } from 'react';
import styled from 'styled-components';

type PageProps = {
  id: string,
  children: ReactChildren
}

const PageStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Page: React.FC<PageProps> = ({ id, children }) => {
  return (
    <PageStyled id={id}>
      {children}
    </PageStyled>
  );
};