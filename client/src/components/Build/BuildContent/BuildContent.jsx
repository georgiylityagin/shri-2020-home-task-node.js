import React from 'react';
import styled from 'styled-components';

import { BuildDetails } from '../BuildDetails/BuildDetails';
import { BuildTimeInfo } from '../BuildTimeInfo/BuildTimeInfo';

const BuildContentStyled = styled.div`
  display: flex;
  flex-shrink: 1;
  width: 100%;
  flex-direction: ${props => props.isMobile || props.isDetails ? 'column' : 'row'};
  ${props => !props.isMobile && 'justify-content: space-between'};
`;

export const BuildContent = ({ data, isMobile, isDetails }) => {
  return (
    <BuildContentStyled isMobile={isMobile} isDetails={isDetails}>
      <BuildDetails data={data} isMobile={isMobile}/>
      <BuildTimeInfo  isMobile={isMobile} isDetails={isDetails}/>
    </BuildContentStyled>
  )
}
