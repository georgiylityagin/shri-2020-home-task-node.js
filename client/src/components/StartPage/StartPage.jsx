import React from 'react';
import { Link } from 'react-router-dom';

import { Page } from '../Page/Page';
import { Header } from '../Header/Header';
import { Content } from '../Content/Content';
import { Footer } from '../Footer/Footer';
import { Button } from '../Button/Button';
import { TextWithIcon } from '../TextWithIcon/TextWithIcon';
import { ConfigInfo } from '../ConfigInfo/ConfigInfo';
import { Title } from '../Title/Title';

export const StartPage = ({ isMobile }) => {
  return (
    <Page>
      <Header isMobile={isMobile}>
        <Link to='/'>
          <Title isMobile={isMobile}>School CI server</Title>
        </Link>
        <Link to='/settings'>
          <Button size='s'>
            <TextWithIcon img='images/settings_icon.svg' text='Settings' />
          </Button>
        </Link>
      </Header>
      <Content centeredV centeredH>
        <ConfigInfo />
      </Content>
      <Footer isMobile={isMobile}/>
    </Page>
  )
}
