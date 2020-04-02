import React from 'react';
import styled from 'styled-components';

import { BuildStatus } from '../BuildStatus/BuildStatus';
import { BuildContent } from '../BuildContent/BuildContent';

const BuildItemStyled = styled.div`
  display: flex;
  padding: var(--space-xs) var(--space-xxxl);
  box-shadow: 0px 1px 1px rgba(67, 68, 69, 0.3),
    0px 0px 1px rgba(67, 68, 69, 0.3);
  border-radius: var(--border-radius-m);
  &:not(:last-child) {
    margin-bottom: var(--space-xxxs);
  }

  &:only-child {
    margin-bottom: var(--space-xxxs);
  }

  &:hover {
    ${(props) => !props.isDetails && 'cursor: pointer;'}
    ${(props) =>
      !props.isDetails &&
      'box-shadow: 0px 2px 8px rgba(67, 68, 69, 0.3), 0px 0px 1px rgba(67, 68, 69, 0.3);'}
  }

  ${(props) => props.isMobile && 'padding: var(-space-xs) var(--space-m)'};
`;

export const BuildItem = ({ data, isMobile, isDetails, handleDetails }) => {
  return (
    <BuildItemStyled id={data.id} isDetails={isDetails} onClick={handleDetails}>
      <BuildStatus
        status={data.status}
        isDetails={isDetails}
        isMobile={isMobile}
      />
      <BuildContent data={data} isMobile={isMobile} isDetails={isDetails} />
    </BuildItemStyled>
  );
};
