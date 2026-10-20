import {
  FlatList,
  ScrollView,
  Image,
  Text,
  Button,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../services/soundHandler";

function AllWords({ words, switchScreen, setWords }) {
  function deleteWord(word) {
    setWords((prev) => prev.filter((item) => item.word !== word));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/title-reading-side.png")}
        style={{ width: "100%", height: 150, resizeMode: "contain" }}
      />
      <Pressable style={styles.addButton} onPress={switchScreen}>
        <Ionicons name="add-outline" size={32} color="white" />
      </Pressable>
      <FlatList
        data={words}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.text}>
              <Text style={styles.word}>{item.word}</Text>
              <Text>{item.meaning}</Text>
            </View>
            <Ionicons
              name="play-outline"
              size={24}
              onPress={() => playSound(item.audio)}
            />
            <Ionicons
              name="trash-outline"
              size={24}
              onPress={() => deleteWord(item.word)}
            />
          </View>
        )}
        ListEmptyComponent={() => <Text>No words yet</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#d3c9c9",
  },
  image: { width: "100%", height: 150 },
  addButton: {
    alignSelf: "flex-end",
    margin: 10,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#001a6e",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
  },
  text: { flex: 1 },
  word: { fontWeight: "bold" },
});

export default AllWords;
