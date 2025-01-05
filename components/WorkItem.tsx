import { Link, RelativePathString } from "expo-router";
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
  id: string;
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
        renderRightActions={RightAction}
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

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable style={styles.rightAction}>
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
