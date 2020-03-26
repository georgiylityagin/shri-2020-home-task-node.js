import React from 'react'
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: var(--bg-footer);
  padding: 0 var(--content-mobile-indent);
`;

const FooterContent = styled.div`
  max-width: var(--content-max-width);
  margin: auto;
  padding: var(--space-xxxs) 0;
  display: flex;
  aling-items: center;
  justify-content: space-between;
`;


const FooterLink = styled.a`
  margin-right: var(--space-xs);
  margin-bottom: var(--space-xxxs);
  font-size: var(--font-size-s);
  line-height: var(--line-height-xs);
  color: var(--text-color-muted);
  letter-spacing: var(--letter-spacing-s);

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    color: var(--text-color-danger);
    cursor: pointer;
  }
`;

const FooterText = styled.div`
  font-size: var(--font-size-s);
  line-height: var(--line-height-xs);
  color: var(--text-color-muted);
  letter-spacing: var(--letter-spacing-s);
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <div>
          <FooterLink>Support</FooterLink>
          <FooterLink>Learning</FooterLink>
        </div>
        <FooterText>&copy; 2020 Georgiy Lityagin</FooterText>
      </FooterContent>
    </StyledFooter>
  )
}
