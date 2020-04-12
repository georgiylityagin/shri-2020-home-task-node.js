import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../Button/Button';

const ConfigInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 210px;
  transform: translateY(-35px);
`;

const ConfigInfoImage = styled.img`
  width: 124px;
  margin-bottom: 32px;
`;

const ConfigInfoText = styled.div`
  text-align: center;
  font-size: var(--space-s);
  line-height: var(--line-height-xs);
  margin-bottom: 24px;
`;

export const ConfigInfo = () => {
  return (
    <ConfigInfoWrapper>
      <ConfigInfoImage src="images/logo.svg" alt="" />
      <ConfigInfoText>
        Configure repository connection and synchronization settings
      </ConfigInfoText>
      <Link to="/settings">
        <Button color="accent" id='toSettings1'>Open settings</Button>
      </Link>
    </ConfigInfoWrapper>
  );
};
