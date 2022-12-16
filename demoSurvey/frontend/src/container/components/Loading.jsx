import React from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { defaultProps } from 'recompose';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eceef6;
  z-index: ${ props => props.zIndex || 1 };
  width: ${ props => props.width || '100%' };
  height: ${ props => props.height || '100%' };

  @media (min-width: 320px) and (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
  }

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }

  span {
    display: none;
  }
`;

const Loading = ({ width, height, size, zIndex, primary }) => (
  <Container width={width} height={height} zIndex={zIndex}>
    <Spinner size={size} color={primary} />
  </Container>
);

Loading.prototype = {
  size: PropTypes.string,
  color: PropTypes.string,
};

// Default Props HOC
const withDefaultProps = defaultProps({
  color: 'primary',
  size: 'lg',
});

export default withDefaultProps(Loading);
