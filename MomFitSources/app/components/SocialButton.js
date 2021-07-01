import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import colors from "../config/colors";
import Apptext from "./Apptext";
function SocialButton({ style, name, title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      {name && (
        <FontAwesome5
          style={styles.icon}
          name={name}
          size={28}
          color="#ffffff"
        />
      )}
      <Apptext style={style}>{title}</Apptext>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    margin: 7,
    padding: 7,
    borderRadius: 10,
    position:'relative',
    height: 53,
    flex: 1,
  },
  icon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});

export default SocialButton;
