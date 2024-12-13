import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { theme } from "../theme";

type ShoppingListItemProps = {
  name: string;
  isCompleted?: boolean;
};

function ShoppingListItem({ name, isCompleted }: ShoppingListItemProps) {
  function handleDelete() {
    Alert.alert(
      "Are you sure you want to delete this?",
      "It will be gone",

      [
        {
          text: "Yes",
          onPress: () => console.log("Ok, deleting"),
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
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>

      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.8}
        style={[
          styles.button,
          isCompleted ? styles.completedButton : undefined,
        ]}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ShoppingListItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: "#1a759f",
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: { fontSize: 18, fontWeight: "200" },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  completedText: {
    color: theme.colorGrey,
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
  },
  completedButton: {
    backgroundColor: theme.colorGrey,
  },
});
