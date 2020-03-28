import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Page } from '../Page/Page';
import { Header } from '../Header/Header';
import { Content } from '../Content/Content';
import { Footer } from '../Footer/Footer';
import { Title } from '../Title/Title';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { TextWithIcon } from '../TextWithIcon/TextWithIcon';
import { PopUp } from '../PopUp/PopUp';

import { BuildList } from '../Build/BuildList/BuildList';

const data = [
  {
    "id": "1a26b772",
    "configurationId": "a7cec7c0-ddf3-4809-ae1b-f7ed7e6a31a2",
    "buildNumber": 3,
    "commitMessage": "И ещё что-то",
    "commitHash": "3klhjkaha83h2jkhh2348hskjfdaasdfasdf3",
    "branchName": "hot-fix",
    "authorName": "John Doe",
    "status": "Waiting"
  },
  {
    "id": "6a75j789",
    "configurationId": "a7cec7c0-jdh2-4809-ae1b-f7ed7e6a31a2",
    "buildNumber": 2,
    "commitMessage": "Сделано ещё что-то",
    "commitHash": "dj38sldf2349dslkahdfjh1248sfdhkasfadf",
    "branchName": "feature",
    "authorName": "Georgiy Lityagin",
    "status": "Fail"
  },
  {
    "id": "6a75b785",
    "configurationId": "a7cec7c0-4d65-4809-ae1b-f7ed7e6a31a2",
    "buildNumber": 1,
    "commitMessage": "обновлён readme",
    "commitHash": "f9bb5f0b469541aecfcb58d1ab220cffc4079ac7",
    "branchName": "master",
    "authorName": "SuperUser",
    "status": "Success"
  }
];

export const HistoryPage = ({isMobile, repoName}) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {

  });

  const handleTogglePopUp = () => {
    setToggle(!toggle);
  }

  return (
    <Page>
      <Header isMobile={isMobile}>
        <Title isMobile={isMobile} isRepoName={true}>
          {repoName}
        </Title>
        <ButtonGroup isMobile={isMobile} headerButtons>
            <Button size='s' onClick={handleTogglePopUp}>
              <TextWithIcon img='images/play_icon.svg' text='Run build' />
            </Button>
            <Link to='/settings'>
              <Button size='s'>
                <TextWithIcon img='images/settings_icon.svg'/>
              </Button>
            </Link>
        </ButtonGroup>
      </Header>
      <Content>
        <BuildList data={data} isMobile={isMobile}/>
        <Button size='s'>
          Show more
        </Button>
        {toggle ? <PopUp handleClickCancel={handleTogglePopUp} isMobile={isMobile}/> : null}
      </Content>
      <Footer isMobile={isMobile}/>
    </Page>
  )
}
