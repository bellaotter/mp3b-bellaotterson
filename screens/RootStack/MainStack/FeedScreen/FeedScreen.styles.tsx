import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  deleteButton: {
    color: "red",
  },
  likeButton: {
    color: "blue",
  },
  text: {
    color: "gray",
    fontSize: 11,
    textAlign: "center",
  },
  textView: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});
