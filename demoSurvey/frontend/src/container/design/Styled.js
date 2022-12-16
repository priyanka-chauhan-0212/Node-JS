import { css } from 'styled-components';
import Colors from './Colors';
import { fonts } from './Fonts';

const miniScrollSize = 3;
const miniScrollPadding = 5;

const scrollSize = 6;
const scrollPadding = 8;

export const x = css`
  display: flex;
  flex-direction: row;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  width: ${({ width }) => width || 100}%;
`;

export const y = css`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  width: ${({ width }) => width || 100}%;
`;

export const scrollbarYPadding = css`
  padding-right: ${scrollPadding}px;
`;

export const scrollbarXPadding = css`
  padding-bottom: ${scrollPadding}px;
`;

export const scrollbars = css`
  ::-webkit-scrollbar {
    width: ${scrollSize}px;
    height: ${scrollSize}px;

    @media (min-width: 320px) and (max-width: 767px) {
      width: ${miniScrollSize}px;
      height: ${miniScrollPadding}px;
    }
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.TextMedium};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${Colors.Text};
  }
`;

export const scrollYContainer = css`
  ${scrollbars};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const scrollXContainer = css`
  ${scrollbars};
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
`;

export const link = css`
  text-decoration: underline;
  color: ${Colors.ButtonPrimary};
  font: ${({ font }) => font || fonts.tiny.regular};
  cursor: pointer;
`;

export const fa = css`
  font-family: 'Font Awesome 5 Free';
  font-size: 1.3em;
  font-weight: 900;
  color: ${Colors.TextDark};
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
`;

export const modalBorderRadius = '4px';
