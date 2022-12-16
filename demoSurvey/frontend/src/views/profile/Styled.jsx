import styled from 'styled-components';

import Colors from '../../container/design/Colors';

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  max-width:100% !important;


  .title {
    font-size: 30px;
    font-weight: 600;
    color: #183b56;
    margin-bottom: 30px;
    margin-top: 30px;

    @media (min-width: 320px) and (max-width: 1200px) {
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      line-height: 1.6;
    }
  }

  .row-wrapper {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 10px 10px 60px #00000012;
    border-radius: 8px;
    padding: 25px;
  }

  .brand-logo {
    margin-right: 0;
    margin-left: 0;
    display: flex;
    align-items: center;

    .brand-title {
      font-size: 25px;
      font-weight: bold;
      margin-left: 30px;
      color: #183b56;

      @media (min-width: 320px) and (max-width: 550px) {
        margin-left: 25px;
      }
    }

    .profile-image {
      width: 100%;
      height:100%;
      background-size:cover;
      // min-width: 100px;
      // max-width: 100px;
      // height: 100px;
      border-radius: 8px;

    }

    .fileUploader {
      bottom: -5px;
      right: -10px;
      width: 25px;
    }

    .camera {
      border: 2px solid #ffffff;
      border-radius: 50%;
      width: 20px;
    }
  }

  .image-row.row {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }

  .row {
    margin-bottom: 30px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input {
    height: 45px;
    width: 100%;
    font-size: 12px !important;
    border-radius: 4px;
    padding-left: 10px;
    border: 1px solid ${ Colors.BorderHover };

    :focus-visible {
      outline: none;
    }
  }

  .error {
    border: 1px solid ${ Colors.FileRed };
  }

  .button {
    text-align: right;
  }

  .save-button {
    background-color: #bce897;
    color: #5f7948;
    font-size: 14px;
    height: 45px;
    width: 150px;
    border-radius: 8px !important;
    border: none;
    font-weight: 700 !important;
    margin-top: 35px;

    // :hover,
    // :active,
    // :focus,
    // :focus-visible {
    //   background-color: #bce897 !important;
    //   color: #5f7948 !important;
    //   outline: none !important;
    //   box-shadow: none !important;
    // }
  }
`;
