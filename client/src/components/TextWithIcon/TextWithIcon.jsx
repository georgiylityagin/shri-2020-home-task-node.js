import React from 'react'
import styled from 'styled-components';

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

export const TextWithIcon = ({img, text, isMobile}) => {
  return (
    <Wrapper text={text}>
      <Icon src={img} alt="settings"/>
      {text && !isMobile ? <Text>{text}</Text> : null}
    </Wrapper>
  )
}
