import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: var(--bg-footer);
  padding: 0 var(--content-mobile-indent);
`;

const FooterContent = styled.div`
  max-width: var(--content-max-width);
  margin: auto;
  padding: ${(props) =>
      props.isMobile ? 'var(--space-xs)' : 'var(--space-xxxs)'}
    0;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  aling-items: center;
  justify-content: space-between;
`;

const FooterLinks = styled.div`
  margin-bottom: ${(props) => (props.isMobile ? 'var(--space-xxxs)' : 0)};
`;

const FooterLink = styled.a`
  margin-right: var(--space-xs);
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

export const Footer = ({ isMobile }) => {
  return (
    <StyledFooter>
      <FooterContent isMobile={isMobile}>
        <FooterLinks isMobile={isMobile}>
          <FooterLink>Support</FooterLink>
          <FooterLink>Learning</FooterLink>
        </FooterLinks>
        <FooterText>&copy; 2020 Georgiy Lityagin</FooterText>
      </FooterContent>
    </StyledFooter>
  );
};
