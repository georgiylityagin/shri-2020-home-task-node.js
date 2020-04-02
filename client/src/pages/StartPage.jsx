import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getConfig } from '../redux/actions/settings-actions';

import { Page } from '../components/Page/Page';
import { Header } from '../components/Header/Header';
import { Content } from '../components/Content/Content';
import { Footer } from '../components/Footer/Footer';
import { Button } from '../components/Button/Button';
import { TextWithIcon } from '../components/TextWithIcon/TextWithIcon';
import { ConfigInfo } from '../components/ConfigInfo/ConfigInfo';
import { Title } from '../components/Title/Title';

export const StartPage = ({ getConfig, isConfig, isMobile }) => {
  let history = useHistory();

  useEffect(() => getConfig(history), [getConfig, history]);

  return (
    <>
      {isConfig ? null : (
        <Page>
          <Header isMobile={isMobile}>
            <Link to="/">
              <Title isMobile={isMobile}>School CI server</Title>
            </Link>
            <Link to="/settings">
              <Button size="s">
                <TextWithIcon
                  img="images/settings_icon.svg"
                  text="Settings"
                  isMobile={isMobile}
                />
              </Button>
            </Link>
          </Header>
          <Content centeredV centeredH>
            <ConfigInfo />
          </Content>
          <Footer isMobile={isMobile} />
        </Page>
      )}
    </>
  );
};

const mapStateToProps = ({ settings }) => ({
  isConfig: settings.isConfig,
});

export const ConnectedStartPage = connect(mapStateToProps, { getConfig })(
  StartPage
);
