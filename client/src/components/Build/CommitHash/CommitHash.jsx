import React from 'react';
import styled from 'styled-components';

const CommitHashStyled = styled.div`
  font-size: var(--font-size-s);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-s);
  color: var(--text-color-secondary);
  margin-right: var(--space-xxs);
  
  flex-shrink: 1;
  max-width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const CommitHash = ({ commitHash }) => {
  return (
    <CommitHashStyled>
      { commitHash.slice(0, 9) }
    </CommitHashStyled>
  )
}
