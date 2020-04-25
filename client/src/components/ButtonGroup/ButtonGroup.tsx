import React, { FunctionComponentElement } from 'react';
import styled from 'styled-components';
import { ButtonProps } from '../Button/Button';

type ButtonGroupProps = {
  isMobile?: boolean,
  headerButtons?: boolean,
  children: FunctionComponentElement<ButtonProps>[];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props: ButtonGroupProps) =>
    props.isMobile && !props.headerButtons ? 'column' : 'row'};

  & > Button {
    margin-bottom: ${(props: ButtonGroupProps) =>
      props.isMobile && !props.headerButtons ? 'var(--space-xs)' : 0};

    &:first-child {
      margin-right: ${(props: ButtonGroupProps) =>
        props.isMobile && !props.headerButtons ? 0 : 'var(--space-xxxs)'};
    }
  }
`;

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ isMobile, children, headerButtons }) => {
  return (
    <Wrapper isMobile={isMobile} headerButtons={headerButtons}>
      {children}
    </Wrapper>
  );
};
