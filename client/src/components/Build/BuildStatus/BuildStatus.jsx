import React from 'react';
import styled from 'styled-components';

const Icon = styled.img`
  width: ${props => props.isMobile ? '14px' : '21px'};
  height: ${props => props.isMobile ? '14px' : '21px'};
  margin-right: var(--space-xxs);
  flex-shrink: 1;
`;

export const BuildStatus = ({ status, isMobile }) => {
  return (
    <>
      {status === 'Success' && <Icon src='images/done_icon.svg' isMobile={isMobile}/>}
      {status === 'Fail' && <Icon src='images/fail_icon.svg' isMobile={isMobile}/>}
      {status === 'Waiting' && <Icon src='images/clock_icon.svg' isMobile={isMobile}/>}
    </>
  )
}
