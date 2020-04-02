import React from 'react';
import styled from 'styled-components';

const CommitHashStyled = styled.div`
  font-size: var(--font-size-s);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-s);
  color: var(--text-color-secondary);
  margin-right: var(--space-xxs);
`;

export const CommitHash = ({ commitHash }) => {
  return (
    <CommitHashStyled>
      {commitHash ? `${commitHash.slice(0, 9)}...` : null}
    </CommitHashStyled>
  );
};
