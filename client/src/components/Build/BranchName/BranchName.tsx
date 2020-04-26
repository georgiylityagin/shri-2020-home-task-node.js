import React from 'react';
import styled from 'styled-components';

type BranchNameProps = {
  branchName?: string,
  isDetails?: boolean
}

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

    max-width: 190px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const BranchName: React.FC<BranchNameProps> = ({ branchName, isDetails }) => {
  let prefix = isDetails ? '../' : '';

  return (
    <BranchNameStyled>
      <img src={`${prefix}images/code-commit_icon.svg`} alt='' />
      <div>{branchName}</div>
    </BranchNameStyled>
  );
};
