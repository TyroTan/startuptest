import React from "react";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";
import {
  variant,
  border,
  compose,
  layout,
  flexbox,
  color,
  space,
} from "styled-system";
import { theme } from "styles/theme";
import { mscale } from "utils/scales-util";

export const StyledBox = styled.View`
  background-color: ${(props: any) => props.theme.colors.background2};

  ${variant({
    variants: {
      card: {
        padding: mscale(20),
        borderTopRightRadius: mscale(25),
        borderTopLeftRadius: mscale(25),
        backgroundColor: theme.colors.background2,
      },
      cardButton: {
        // width: "100%",
        backgroundColor: theme.colors.main,
        padding: mscale(15),
        marginBottom: mscale(17),
        alignSelf: "center",
        borderRadius: mscale(15),

        // shadowColor: "rgba(0, 0, 0, 0.35)",
        // shadowColor: "rgba(59, 108, 129, 0.95)",
        // shadowOffset: "0px 10px",
        // shadowOpacity: 0.25,
        // shadowRadius: mscale(7),
        // elevation: 5,
      },
    },
  })};

  ${compose(border, space, layout, flexbox, color)};
`;

StyledBox.defaultProps = {
  variant: "normal",
};

// had to use type "any",
// could be better, had I we used other styling framework that supports type guarding
export const StyledBoxShadowed = (props: any) => {
  return (
    <StyledBox
      backgroundColor={theme.colors.main}
      variant="cardButton"
      style={[
        { shadowColor: "black" },
        {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
      ]}
      {...props}
    />
  );
};

export default StyledBox;
