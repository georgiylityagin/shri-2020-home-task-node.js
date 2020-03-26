import React from 'react'
import styled from 'styled-components';

const ContentWrapper = styled.main`
  padding: 0 var(--content-mobile-indent);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = (props) => {
  return (
    <ContentWrapper>
      {props.children}
    </ContentWrapper>
  )
}
