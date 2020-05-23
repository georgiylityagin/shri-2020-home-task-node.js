import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

type BuildTimeInfoProps = {
  isMobile: boolean,
  isDetails?: boolean,
  start: string,
  duration: number
}

const BuildTimeInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  ${(props: Partial<BuildTimeInfoProps>) => (props.isMobile || props.isDetails) && 'flex-direction: row;'}
  ${(props: Partial<BuildTimeInfoProps>) =>
    (props.isMobile || props.isDetails) &&
    'border-top: 1px solid var(--grey-50);'}
  ${(props: Partial<BuildTimeInfoProps>) =>
    (props.isMobile || props.isDetails) && 'padding-top: var(--space-xxxs);'}
  ${(props: Partial<BuildTimeInfoProps>) =>
    props.isDetails && !props.isMobile && 'margin-top: var(--space-xxxs);'}

  & > div:first-child {
    ${(props) =>
      props.isMobile || props.isDetails
        ? 'margin-right: 10px;'
        : 'margin-bottom: 12px'};
  }
`;

const BuildTime = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;

  & > img {
    margin-right: var(--space-xxxxs);
  }

  & > div {
    font-size: var(--font-size-s);
    line-height: var(-line-height-xs);
    letter-spacing: var(--letter-spacing-s);
    color: ${(props: Partial<BuildTimeInfoProps>) =>
      props.isDetails
        ? 'var(--text-color-default)'
        : 'var(--text-color-secondary)'};
    white-space: nowrap;
  }
`;


export const BuildTimeInfo: React.FC<BuildTimeInfoProps> = ({ isMobile, isDetails, start, duration }) => {
  const { t, i18n } = useTranslation();
  let prefix = isDetails ? '../' : '';

  const formatDuration = (duration: number): string => {
    const date = new Date(duration * 60000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formatHours = hours ?
      `${hours} ${t('buildTime hours')} ` :
      '';
    
    const formatMinutes = `${minutes} ${t('buildTime minutes')}`;
  
    return formatHours + formatMinutes;
  }



  return (
    <BuildTimeInfoStyled isMobile={isMobile} isDetails={isDetails}>
      <BuildTime isMobile={isMobile} isDetails={isDetails}>
        <img src={`${prefix}images/calendar_icon.svg`} alt="" />
        <div>
          {start !== undefined
          ? format(new Date(start), 'd MMM HH:mm', { locale: i18n.language === 'ru' ? ru : enUS }) 
          : '..., ...'
        }
        </div>
      </BuildTime>
      <BuildTime isMobile={isMobile} isDetails={isDetails}>
        <img src={`${prefix}images/stopwatch_icon.svg`} alt="" />
        <div>{duration !== undefined ? formatDuration(duration) : '...'}</div>
      </BuildTime>
    </BuildTimeInfoStyled>
  );
};
