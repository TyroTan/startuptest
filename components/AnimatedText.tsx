import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import type { TextProps, ViewStyle } from "react-native";
import { mscale } from "utils/scales-util";

interface AnimatedTextProps extends TextProps {
  wrapperStyle?: ViewStyle;
  onFinish?: () => void;
}

const styles = StyleSheet.create({
  default: {
    letterSpacing: 0,
    textAlign: "center",
    fontSize: mscale(12),
    lineHeight: mscale(17),
  },
});

export const AnimatedText = (props: AnimatedTextProps) => {
  const duration = 1000;
  const { children: text, onFinish, style, wrapperStyle } = props;

  const [textArr, setTextArr] = useState((text as string).trim().split(" "));
  const [animatedValues, setAnimatedValues] = useState<null | any>(null);

  useEffect(() => {
    setTextArr((text as string).trim().split(" "));
  }, [text]);

  useEffect(() => {
    setAnimatedValues(
      textArr.map((_, i) => {
        return new Animated.Value(0);
      })
    );
  }, [textArr]);

  useEffect(() => {
    if (animatedValues) {
      animateStart();
    }
  }, [animatedValues]);

  const animateStart = (toValue = 1) => {
    const animations = textArr.map((_, i) => {
      return Animated.timing(animatedValues[i], {
        toValue,
        duration,
        useNativeDriver: true,
      });
    });

    Animated.stagger(
      duration / 5,
      toValue === 0 ? animations.reverse() : animations
    ).start();
    // ).start(() => {
    //   setTimeout(() => animateStart(toValue === 0 ? 1 : 0), 1000);
    //   onFinish?.();
    // });
  };

  if (!animatedValues) {
    return <></>;
  }

  return (
    <>
      {textArr.map((word, index) => {
        const translateXInterpolated = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        });

        return (
          <Animated.Text
            key={`${word}-${index}`}
            style={[
              styles.default,
              style ?? {},
              {
                opacity: animatedValues[index],
                transform: [
                  {
                    translateX: translateXInterpolated,
                  },
                ],
              },
            ]}
          >
            {word}
            {`${index < textArr.length ? " " : ""}`}
          </Animated.Text>
        );
      })}
    </>
  );
};
