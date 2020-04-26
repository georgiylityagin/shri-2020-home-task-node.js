import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import { BuildStatus } from '../BuildStatus/BuildStatus';
import { BuildContent } from '../BuildContent/BuildContent';
import { buildInfo } from '../../../redux/reducers/details-reducer';

type BuildItemProps = {
  data: buildInfo,
  isMobile: boolean,
  isDetails?: boolean,
  handleDetails?(event: MouseEvent<HTMLDivElement>): void
}

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
    ${(props: Partial<BuildItemProps>) => !props.isDetails && 'cursor: pointer;'}
    ${(props: Partial<BuildItemProps>) =>
      !props.isDetails &&
      'box-shadow: 0px 2px 8px rgba(67, 68, 69, 0.3), 0px 0px 1px rgba(67, 68, 69, 0.3);'}
  }

  ${(props: Partial<BuildItemProps>) => props.isMobile && 'padding: var(-space-xs) var(--space-m)'};
`;

export const BuildItem: React.FC<BuildItemProps> = ({ data, isMobile, isDetails, handleDetails }) => {
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
