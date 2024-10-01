import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImagesDetail } from "@/state/storeMulti";
import GmailStyleSwipeableRow from "@/components/Swipeable";

import { useState } from "react";

const save = () => {
  const { compressDetailArray, removeItemCompressArray } = useImagesDetail();
  const [counter, setCounter] = useState<number>(0);

  const update = () => {
    setCounter((prev) => prev + 1);
    console.log(compressDetailArray);
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View>
        <GmailStyleSwipeableRow onDelete={() => removeItemCompressArray(item.index)}>
          <View style={styles.row}>
            <Text>{index + 1}.</Text>
            <Image style={{ width: 80, height: 80 }} source={{ uri: item.uri }} />
            <Text style={{ color: "gery", paddingLeft: 100 }}>{item.size / 1000} KB</Text>
          </View>
        </GmailStyleSwipeableRow>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.show}>
        <FlatList
          data={compressDetailArray}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          ItemSeparatorComponent={() => (
            <View style={{ height: 0.5, backgroundColor: "#c5c5c5" }}></View>
          )}
          ListHeaderComponent={<Text style={styles.section}>Images</Text>}
        />
      </View>
      <View style={styles.settings}>
        <TouchableOpacity onPress={update}>
          <Text>refresh</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default save;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  show: {
    flex: 1,
    // backgroundColor: "green",
  },
  settings: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "condensed",
    margin: 16,
  },
});
