import React from 'react';
import { Link } from "react-router-dom";

import { Page } from '../Page/Page';
import { Header } from '../Header/Header';
import { Content } from '../Content/Content';
import { Footer, ConnectedFooter } from '../Footer/Footer';
import { Button } from '../Button/Button';
import { TextWithIcon } from '../TextWithIcon/TextWithIcon';
import { ConfigInfo } from '../ConfigInfo/ConfigInfo';

export const StartPage = () => {
  return (
    <Page>
      <Header title='School CI server'>
        <Link to="/settings">
          <Button size='s'>
            <TextWithIcon img='images/settings_icon.svg' text='Settings' />
          </Button>
        </Link>
      </Header>
      <Content>
        <ConfigInfo />
      </Content>
      <Footer />
    </Page>
  )
}
