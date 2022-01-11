import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import Question from "screens/Question";
import { SafeAreaProvider as SafeAreaProviderCmp } from "react-native-safe-area-context";
import { theme } from "styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={{ height: 200 }} />
          <Question />
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    // position: "absolute",
    backgroundColor: theme.colors.background,
  },
});

const SafeAreaProvider = styled(SafeAreaProviderCmp)`
  background-color: ${(props: any) => props.theme.colors.background};
`;
