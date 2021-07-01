import { Platform } from "react-native";
import colors from "./colors";
export default {
  colors,
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.black,
  },
  text2: {
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.black,
  },
  subtitle:{
    fontSize:16,
    fontStyle: 'italic',
    fontWeight:"700",
    borderBottomColor:colors.medium,
    borderBottomWidth:1,
    paddingHorizontal:0,
    paddingBottom:3,
    color:colors.medium,
    letterSpacing:0.3,
    marginBottom:10,
  },
  taskTitle:{
    fontSize:14,
    color:colors.black,
    backgroundColor:colors.secondaryBold,
    borderRadius:5,
    paddingHorizontal:7,
    paddingVertical:5,
    lineHeight:17,
    marginBottom:10
  }
};
