import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { theme } from "../theme";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

type ShoppingListItemProps = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: ShoppingListItemProps) {
  function handleDelete() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Are you sure you want to delete this?",
      "It will be gone",

      [
        {
          text: "Yes",
          onPress: () => onDelete(),
          style: "destructive",
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );
  }

  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={onToggleComplete}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          style={[
            styles.itemText,
            isCompleted ? styles.completedText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>

      <TouchableOpacity hitSlop={20} onPress={handleDelete}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

export default ShoppingListItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: "#1a759f",
    borderBottomWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: { fontSize: 18, fontWeight: "200", marginLeft: 8, flex: 1 },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  completedText: {
    color: theme.colorGrey,
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});
