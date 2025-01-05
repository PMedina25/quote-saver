import { WorksContext } from "@/context/WorksContext";
import { Link, RelativePathString } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Icon, MD3Colors } from "react-native-paper";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type ItemData = {
  id: number;
  title: string;
};

type ItemProps = {
  item: ItemData;
};

export default function WorkItem({ item }: ItemProps) {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={(prog, drag) => RightAction(prog, drag, item.id)}
      >
        <Link
          href={{
            pathname: `/${item.id}` as RelativePathString,
            params: { id: item.id },
          }}
          style={styles.item}
        >
          <TouchableOpacity>
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        </Link>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  itemId: number
) {
  const db = useSQLiteContext();
  const { removeWork } = useContext(WorksContext);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  const handleDelete = async () => {
    try {
      await db.runAsync("DELETE FROM works WHERE id = ?", itemId);
      removeWork(itemId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable style={styles.rightAction} onPress={handleDelete}>
        <Icon source="delete" color={MD3Colors.neutralVariant100} size={20} />
      </Pressable>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  item: {
    height: 40,
    padding: 6,
  },
  text: {
    fontSize: 16,
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
    backgroundColor: MD3Colors.error50,
  },
});
