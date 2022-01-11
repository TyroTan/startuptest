import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import StyledBox, { StyledBoxShadowed } from "components/StyledBox";
import { StyledText, StyledTextOption } from "components/StyledTexts";
import { questionnaire } from "texts-i18n/en";
import { mscale } from "utils/scales-util";
// import { theme } from "styles/theme";
// import { questionnaire } from "texts-i18n/en";

interface QuestionData {
  type: "fill_in_the_blank";
  // firstWord: "Das",
  firstWordHint: string;
  wordGiven: string;
  sentenceGiven: string;
  sentenceQuestion: string;
  options: {
    text: string;
    answer?: true;
  }[];
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
  console.log("textstexts", texts);
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

const RenderSentenceQuestion = ({ data }: { data: null | QuestionData }) => {
  if (!data) return <></>;

  const texts = data.sentenceQuestion.split(" ");

  const word = data.wordGiven;
  const len = texts.length;

  return (
    <StyledBox flexDirection="row" justifyContent="center">
      {texts.map((text, i) => {
        const lastItem = i === len - 1;
        if (text === "%blank%") {
          // StyledText variant="sentenceQuestion" pt={10} pb={10}
          return (
            <StyledBox
              paddingTop={mscale(7)}
              borderBottomWidth={mscale(1)}
              borderColor="#FFF"
              width={mscale(80)}
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

const RenderOptions = ({ data }: { data: null | QuestionData }) => {
  if (!data?.options?.length) return <></>;

  return (
    <StyledBox alignSelf="center" width={mscale(200)} mt={40}>
      <StyledBox flexDirection="row" justifyContent="space-around">
        <TouchableOpacity>
          <StyledBoxShadowed mr={5} ml={5}>
            <StyledTextOption>{data.options[0].text}</StyledTextOption>
          </StyledBoxShadowed>
        </TouchableOpacity>
        <StyledBoxShadowed mr={5} ml={5}>
          <StyledTextOption>{data.options[1].text}</StyledTextOption>
        </StyledBoxShadowed>
      </StyledBox>
      <StyledBox flexDirection="row" justifyContent="space-around">
        <StyledBoxShadowed mr={5} ml={5}>
          <StyledTextOption>{data.options[2].text}</StyledTextOption>
        </StyledBoxShadowed>
        <StyledBoxShadowed mr={5} ml={5}>
          <StyledTextOption>{data.options[3].text}</StyledTextOption>
        </StyledBoxShadowed>
      </StyledBox>
    </StyledBox>
  );
};

const Question = () => {
  const [data, setData] = useState<null | QuestionData>(null);

  useEffect(() => {
    // fetch from firebase
    setData((DUMMY_DATA as any)[0]);
  }, []);

  return (
    <StyledBox width="100%" height="70%" variant="card" pt={mscale(50)}>
      <StyledText>{questionnaire.instruction}</StyledText>
      <RenderSentenceGiven data={data} />
      <RenderSentenceQuestion data={data} />
      <RenderOptions data={data} />
    </StyledBox>
  );
};

export default Question;
