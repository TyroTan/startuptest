import styled from "styled-components/native";
import React from "react";
import {
  variant,
  space,
  typography,
  compose,
  layout,
  color,
  border,
} from "styled-system";
import { mscale } from "utils/scales-util";
import { theme } from "styles/theme";
import type { TextProps } from "react-native";

const StyledTextBase = styled.Text`
  letter-spacing: 0;
  text-align: center;
  font-size: ${mscale(12)};
  line-height: ${mscale(17)};
  color: ${({ theme }: any) => theme.colors.typography.main};

  ${variant({
    variants: {
      instruction: {
        fontSize: mscale(12),
      },
      sentenceGiven: {
        fontSize: mscale(16),
      },
      wordGiven: {
        fontSize: mscale(18),
        fontWeight: "bold",
      },
      sentenceQuestion: {
        fontSize: mscale(18),
      },
      option: {
        color: theme.colors.primary,
      },
    },
  })};

  ${compose(space, border, color, layout, typography)};
`;

export const StyledText = (allProps: any) => {
  return <StyledTextBase {...allProps} />;
};

export const StyledTextOption = ({ children }: TextProps) => {
  return <StyledText variant="option">{children}</StyledText>;
};
