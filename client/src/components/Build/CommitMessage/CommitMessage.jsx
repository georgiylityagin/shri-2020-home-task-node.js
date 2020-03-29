import React from 'react';
import styled from 'styled-components';

const CommitMessageStyled = styled.div`
  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
  color: var(--text-color-default);
  margin-bottom: var(--space-xxxs);
`;

export const CommitMessage = ({ commitMessage }) => {
  return (
    <CommitMessageStyled>
      { commitMessage }
    </CommitMessageStyled>
  )
}
