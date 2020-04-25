import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import { BuildItem } from '../BuildItem/BuildItem';
import { buildData } from '../BuildDetails/BuildDetails';

type BuildListProps = {
  id: string,
  isMobile: boolean,
  data: buildData[],
  handleDetails(event: MouseEvent<HTMLDivElement>): void,
  limit: number
}

const BuildListStyled = styled.div`
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

export const BuildList: React.FC<BuildListProps> = ({ id, isMobile, data, handleDetails, limit }) => {
  return (
    <BuildListStyled id={id}>
      {data.map((buildItem: buildData) => (
        <BuildItem
          key={buildItem.id}
          data={buildItem}
          handleDetails={handleDetails}
          isMobile={isMobile}
        />
      )).slice(0, limit)}
    </BuildListStyled>
  );
};
