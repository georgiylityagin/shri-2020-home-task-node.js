import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.isMobile && !props.headerButtons ? 'column' : 'row'};

  & > Button {
    margin-bottom: ${(props) =>
      props.isMobile && !props.headerButtons ? 'var(--space-xs)' : 0};

    &:first-child {
      margin-right: ${(props) =>
        props.isMobile && !props.headerButtons ? 0 : 'var(--space-xxxs)'};
    }
  }
`;

export const ButtonGroup = ({ isMobile, children, headerButtons }) => {
  return (
    <Wrapper isMobile={isMobile} headerButtons={headerButtons}>
      {children}
    </Wrapper>
  );
};
