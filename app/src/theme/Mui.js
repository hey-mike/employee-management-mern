import React from 'react';
import {
  createMuiTheme
} from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import Grey from 'material-ui/colors/grey';

const theme = createMuiTheme({
  palette: createPalette({
    // primary: Grey["900"], // Purple and green play nicely together
    // accent: Blue
    // type: 'dark'
  }),
  overrides: {
    PrimaryButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});
export default theme;
