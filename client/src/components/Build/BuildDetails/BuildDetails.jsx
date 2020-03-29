import React from 'react';
import styled from 'styled-components';

import { BuildNumber } from '../BuildNumber/BuildNumber';
import { CommitMessage } from '../CommitMessage/CommitMessage';
import { BranchName } from '../BranchName/BranchName';
import { CommitHash } from '../CommitHash/CommitHash';
import { AuthorName } from '../AuthorName/AuthorName';

const BuildDetailsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
  flex-shrink: 1;
`;

const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  ${props => props.isMobile && 'margin-bottom: var(--space-xxxs);'}
`;

export const BuildDetails = ({ data, isMobile, isDetails }) => {
  return (
    <BuildDetailsStyled isMobile={isMobile}>
      <BuildNumber buildNumber={data.buildNumber} status={data.status} isMobile={isMobile}/>
      <CommitMessage commitMessage={data.commitMessage}/>
      <Break/>
      <MetaInfo isMobile={isMobile}>
        <BranchName branchName={data.branchName} isDetails={isDetails}/>
        <CommitHash commitHash={data.commitHash}/>
      </MetaInfo>
      <AuthorName authorName={data.authorName} isDetails={isDetails} isMobile={isMobile}/>
    </BuildDetailsStyled>
  )
}
