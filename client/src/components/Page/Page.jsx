import React from 'react';
import styled from 'styled-components';

const PageStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Page = ({ id, children }) => {
  return (
    <PageStyled id={id}>
      {children}
    </PageStyled>
  );
};