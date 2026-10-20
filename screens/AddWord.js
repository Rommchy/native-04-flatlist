import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";

function AddWord({ switchScreen, setWords }) {
  const [text, setText] = useState("");
  const [wordInfo, setWordInfo] = useState(null);

  useEffect(() => {
    const word = text.trim().toLowerCase();

    if (!word) {
      setWordInfo(null);
      return;
    }

    let ignore = false;

    const timer = setTimeout(async () => {
      const info = await getWordInfo(word);
      if (!ignore) {
        setWordInfo(info);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      ignore = true;
    };
  }, [text]);

  function handleAdd() {
    setWords((prev) => [...prev, wordInfo]);
    switchScreen();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        name="arrow-back-outline"
        size={28}
        color="black"
        onPress={switchScreen}
      />
      <Image source={require("../assets/add.png")} style={styles.image} />
      <Text>Your word to search</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="type here.."
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.textInput}
      />

      {wordInfo && (
        <View>
          <View style={styles.row}>
            <Text style={styles.word}>{wordInfo.word}</Text>
            {wordInfo.audio ? (
              <Ionicons
                name="volume-medium-outline"
                size={24}
                onPress={() => playSound(wordInfo.audio)}
              />
            ) : null}
          </View>
          {wordInfo.phonetics ? <Text>{wordInfo.phonetics}</Text> : null}
          {wordInfo.partOfSpeech ? <Text>{wordInfo.partOfSpeech}</Text> : null}
          <Text>{wordInfo.meaning}</Text>
          <Button title="Add" onPress={handleAdd} />
        </View>
      )}
    </SafeAreaView>
  );
}

export default AddWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#d3c9c9",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  word: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
