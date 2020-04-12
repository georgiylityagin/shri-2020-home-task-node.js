import React from 'react';
import styled from 'styled-components';

import { BuildItem } from '../BuildItem/BuildItem';

const BuildListStyled = styled.div`
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

export const BuildList = ({ id, isMobile, data, handleDetails, limit }) => {
  return (
    <BuildListStyled id={id}>
      {data.map((buildItem) => (
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
