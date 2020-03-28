import React from 'react';
import styled from 'styled-components';

const BranchNameStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: var(--space-xxxxxs);

  & > img {
    margin-right: var(--space-xxxxxs);
  }

  & > div {
    font-size: var(--font-size-s);
    line-height: var(--line-height-xs);
    letter-spacing: var(--letter-spacing-s);
    color: var(--text-color-default);
    
    flex-shrink: 1;
    max-width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const BranchName = ({ branchName, isDetails }) => {
  let prefix = isDetails ? '../' : '';

  return (
    <BranchNameStyled>
      <img src={`${prefix}images/code-commit_icon.svg`}/>
      <div>{branchName}</div>
    </BranchNameStyled>
  )
}
