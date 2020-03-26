import React from 'react'
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { mobileMaxWidth } from '../../breakpoints';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  margin: 6px -5px
`;

const Text = styled.div`
  margin-left: 10px;
`;

export const TextWithIcon = ({img, text}) => {
  const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });

  return (
    <Wrapper text={text}>
      <Icon src={img} alt="settings"/>
      {text && !isMobile ? <Text>{text}</Text> : null}
    </Wrapper>
  )
}
