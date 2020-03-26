import React from 'react'
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

export const HistoryPage = ({isMobile}) => {
  return (
    <Page>
      <Header isMobile={isMobile}>
        <Title isMobile={isMobile}>School CI server</Title>
        <ButtonGroup isMobile={isMobile} headerButtons>
            <Button size='s'>
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

      </Content>
      <Footer isMobile={isMobile}/>
    </Page>
  )
}
