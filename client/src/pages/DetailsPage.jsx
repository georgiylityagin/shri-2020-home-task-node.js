import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBuildDetails, postBuildInQueue } from '../redux/actions/details-actions';

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


export const DetailsPage = ( { getBuildDetails, postBuildInQueue, buildInfo, isMobile, repoName, logs } ) => {
  let history = useHistory();
  let { id } = useParams();

  const handleRebuild = () => {
    postBuildInQueue(buildInfo, history);
  }

  useEffect(() => {
    getBuildDetails(id, history);
  }, [getBuildDetails, id, history]);

  return (
    <Page>
      <Header isMobile={isMobile}>
        <Title isMobile={isMobile} isRepoName={true}>
          {repoName}
        </Title>
        <ButtonGroup isMobile={isMobile} headerButtons>
            <Button size='s' onClick={handleRebuild}>
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
        {logs ? <Log isMobile={isMobile}>{logs}</Log> : null}
      </Content>
      <Footer isMobile={isMobile}/>
    </Page>
  )
}

const mapStateToProps = ({ details }) => ({
  repoName: details.repoName,
  buildInfo: details.buildInfo,
  logs: details.logs
});

export const ConnectedDetailsPage = connect(
  mapStateToProps,
  { getBuildDetails, postBuildInQueue }
)(DetailsPage);