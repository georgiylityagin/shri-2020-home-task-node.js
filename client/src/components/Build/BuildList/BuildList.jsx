import React from 'react';
import styled from 'styled-components';

import { BuildItem } from '../BuildItem/BuildItem';

const BuildListStyled = styled.div`
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

export const BuildList = ({ isMobile, data, handleDetails }) => {
  return (
    <BuildListStyled>
      {data.map((buildItem) => (
        <BuildItem
          key={buildItem.id}
          data={buildItem}
          handleDetails={handleDetails}
          isMobile={isMobile}
        />
      ))}
    </BuildListStyled>
  );
};
