import React, { FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';

type PopUpProps = {
  id: string,
  isMobile: boolean,
  handleClickCancel(): void,
  onChange(event: ChangeEvent<HTMLInputElement>): void,
  onClickRunBuild(event: FormEvent<Element>): void,
}

const PopUpWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUpStyled = styled.div`
  ${(props: Partial<Pick<PopUpProps, 'isMobile'>>) => (props.isMobile ? 'width: 100%;' : 'min-width: 485px;')}
  background-color: #fff;
  padding: var(--space-xl);
  border-radius: var(--border-radius-s);
  box-shadow: 0px 6px 16px rgba(67, 68, 69, 0.3),
    0px 0px 1px rgba(67, 68, 69, 0.3);

  & > input {
    margin-bottom: var(--space-xs);
  }
`;

const PopUpTitle = styled.h3`
  font-size: var(--font-size-l);
  font-weight: 500;
  line-height: var(--line-height-l);
  color: var(--text-color-default);
  margin-bottom: var(--space-xs);
`;

const PopUpMessage = styled.p`
  font-size: var(--font-size-s);
  line-height: var(--space-l);
  color: var(--text-color-default);
  letter-spacing: var(--letter-spacing-s);
  margin-bottom: var(--space-xs);
`;

export const PopUp: React.FC<PopUpProps> = ({
  id,
  handleClickCancel,
  isMobile,
  onChange,
  onClickRunBuild,
}) => {
  const { t } = useTranslation();

  return (
    <PopUpWrapper>
      <PopUpStyled id={id} isMobile={isMobile}>
        <form onSubmit={onClickRunBuild}>
          <PopUpTitle>{t('popup title')}</PopUpTitle>
          <PopUpMessage>
            {t('popup message')}
          </PopUpMessage>
          <Input
            id="commitHash"
            type="search"
            placeholder={t('popup input placeholder')}
            onChange={onChange}
            valid={true}
          />
          <ButtonGroup>
            <Button id="save" type="submit" color="accent">
              {t('popup button save')}
            </Button>
            <Button id="cancel" type="button" color="white" onClick={handleClickCancel}>
              {t('popup button cancel')}
            </Button>
          </ButtonGroup>
        </form>
      </PopUpStyled>
    </PopUpWrapper>
  );
};
