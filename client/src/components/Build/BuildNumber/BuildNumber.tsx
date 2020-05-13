import React from 'react';
import styled from 'styled-components';

type BuildNumberProps = {
  status?: string,
  isMobile: boolean,
  buildNumber?: number
}

const BuildNumberStyled = styled.div`
  font-size: ${(props: Partial<BuildNumberProps>) =>
    props.isMobile ? 'var(--font-size-ml)' : 'var(--font-size-l)'};
  line-height: ${(props: Partial<BuildNumberProps>) =>
    props.isMobile ? 'var(--line-height-xs)' : 'var(--line-height-m)'};
  font-weight: 500;
  margin-right: var(--space-xxxxxs);
  margin-bottom: var(--space-xxxs);
  color: var(--text-color-default);
  ${(props: Partial<BuildNumberProps>) =>
    props.status === 'Success' && 'color: var(--text-color-success);'}
  ${(props: Partial<BuildNumberProps>) => props.status === 'Fail' && 'color: var(--text-color-danger);'}
  ${(props: Partial<BuildNumberProps>) => props.status === 'Canceled' && 'color: var(--text-color-danger);'}
  ${(props: Partial<BuildNumberProps>) =>
    props.status === 'Waiting' && 'color: var(--text-color-warning);'}
  ${(props: Partial<BuildNumberProps>) =>
    props.status === 'InProgress' && 'color: var(--text-color-warning);'}
`;

export const BuildNumber: React.FC<BuildNumberProps> = ({ status, buildNumber, isMobile }) => {
  return (
    <BuildNumberStyled isMobile={isMobile} status={status}>
      {`#${buildNumber}`}
    </BuildNumberStyled>
  );
};
