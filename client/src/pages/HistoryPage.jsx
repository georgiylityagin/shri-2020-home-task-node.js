import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBuildListThunk, postNewBuildQueue } from '../redux/History/history-reducer';

import { Page } from '../components/Page/Page';
import { Header } from '../components/Header/Header';
import { Content } from '../components/Content/Content';
import { Footer } from '../components/Footer/Footer';
import { Title } from '../components/Title/Title';
import { Button } from '../components/Button/Button';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { TextWithIcon } from '../components/TextWithIcon/TextWithIcon';
import { PopUp } from '../components/PopUp/PopUp';
import { BuildList } from '../components/Build/BuildList/BuildList';

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

export const HistoryPage = ({ getBuildListThunk, postNewBuildQueue, isLoading, buildList, repoName, runNewBuild, isMobile}) => {
  const [toggle, setToggle] = useState(false);
  const [foundCommit, setFoundCommit] = useState(false);
  const [showLimit, setShowLimit] = useState({
    limit: isMobile ? 3 : 10
  });
  const [formValue, setFormValue] = useState({
    hash: ''
  });

  const handleChange = event => {
    const { value } = event.currentTarget;
    setFormValue(state => ({ ...state, hash: value }));
  }

  let history = useHistory();

  const handleShowMore = () => {
    const stepShow = isMobile ? 3 : 5;
    setShowLimit((state) => ({ ...state, limit: state.limit + stepShow }));
  }

  
  const handleTogglePopUp = () => {
    setToggle(!toggle);
  }

  const handleDetails = event => {
    let buildId = event.currentTarget.id;
    localStorage.setItem('detailsId', buildId);
    history.push(`build/${buildId}`);
  }

  const handleRunBuild = (e) => {
    e.preventDefault();

    const searchedObj = buildList.find(({ commitHash }) => commitHash === formValue.hash);
    if (searchedObj) {
      postNewBuildQueue({
        commitHash: searchedObj.commitHash,
        commitMessage: searchedObj.commitMessage,
        branchName: searchedObj.branchName,
        authorName: searchedObj.authorName
      }, history);
    } else {
      setFoundCommit(true);
    }
  }

  useEffect(() => {
    getBuildListThunk(showLimit.limit);
  }, [getBuildListThunk, showLimit.limit])

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
        <BuildList data={buildList} handleDetails={handleDetails} isMobile={isMobile}/>
        <Button size='s' onClick={handleShowMore} isMobile={isMobile}>
          Show more
        </Button>
        {toggle ? <PopUp handleClickCancel={handleTogglePopUp} onChange={handleChange} onClickRunBuild={handleRunBuild} isMobile={isMobile}/> : null}
      </Content>
      <Footer isMobile={isMobile}/>
    </Page>
  )
}

const mapStateToProps = ({ history }) => ({
  isLoading: history.isLoading,
  buildList: history.buildList,
  repoName: history.repoName,
  runNewBuild: history.runNewBuild
});

export const ConnectedHistoryPage = connect(mapStateToProps, { getBuildListThunk, postNewBuildQueue })(HistoryPage);