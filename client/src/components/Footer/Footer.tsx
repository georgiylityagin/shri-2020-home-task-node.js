import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

type FooterProps = {
  isMobile: boolean;
}

const StyledFooter = styled.footer`
  background-color: var(--bg-footer);
  padding: 0 var(--content-mobile-indent);
`;

const FooterContent = styled.div`
  max-width: var(--content-max-width);
  margin: auto;
  padding: ${(props: FooterProps) =>
      props.isMobile ? 'var(--space-xs)' : 'var(--space-xxxs)'}
    0;
  display: flex;
  flex-direction: ${(props: FooterProps) => (props.isMobile ? 'column' : 'row')};
  aling-items: center;
  justify-content: space-between;
`;

const FooterLinks = styled.div`
  margin-bottom: ${(props: FooterProps) => (props.isMobile ? 'var(--space-xxxs)' : 0)};
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

export const Footer: React.FC<FooterProps> = ({ isMobile }) => {
  const { t, i18n } = useTranslation();
  const toggleLang = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ru');
    } else {
      i18n.changeLanguage('en');
    }
  }

  return (
    <StyledFooter>
      <FooterContent isMobile={isMobile}>
        <FooterLinks isMobile={isMobile}>
          <FooterLink>{t('footer link support')}</FooterLink>
          <FooterLink>{t('footer link leaning')}</FooterLink>
          <FooterLink onClick={toggleLang}>{t('footer link lang')}</FooterLink>
        </FooterLinks>
        <FooterText>&copy; 2020 {t('owner')}</FooterText>
      </FooterContent>
    </StyledFooter>
  );
};
