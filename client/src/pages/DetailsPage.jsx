import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBuildDetails, postBuildInQueue } from '../redux/Details/details-reducer';

import { Page } from '../components/Page/Page';
import { Header } from '../components/Header/Header';
import { Content } from '../components/Content/Content';
import { Footer } from '../components/Footer/Footer';
import { Title } from '../components/Title/Title';
import { Button } from '../components/Button/Button';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { TextWithIcon } from '../components/TextWithIcon/TextWithIcon';
import { BuildItem } from '../components/Build/BuildItem/BuildItem';
import { Log } from '../components/Log/Log';


const data = {
    "id": "6a75b785",
    "configurationId": "a7cec7c0-4d65-4809-ae1b-f7ed7e6a31a2",
    "buildNumber": 1,
    "commitMessage": "обновлён readme",
    "commitHash": "f9bb5f0b469541aecfcb58d1ab220cffc4079ac7",
    "branchName": "master",
    "authorName": "SuperUser",
    "status": "Success"
}


export const DetailsPage = ( { getBuildDetails, postBuildInQueue, buildInfo, isMobile, repoName, logs} ) => {
  let history = useHistory();
  let buildId = localStorage.getItem('detailsId');

  useEffect(() => {
    getBuildDetails(buildId, history);
  }, [getBuildDetails, buildId, history]);

  // const handleRebuild = () => {
  //   postBuildInQueue({
  //     commitHash
  //   }, history);
  // }

  return (
    <Page>
      <Header isMobile={isMobile}>
        <Title isMobile={isMobile} isRepoName={true}>
          {repoName}
        </Title>
        <ButtonGroup isMobile={isMobile} headerButtons>
            <Button size='s'>
              <TextWithIcon img='../images/rebuild_icon.svg' text='Rebuild' />
            </Button>
            <Link to='/settings'>
              <Button size='s'>
                <TextWithIcon img='../images/settings_icon.svg'/>
              </Button>
            </Link>
        </ButtonGroup>
      </Header>
      <Content>
        {buildInfo.id ? <BuildItem data={buildInfo} isMobile={isMobile} isDetails={true}/> : null}
        <Log isMobile={isMobile}>{logs}</Log>
      </Content>
      <Footer isMobile={isMobile}/>
    </Page>
  )
}

const mapStateToProps = ({ details }) => ({
  isLoading: details.isLoading,
  repoName: details.repoName,
  buildInfo: details.buildInfo,
  logs: details.logs
});

export const ConnectedDetailsPage = connect(mapStateToProps, { getBuildDetails, postBuildInQueue })(DetailsPage);