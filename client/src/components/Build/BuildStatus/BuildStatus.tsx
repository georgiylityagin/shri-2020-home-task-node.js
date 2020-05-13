import React from 'react';
import styled from 'styled-components';


type BuildStatusProps = {
  isMobile: boolean,
  isDetails?: boolean,
  status?: string
}

const Icon = styled.img`
  width: ${(props: Partial<Pick<BuildStatusProps, 'isMobile'>>) => (props.isMobile ? '14px' : '21px')};
  height: ${(props: Partial<Pick<BuildStatusProps, 'isMobile'>>) => (props.isMobile ? '14px' : '21px')};
  margin-right: var(--space-xxs);
  flex-shrink: 1;
`;

export const BuildStatus: React.FC<BuildStatusProps> = ({ status, isMobile, isDetails }) => {
  let prefix = isDetails ? '../' : '';

  return (
    <>
      {status === 'Success' && (
        <Icon
          src={`${prefix}images/done_icon.svg`}
          alt=""
          isMobile={isMobile}
        />
      )}
      {status === 'Fail' && (
        <Icon
          src={`${prefix}images/fail_icon.svg`}
          alt=""
          isMobile={isMobile}
        />
      )}
      {status === 'Canceled' && (
        <Icon
          src={`${prefix}images/fail_icon.svg`}
          alt=""
          isMobile={isMobile}
        />
      )}
      {status === 'Waiting' && (
        <Icon
          src={`${prefix}images/clock_icon.svg`}
          alt=""
          isMobile={isMobile}
        />
      )}
      {status === 'InProgress' && (
        <Icon
          src={`${prefix}images/clock_icon.svg`}
          alt=""
          isMobile={isMobile}
        />
      )}
    </>
  );
};
