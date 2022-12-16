import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { fonts } from '../design/Fonts';

const Container = styled.div`
  color: red;
  bakground: red;
`;

const H2 = styled.h2`
  font: ${ fonts.xHuge.bold };
`;

const Details = styled.div`
  white-space: pre-wrap;
`;

const BreakLine = styled.br``;

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      return (
        <Container>
          <H2>

            {' '}
            <FormattedMessage {...messages.something_went_wrong} />
          </H2>
          <Details>
            {error && error.toString()}
            <BreakLine />
            {errorInfo.componentStack}
          </Details>
        </Container>
      );
    }
    return children;
  }
}

export default ErrorBoundary;


