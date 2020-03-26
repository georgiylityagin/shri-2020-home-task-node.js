import React from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
  --btn-color: ${props => props.color === 'accent' ? 'var(--btn-action)' : 'var(--btn-control)'};
  --btn-color-hovered: ${props => props.color === 'accent' ? 'var(--btn-action-hovered)' : 'var(--btn-control-hovered)'};
  --btn-color-focused: ${props => props.color === 'accent' ? 'var(--btn-action-outline)' : 'var(--btn-control-outline)'};

  display: inline-block;
  cursor: pointer;
  padding: 0 ${props => props.size === 's' ? '13px' : '18px'};
  background-color: var(--btn-color);
  border: 2px solid var(--btn-color);
  border-radius: var(--border-radius-s);
  color: var(--text-color-default);
  font-size: var(--font-size-s);
  line-height: ${props => props.size === 's' ? '24px' : '32px'};

  &:hover {
    background-color: var(--btn-color-hovered);
    border-color: var(--btn-color-hovered);
  }

  &:focus {
    outline: none;
    border-color: var(--btn-color-focused);
  }

  &:disabled {
    background-color: var(--btn-disabled);
  }
`;

export const Button = ({size, color, children}) => {
  return (
    <StyledButton size={size} color={color}>
      {children}
    </StyledButton>
  )
}
