import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getBuildsList,
  postNewBuildQueue
} from '../redux/actions/history-actions';

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

export const HistoryPage = ({
  getBuildsList,
  postNewBuildQueue,
  buildList,
  repoName,
  isMobile
}) => {
  const [toggle, setToggle] = useState(false);
  const [showLimit, setShowLimit] = useState({
    limit: isMobile ? 3 : 10
  });
  const [formValue, setFormValue] = useState({
    hash: ''
  });

  let history = useHistory();

  const handleChange = event => {
    const { value } = event.currentTarget;
    setFormValue(state => ({ ...state, hash: value }));
  };

  const handleShowMore = () => {
    const stepShow = isMobile ? 3 : 5;
    setShowLimit(state => ({ ...state, limit: state.limit + stepShow }));
  };

  const handleTogglePopUp = () => {
    setToggle(!toggle);
  };

  const handleDetails = event => {
    let buildId = event.currentTarget.id;
    localStorage.setItem('detailsId', buildId);
    history.push(`build/${buildId}`);
  };

  const handleRunBuild = e => {
    e.preventDefault();

    postNewBuildQueue(formValue.hash, history);
  };

  useEffect(() => {
    getBuildsList(showLimit.limit);
  }, [getBuildsList, showLimit.limit]);

  return (
    <Page>
      <Header isMobile={isMobile}>
        <Link to='/history'>
          <Title isMobile={isMobile} isRepoName={true}>
            {repoName}
          </Title>
        </Link>
        <ButtonGroup isMobile={isMobile} headerButtons>
          <Button size='s' onClick={handleTogglePopUp}>
            <TextWithIcon
              img='images/play_icon.svg'
              text='Run build'
              isMobile={isMobile}
            />
          </Button>
          <Link to='/settings'>
            <Button size='s'>
              <TextWithIcon
                img='images/settings_icon.svg'
                isMobile={isMobile}
              />
            </Button>
          </Link>
        </ButtonGroup>
      </Header>
      <Content>
        <BuildList
          data={buildList}
          limit={showLimit.limit}
          handleDetails={handleDetails}
          isMobile={isMobile}
        />
        {showLimit.limit < buildList.length ? (
          <Button size='s' onClick={handleShowMore} isMobile={isMobile}>
            Show more
          </Button>
        ) : null}
        {toggle ? (
          <PopUp
            handleClickCancel={handleTogglePopUp}
            onChange={handleChange}
            onClickRunBuild={handleRunBuild}
            isMobile={isMobile}
          />
        ) : null}
      </Content>
      <Footer isMobile={isMobile} />
    </Page>
  );
};

const mapStateToProps = ({ history }) => ({
  buildList: history.buildList,
  repoName: history.repoName,
  runNewBuild: history.runNewBuild
});

export const ConnectedHistoryPage = connect(mapStateToProps, {
  getBuildsList,
  postNewBuildQueue
})(HistoryPage);
