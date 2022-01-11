/* eslint-disable import/prefer-default-export */

import { lineHeight } from "styled-system";
// import { mscale } from "utils/scales-util";

// soon import from our private npm packages
const _theme = {
  colors: {
    main: "#FFFFFF",
    secondary: "#75D9FE",
    primary: "#3B6C81",
    background: "#75D9FE",
    background2: "#3B6C81",

    typography: {
      main: "#FFFFFF",
      gray1: "#949494",
      gray2: "#ABABAB",
    },
  },
};

export const theme = {
  ..._theme,
};
