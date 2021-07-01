import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    Button,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import Apptext from "./Apptext";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
function AppPicker({ icon, items, placeholder, selectedItem, onSelectItem, textstyle, containerstyle, iconstyle, setimage=false, serving=false }){
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={[styles.container,containerstyle]}>
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={[styles.icon,iconstyle]}
            />
            <Apptext style={[defaultStyles.text,textstyle,{flex:1}]}>
              {selectedItem ? selectedItem.label : placeholder}
            </Apptext>
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={defaultStyles.colors.medium}
            />
          </View>
        </TouchableWithoutFeedback>
        <Modal visible={modalVisible} animationType="slide">
          <Screen style={styles.screen}>
            <Button title="Đóng" color={defaultStyles.colors.primary} onPress={() => setModalVisible(false)} />
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => {
                if(setimage){
                  return (
                    <PickerItem
                      label={item.label}
                      image={item.image}
                      protein={item.protein}
                      carb={item.carb}
                      fat={item.fat}
                      fiber={item.fiber}
                      kcal={item.kcal}
                      serving={serving}
                      onPress={() => {
                        setModalVisible(false);
                        onSelectItem(item);
                      }}
                    />
                  )
                }else{
                  return (
                    <PickerItem
                      label={item.label}
                      onPress={() => {
                        setModalVisible(false);
                        onSelectItem(item);
                      }}
                    />
                  )
                }
              }}
            />
          </Screen>
        </Modal>
      </>
   );
}

const styles = StyleSheet.create({
    screen:{
      flex:1,
    },
    container: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        paddingBottom:10,
        marginVertical: 10,
        backgroundColor: "#F1F3F4",
        borderRadius: 10,
    },
    icon: {
      marginRight: 10,
      marginTop: 3,
      marginLeft: 3,
    },
    text: {
      flex: 1,
    },
  });

export default AppPicker;