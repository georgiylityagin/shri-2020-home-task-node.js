import React from 'react'
import styled from 'styled-components';

const ContentWrapper = styled.main`
  padding: 0 var(--content-mobile-indent);
  flex: 1;
  display: ${props => props.centeredV || props.centeredH ? 'flex' : 'block'};;
  align-items: ${props => props.centeredV ? 'center' : 'initial'};
  justify-content: ${props => props.centeredH ? 'center' : 'initial'};
  margin-bottom: var(--space-m);
`;

const Container = styled.div`
  max-width: var(--content-max-width);
  margin: auto;
`;

export const Content = ({centeredV, centeredH, children}) => {
  return (
    <ContentWrapper centeredV={centeredV} centeredH={centeredH}>
      <Container>
       {children}
      </Container>
    </ContentWrapper>
  )
}
