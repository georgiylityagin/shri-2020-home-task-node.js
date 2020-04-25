import React from 'react';
import styled from 'styled-components';

import { BuildDetails } from '../BuildDetails/BuildDetails';
import { BuildTimeInfo } from '../BuildTimeInfo/BuildTimeInfo';
import { buildData } from '../BuildDetails/BuildDetails';

type BuildContentProps = {
  data: buildData,
  isMobile: boolean,
  isDetails?: boolean
}

const BuildContentStyled = styled.div`
  display: flex;
  flex-shrink: 1;
  width: 100%;
  flex-direction: ${(props: Partial<BuildContentProps>) =>
    props.isMobile || props.isDetails ? 'column' : 'row'};
  ${(props: Partial<BuildContentProps>) => !props.isMobile && 'justify-content: space-between'};
`;

export const BuildContent: React.FC<BuildContentProps> = ({ data, isMobile, isDetails }) => {
  return (
    <BuildContentStyled isMobile={isMobile} isDetails={isDetails}>
      <BuildDetails data={data} isMobile={isMobile} isDetails={isDetails} />
      {(data.start && data.duration !== undefined) ? (
        <BuildTimeInfo
          isMobile={isMobile}
          start={data.start}
          duration={data.duration}
          isDetails={isDetails}
        />
      ) : null}
    </BuildContentStyled>
  );
};
