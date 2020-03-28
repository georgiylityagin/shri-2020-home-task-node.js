import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Page } from '../Page/Page';
import { Header } from '../Header/Header';
import { Content } from '../Content/Content';
import { Footer } from '../Footer/Footer';
import { Title } from '../Title/Title';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';

const FormWrapper = styled.form`
  max-width: 474px;
  margin: ${props => props.isMobile ? 'auto' : 0};
`;

const SettingsHeader = styled.h4`
  font-size: var(--font-size-m);
  font-weight: bold;
  line-height:  var(--line-height-m);
  margin-bottom: var(--space-xxxs);
`;

const SettingsDescription = styled.div`
  font-size: var(--font-size-s);
  line-height:  var(--line-height-s);
  letter-spacing: var(--letter-spacing-s);
  color: var(--text-color-muted);
  margin-bottom: var(--space-xxl);
`;

const InlineInput = styled.div`
  display: flex;
`;

const postSettings = async (url = '', data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

export const SettingsPage = ({ isMobile }) => {
  const [repoName, setRepoName] = useState('');
  const [buildCommand, setBuildCommand] = useState('');
  const [mainBranch, setMainBranch] = useState('master');
  const [period, setPeriod] = useState(0);
  const [repoNameValid, setRepoNameValid] = useState(true);
  const [buildCommandValid, setBuildCommandValid] = useState(true);
  const [periodValid, setPeriodValid] = useState(true);
  const [formValid, setFormValid] = useState(false);

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
        setPeriod(e.target.value);
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const settingsData = {
      repoName,
      buildCommand,
      mainBranch,
      period
    }

    // POST запрос на сервер
    postSettings('http://127.0.0.1:3000/api/settings', settingsData)
    .then(result => console.log(result))
    .catch(error => console.error(error))
  }

  const handleFocusOut = (e) => {
    switch (e.target.id) {
      case 'repository':
        repoName ? setRepoNameValid(true) : setRepoNameValid(false);
        break;
      case 'build':
        buildCommand ? setBuildCommandValid(true) : setBuildCommandValid(false);
        break;
      case 'period':
        Number.isInteger(+period) ? setPeriodValid(true) : setPeriodValid(false);
        break
    }
  }

  useEffect(() => {
    repoName && buildCommand && periodValid ? setFormValid(true) : setFormValid(false);

    // console.log(settingsData);
  });


  return (
    <Page>
      <Header isMobile={isMobile}>
        <Link to='/'>
          <Title isMobile={isMobile}>School CI server</Title>
        </Link>
      </Header>
      <Content>
        <FormWrapper isMobile={isMobile} onSubmit={handleSubmit}>
          <SettingsHeader>Settings</SettingsHeader>
          <SettingsDescription>
            Configure repository connection and synchronization settings.
          </SettingsDescription>
          <Input id='repository'
            type='search'
            labelText='GitHub repository'
            placeholder='user-name/repo-name'
            required
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={repoNameValid}
          />
          <Input id='build'
            type='search'
            labelText='Build command'
            placeholder='example: npm run build'
            required
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={buildCommandValid}
          />
          <Input id='branch'
            type='search'
            labelText='Main branch'
            placeholder='master'
            onChange={handleInputChange}
            valid={true}
          />
          <Input id='period'
            type='text'
            labelText='Synchronize every'
            placeholder='0'
            inline
            additionalLabel='minutes'
            onChange={handleInputChange}
            onBlur={handleFocusOut}
            valid={periodValid}
          />
          <ButtonGroup isMobile={isMobile}>
            <Button type='submit' disabled={!formValid} color='accent'>Save</Button>
            <Button type='button'>
              <Link to='/'>
                Cancel
              </Link>
            </Button>
          </ButtonGroup>
        </FormWrapper>
      </Content>
      <Footer isMobile={isMobile}/>
    </Page>
  )
}
