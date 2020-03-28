import React from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
  --btn-color: var(--btn-control);
  --btn-color-hovered: var(--btn-control-hovered);
  --btn-color-focused: var(--btn-control-outline);

  ${props => props.color === 'accent' && '--btn-color: var(--btn-action);'}
  ${props => props.color === 'accent' && '--btn-color-hovered: var(--btn-action-hovered);'}
  ${props => props.color === 'accent' && '--btn-color-focused: var(--btn-action-outline);'}

  ${props => props.color === 'white' && '--btn-color: var(--btn-white);'}
  ${props => props.color === 'white' && '--btn-color-hovered: var(--btn-white-hovered);'}


  display: inline-block;
  cursor: pointer;
  padding: 0 ${props => props.size === 's' ? '13px' : '18px'};
  background-color: var(--btn-color);
  border: 2px solid ${props => props.color === 'white' ? 'var(--btn-color-hovered);' : 'var(--btn-color);'};
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
    border-color: var(--btn-disabled);
    cursor: auto;
  }
`;

export const Button = ({size, color, children, type, disabled, onClick}) => {
  return (
    <StyledButton type={type} size={size} color={color} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
