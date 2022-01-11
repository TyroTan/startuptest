import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import StyledBox, { StyledBoxShadowed } from "components/StyledBox";
import { StyledText, StyledTextOption } from "components/StyledTexts";
import { AnimatedText } from "components/AnimatedText";
import { questionnaire } from "texts-i18n/en";
import { mscale } from "utils/scales-util";
import { theme } from "styles/theme";
// import { theme } from "styles/theme";
// import { questionnaire } from "texts-i18n/en";

interface Option {
  text: string;
  answer?: true;
}

interface QuestionData {
  type: "fill_in_the_blank";
  // firstWord: "Das",
  firstWordHint: string;
  wordGiven: string;
  sentenceGiven: string;
  sentenceQuestion: string;
  options: Option[];
}

const DUMMY_DATA: QuestionData[] = [
  {
    type: "fill_in_the_blank",
    // firstWord: "Das",
    firstWordHint: "The",
    wordGiven: "house",
    sentenceGiven: "The %blank% is small.",
    sentenceQuestion: "Das %blank% ist klein.",
    options: [
      {
        answer: true,
        text: "folgen",
      },
      {
        text: "Schaf",
      },
      {
        text: "Bereiden",
      },
      {
        text: "Hause",
      },
    ],
  },
];

const RenderSentenceGiven = ({ data }: { data: null | QuestionData }) => {
  if (!data) return <></>;

  const texts = data.sentenceGiven.split(" ");
  const word = data.wordGiven;
  const len = texts.length;

  return (
    <StyledText variant="sentenceGiven" pt={10} pb={10}>
      {texts.map((text, i) => {
        const lastItem = i === len - 1;
        if (text === "%blank%") {
          return (
            <StyledText
              variant="wordGiven"
              style={{
                textDecorationLine: "underline",
              }}
            >
              {word}
              {lastItem ? "" : " "}
            </StyledText>
          );
        }
        return (
          <StyledText variant="sentenceGiven">
            {text}
            {lastItem ? "" : " "}
          </StyledText>
        );
      })}
    </StyledText>
  );
};

const RenderSentenceQuestion = ({
  data,
  selected,
}: {
  data: null | QuestionData;
  selected: number;
}) => {
  if (!data) return <></>;

  const texts = data.sentenceQuestion.split(" ");

  const word = data.wordGiven;
  const len = texts.length;

  return (
    <StyledBox
      height={mscale(80)}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      {texts.map((text, i) => {
        const lastItem = i === len - 1;

        if (text === "%blank%") {
          // StyledText variant="sentenceQuestion" pt={10} pb={10}

          if (selected > -1) {
            const selectedText = data.options?.find(
              (_, i) => i === selected
            )?.text;

            return (
              <StyledBoxShadowed>
                <AnimatedText>{selectedText}</AnimatedText>
              </StyledBoxShadowed>
            );
          }

          return (
            <StyledBox
              paddingTop={mscale(7)}
              borderBottomWidth={mscale(1)}
              borderColor="#FFF"
              width={mscale(100)}
            />
          );
        }

        return (
          <StyledText
            variant="sentenceQuestion"
            style={
              {
                // textDecorationLine: "underline",
                // textDecorationStyle: "dotted",
              }
            }
          >
            {text}
            {lastItem ? "" : "     "}
          </StyledText>
        );
      })}
    </StyledBox>
  );
};

const RenderOptionBtn = ({
  option,
  isSelected,
  onPressCallback,
  disabled,
}: {
  option: Option;
  isSelected: boolean;
  onPressCallback: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPressCallback}
      disabled={disabled}
      style={{ marginHorizontal: mscale(4) }}
    >
      {isSelected ? (
        <StyledBox
          backgroundColor={theme.colors.main}
          variant="cardButton"
          style={[{ minWidth: mscale(100), opacity: 0.3 }]}
        >
          <StyledTextOption> </StyledTextOption>
        </StyledBox>
      ) : (
        <StyledBoxShadowed>
          <StyledTextOption>{option.text}</StyledTextOption>
        </StyledBoxShadowed>
      )}
    </TouchableOpacity>
  );
};

interface RenderOptionsProps {
  data: null | QuestionData;
  onSelect: (index: number) => void;
  selected?: number;
}

const RenderOptions = ({ data, selected, onSelect }: RenderOptionsProps) => {
  if (!data?.options?.length) return <></>;

  return (
    <StyledBox alignSelf="center" width={mscale(200)} mt={40}>
      <StyledBox flexDirection="row" justifyContent="center">
        <RenderOptionBtn
          option={data.options[0]}
          isSelected={selected === 0}
          onPressCallback={() => onSelect(0)}
        />
        <RenderOptionBtn
          option={data.options[1]}
          isSelected={selected === 1}
          onPressCallback={() => onSelect(1)}
        />
      </StyledBox>
      <StyledBox flexDirection="row" justifyContent="center">
        <RenderOptionBtn
          option={data.options[2]}
          isSelected={selected === 2}
          onPressCallback={() => onSelect(2)}
        />
        <RenderOptionBtn
          option={data.options[3]}
          isSelected={selected === 3}
          onPressCallback={() => onSelect(3)}
        />
      </StyledBox>
    </StyledBox>
  );
};

const Question = () => {
  const [data, setData] = useState<null | QuestionData>(null);
  const [selected, setSelected] = useState<number>(-12);

  // *Events
  const onSelect = (index: number) => {
    setSelected(index);
  };

  useEffect(() => {
    // fetch from firebase
    setData((DUMMY_DATA as any)[0]);
  }, []);

  return (
    <StyledBox width="100%" height="70%" variant="card" pt={mscale(50)}>
      <StyledText>{questionnaire.instruction}</StyledText>
      <RenderSentenceGiven data={data} />
      <RenderSentenceQuestion data={data} selected={selected} />
      <RenderOptions data={data} selected={selected} onSelect={onSelect} />
    </StyledBox>
  );
};

export default Question;
