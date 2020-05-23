import React, { useState, useEffect, useCallback, ChangeEvent, FocusEvent, FormEvent, MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  getConfig,
  addConfig,
  postConfig,
  switchErrorWithCloning,
  settingsActionTypes
} from '../redux/actions/settings-actions';
import {
  Config,
  IsConfig,
  IsCloning,
  CloningWithError
} from '../redux/reducers/settings-reducer';
import { History } from 'history'
import { connect } from 'react-redux';
import { Page } from '../components/Page/Page';
import { Header } from '../components/Header/Header';
import { Content } from '../components/Content/Content';
import { Footer } from '../components/Footer/Footer';
import { Title } from '../components/Title/Title';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { Alert } from '../components/Alert/Alert';

type SettingsPageProps = {
  getConfig(): void,
  addConfig(config: Config): settingsActionTypes,
  postConfig(data: Config, history: History): void,
  switchErrorWithCloning(data: boolean): void,
  config: Config,
  isConfig: IsConfig,
  isCloning: IsCloning,
  cloningWithError: CloningWithError,
  isMobile: boolean
}

const FormWrapper = styled.form`
  max-width: 474px;
  margin: ${(props: Partial<Pick<SettingsPageProps, 'isMobile'>>) => (props.isMobile ? 'auto' : 0)};
`;

const SettingsHeader = styled.h4`
  font-size: var(--font-size-m);
  font-weight: bold;
  line-height: var(--line-height-m);
  margin-bottom: var(--space-xxxs);
`;

const SettingsDescription = styled.div`
  font-size: var(--font-size-s);
  line-height: var(--line-height-s);
  letter-spacing: var(--letter-spacing-s);
  color: var(--text-color-muted);
  margin-bottom: var(--space-xxl);
`;

export const SettingsPage: React.FC<SettingsPageProps> = ({
  getConfig,
  addConfig,
  postConfig,
  switchErrorWithCloning,
  config,
  isConfig,
  isCloning,
  cloningWithError,
  isMobile
}) => {
  const { t } = useTranslation();
  const [repoNameValid, setRepoNameValid] = useState(true);
  const [buildCommandValid, setBuildCommandValid] = useState(true);
  const [periodValid, setPeriodValid] = useState(true);
  const [formValid, setFormValid] = useState(false);

  let history = useHistory();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.id) {
      case 'repository':
        addConfig({ ...config, repoName: e.target.value });
        break;
      case 'build':
        addConfig({ ...config, buildCommand: e.target.value });
        break;
      case 'branch':
        addConfig({ ...config, mainBranch: e.target.value });
        break;
      case 'period':
        addConfig({ ...config, period: +e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLElement>): void => {
    e.preventDefault();

    const settingsData = {
      repoName: config.repoName,
      buildCommand: config.buildCommand,
      mainBranch: config.mainBranch,
      period: config.period
    };

    postConfig(settingsData, history);
  };

  const handleFocusOut = (e: FocusEvent<HTMLInputElement>): void => {
    switch (e.target.id) {
      case 'repository':
        config.repoName 
          ? setRepoNameValid(true) 
          : setRepoNameValid(false);
        break;
      case 'build':
        config.buildCommand
          ? setBuildCommandValid(true)
          : setBuildCommandValid(false);
        break;
      case 'period':
        Number.isInteger(+config.period)
          ? setPeriodValid(true)
          : setPeriodValid(false);
        break;
      default:
        break;
    }
  };

  const disableAlert = useCallback(() => {
    setTimeout(() => {
      switchErrorWithCloning(false);
    }, 5000);
  }, [switchErrorWithCloning]);

  const handleRedirect = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    history.push('/');
  };

  useEffect(() => {
    if (!isConfig) {
      getConfig();
    }

    config.repoName && config.buildCommand && periodValid
      ? setFormValid(true)
      : setFormValid(false);

    cloningWithError && disableAlert();
  }, [getConfig, config, isConfig, periodValid, cloningWithError, disableAlert]);

  return (
    <Page id="settingsPage">
      <Header isMobile={isMobile}>
        <Link to='/'>
        <Title isMobile={isMobile}>{t('header title')}</Title>
        </Link>
      </Header>
      <Content>
        <FormWrapper isMobile={isMobile} onSubmit={handleSubmit}>
          {cloningWithError ? <Alert id="alert">Error with cloning repo</Alert> : null}
          <SettingsHeader>{t('settings title')}</SettingsHeader>
          <SettingsDescription>
            {t('settings description')}
          </SettingsDescription>
          <Input
            id='repository'
            type='search'
            labelText={t('settings repository')}
            placeholder='user-name/repo-name'
            value={config.repoName}
            required
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={repoNameValid}
          />
          <Input
            id='build'
            type='search'
            labelText={t('settings build command')}
            placeholder='example: npm run build'
            value={config.buildCommand}
            required
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={buildCommandValid}
          />
          <Input
            id='branch'
            type='search'
            labelText={t('settings main branch')}
            placeholder='master'
            value={config.mainBranch}
            onChange={handleInputChange}
            valid={true}
          />
          <Input
            id='period'
            type='text'
            labelText={t('synchronize_period.part1')}
            value={config.period}
            placeholder='0'
            inline
            additionalLabel={t('synchronize_period.part2')}
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={periodValid}
          />
          <ButtonGroup isMobile={isMobile}>
            <Button
              id='save'
              type='submit'
              disabled={!formValid || isCloning}
              color='accent'
            >
              {t('settings save button')}
            </Button>
            <Button id='cancel' type='button' disabled={isCloning} onClick={handleRedirect}>
              {t('settings cancel button')}
            </Button>
          </ButtonGroup>
        </FormWrapper>
      </Content>
      <Footer isMobile={isMobile} />
    </Page>
  );
};

const mapStateToProps = ({ settings }: any) => ({
  config: settings.config,
  isConfig: settings.isConfig,
  isCloning: settings.isCloning,
  cloningWithError: settings.cloningWithError
});

export const ConnectedSettingsPage = connect(mapStateToProps, {
  getConfig,
  addConfig,
  postConfig,
  switchErrorWithCloning
})(SettingsPage);
