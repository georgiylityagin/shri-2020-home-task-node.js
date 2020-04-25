import React from 'react';
import styled from 'styled-components';

type AuthorNameProps = {
  authorName: string,
  isMobile: boolean,
  isDetails?: boolean
}

const AuthorNameStyled = styled.div`
  display: flex;
  align-items: center;

  ${(props: Partial<AuthorNameProps>) => props.isMobile && 'margin-bottom: var(--space-xxxs);'}

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

export const AuthorName: React.FC<AuthorNameProps> = ({ authorName, isMobile, isDetails }) => {
  let prefix = isDetails ? '../' : '';

  return (
    <AuthorNameStyled isMobile={isMobile}>
      <img src={`${prefix}images/user_icon.svg`} alt='' />
      <div>{authorName}</div>
    </AuthorNameStyled>
  );
};
