import React, { useState, useEffect, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getBuildsList,
  postNewBuildQueue
} from '../redux/actions/history-actions';
import {
  RepoName,
  BuildListType
} from '../redux/reducers/history-reducer';
import { History } from 'history';
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

type HistoryPageProps = {
  getBuildsList(limit: number): void,
  postNewBuildQueue(data: string, history: History): void,
  buildList: BuildListType,
  repoName: RepoName,
  isMobile: boolean
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleDetails = (event:  MouseEvent<HTMLDivElement>) => {
    let buildId = event.currentTarget.id;
    localStorage.setItem('detailsId', buildId);
    history.push(`build/${buildId}`);
  };

  const handleRunBuild = (event: FormEvent<Element>) => {
    event.preventDefault();

    postNewBuildQueue(formValue.hash, history);
  };

  useEffect(() => {
    getBuildsList(showLimit.limit);

    setInterval(getBuildsList, 3000, showLimit.limit);
  }, [getBuildsList, showLimit.limit]);

  return (
    <Page id="historyPage">
      <Header isMobile={isMobile}>
        <Link to='/'>
          <Title id="reponame" isMobile={isMobile} isRepoName={true}>
            {repoName}
          </Title>
        </Link>
        <ButtonGroup isMobile={isMobile} headerButtons>
          <Button id='runBuild' size='s' onClick={handleTogglePopUp}>
            <TextWithIcon
              img='images/play_icon.svg'
              text='Run build'
              isMobile={isMobile}
            />
          </Button>
          <Link to='/settings'>
            <Button id='toSettings' size='s'>
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
          id="buildList"
          data={buildList}
          limit={showLimit.limit}
          handleDetails={handleDetails}
          isMobile={isMobile}
        />
        {showLimit.limit < buildList.length ? (
          <Button id='ShowMore' size='s' onClick={handleShowMore} isMobile={isMobile}>
            Show more
          </Button>
        ) : null}
        {toggle ? (
          <PopUp
            id="popUp"
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

const mapStateToProps = ({ history }: any) => ({
  buildList: history.buildList,
  repoName: history.repoName,
  runNewBuild: history.runNewBuild
});

export const ConnectedHistoryPage = connect(mapStateToProps, {
  getBuildsList,
  postNewBuildQueue
})(HistoryPage);
