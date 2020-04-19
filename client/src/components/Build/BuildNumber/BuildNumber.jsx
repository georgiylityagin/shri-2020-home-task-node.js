import React from 'react';
import styled from 'styled-components';

const BuildNumberStyled = styled.div`
  font-size: ${(props) =>
    props.isMobile ? 'var(--font-size-ml)' : 'var(--font-size-l)'};
  line-height: ${(props) =>
    props.isMobile ? 'var(--line-height-xs)' : 'var(--line-height-m)'};
  font-weight: 500;
  margin-right: var(--space-xxxxxs);
  margin-bottom: var(--space-xxxs);
  color: var(--text-color-default);
  ${(props) =>
    props.status === 'Success' && 'color: var(--text-color-success);'}
  ${(props) => props.status === 'Fail' && 'color: var(--text-color-danger);'}
  ${(props) =>
    props.status === 'Waiting' && 'color: var(--text-color-warning);'}
  ${(props) =>
    props.status === 'InProgress' && 'color: var(--text-color-warning);'}
`;

export const BuildNumber = ({ status, buildNumber, isMobile }) => {
  return (
    <BuildNumberStyled isMobile={isMobile} status={status}>
      {`#${buildNumber}`}
    </BuildNumberStyled>
  );
};
