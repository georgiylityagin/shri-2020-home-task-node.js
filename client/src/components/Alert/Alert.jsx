import React from 'react';
import styled from 'styled-components';

const AlertStyled = styled.div`
  padding: var(--space-xs) var(--space-xl);
  border-radius: var(--border-radius-s);
  background-color: var(--bg-alert);
  font-size: var(--text-size-m);
  color: var(--text-color-secondary);
  margin-bottom: var(--space-xl);
`;

export const Alert = ( {children} ) => {
  return (
    <AlertStyled>
      {children}
    </AlertStyled>
  )
}