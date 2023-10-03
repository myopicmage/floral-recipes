import * as React from 'react';
import { styled, keyframes, css } from '@mui/system';
import SnackbarUnstyled from '@mui/base/SnackbarUnstyled';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';

const blue = {
  50: '#F0F7FF',
  400: '#3399FF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  200: '#E0E3E7',
};

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const Snackbar = styled(SnackbarUnstyled)(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    top: 16px;
    left: auto;
    justify-content: start;
    max-width: 560px;
    min-width: 300px;
    background-color: ${blue[50]};
    border-radius: 8px;
    border: 1px solid ${blue[400]};
    box-shadow: ${`0 5px 13px -3px ${grey[200]}`};
    padding: 0.75rem;
    color: ${blue[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    animation: ${snackbarInRight} 500ms;
    transition: transform 0.2s ease-out;
  `,
);

export default Snackbar;