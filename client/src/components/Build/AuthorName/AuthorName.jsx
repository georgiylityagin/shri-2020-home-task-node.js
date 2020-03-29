import React from 'react';
import styled from 'styled-components';

const AuthorNameStyled = styled.div`
  display: flex;
  align-items: center;
  
  ${props => props.isMobile && 'margin-bottom: var(--space-xxxs);'}

  & > img {
    margin-right: var(--space-xxxxs);
  }

  & > div {
    font-size: var(--font-size-s);
    line-height: var(--line-height-xs);
    letter-spacing: var(--letter-spacing-s);
    color: var(--text-color-default);

    max-width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const AuthorName = ({ authorName, isMobile, isDetails }) => {
  let prefix = isDetails ? '../' : '';

  return (
    <AuthorNameStyled isMobile={isMobile}>
      <img src={`${prefix}images/user_icon.svg`}/>
      <div>{ authorName }</div>
    </AuthorNameStyled>
  )
}
