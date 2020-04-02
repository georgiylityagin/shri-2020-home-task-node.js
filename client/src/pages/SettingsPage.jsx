import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  postConfig,
  switchErrorWithCloning,
} from '../redux/actions/settings-actions';
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

const FormWrapper = styled.form`
  max-width: 474px;
  margin: ${(props) => (props.isMobile ? 'auto' : 0)};
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

export const SettingsPage = ({
  postConfig,
  switchErrorWithCloning,
  isCloning,
  cloningWithError,
  isMobile,
}) => {
  const [repoName, setRepoName] = useState('');
  const [buildCommand, setBuildCommand] = useState('');
  const [mainBranch, setMainBranch] = useState('master');
  const [period, setPeriod] = useState(0);
  const [repoNameValid, setRepoNameValid] = useState(true);
  const [buildCommandValid, setBuildCommandValid] = useState(true);
  const [periodValid, setPeriodValid] = useState(true);
  const [formValid, setFormValid] = useState(false);

  let history = useHistory();

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case 'repository':
        setRepoName(e.target.value);
        break;
      case 'build':
        setBuildCommand(e.target.value);
        break;
      case 'branch':
        setMainBranch(e.target.value);
        break;
      case 'period':
        setPeriod(+e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const settingsData = {
      repoName,
      buildCommand,
      mainBranch,
      period,
    };

    postConfig(settingsData, history);
  };

  const handleFocusOut = (e) => {
    switch (e.target.id) {
      case 'repository':
        repoName ? setRepoNameValid(true) : setRepoNameValid(false);
        break;
      case 'build':
        buildCommand ? setBuildCommandValid(true) : setBuildCommandValid(false);
        break;
      case 'period':
        Number.isInteger(+period)
          ? setPeriodValid(true)
          : setPeriodValid(false);
        break;
      default:
        break;
    }
  };

  const disableAlert = useCallback(
    () => {
      setTimeout(() => {
        switchErrorWithCloning(false);
      }, 5000);
    },
    [switchErrorWithCloning]
  );

  const handleRedirect = (e) => {
    e.preventDefault();
    history.push('/');
  };

  useEffect(() => {
    repoName && buildCommand && periodValid
      ? setFormValid(true)
      : setFormValid(false);
    cloningWithError && disableAlert();
  }, [repoName, buildCommand, periodValid, cloningWithError, disableAlert]);

  return (
    <Page>
      <Header isMobile={isMobile}>
        <Link to="/">
          <Title isMobile={isMobile}>School CI server</Title>
        </Link>
      </Header>
      <Content>
        <FormWrapper isMobile={isMobile} onSubmit={handleSubmit}>
          {cloningWithError ? <Alert>Error with cloning repo</Alert> : null}
          <SettingsHeader>Settings</SettingsHeader>
          <SettingsDescription>
            Configure repository connection and synchronization settings.
          </SettingsDescription>
          <Input
            id="repository"
            type="search"
            labelText="GitHub repository"
            placeholder="user-name/repo-name"
            required
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={repoNameValid}
          />
          <Input
            id="build"
            type="search"
            labelText="Build command"
            placeholder="example: npm run build"
            required
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={buildCommandValid}
          />
          <Input
            id="branch"
            type="search"
            labelText="Main branch"
            placeholder="master"
            onChange={handleInputChange}
            valid={true}
          />
          <Input
            id="period"
            type="text"
            labelText="Synchronize every"
            placeholder="0"
            inline
            additionalLabel="minutes"
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={periodValid}
          />
          <ButtonGroup isMobile={isMobile}>
            <Button
              type="submit"
              disabled={!formValid || isCloning}
              color="accent"
            >
              Save
            </Button>
            <Button type="button" disabled={isCloning} onClick={handleRedirect}>
              Cancel
            </Button>
          </ButtonGroup>
        </FormWrapper>
      </Content>
      <Footer isMobile={isMobile} />
    </Page>
  );
};

const mapStateToProps = ({ settings }) => ({
  isCloning: settings.isCloning,
  cloningWithError: settings.cloningWithError,
});

export const ConnectedSettingsPage = connect(mapStateToProps, {
  postConfig,
  switchErrorWithCloning,
})(SettingsPage);
