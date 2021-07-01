import React, { useRef, useState } from 'react';
import { Animated,View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Apptext from '../Apptext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import ImageInputList from '../ImageInputList';
import HeightSpace from '../HeightSpace';
import defaultStyle from '../../config/styles';
import AppForm from '../forms/AppForm';
import {createYupSchema} from '../../auth/createYupSchema';
import * as Yup from "yup";
import SubmitButton from '../forms/SubmitButton';
import AppFormField from '../forms/AppFormField';
import AppTextInput from '../AppTextInput';
import HLVfeedbackline from '../HLVfeedbackline';


function SingleTask({item}){
    const [getItem,setItem] = useState(item);
    const [toggle,setToggle] = useState(false);
    const [imageUris,setImageUris]=useState(getItem.image);
    var achivement = item.achievement;
    var hlv = getItem.hlv;
    const yepSchema = achivement.reduce(createYupSchema, {});
    const validateSchema = Yup.object().shape(yepSchema);
    const initialValues = {};
    achivement.forEach(element => {
        initialValues[element.key]=element.value;
    });

    const animate = useRef(new Animated.Value(0)).current;
    
    const handleSubmit1 = ()=>{
        console.log(getItem.id);
        var count = (getItem.achievement).length;
        var n = 400 + 70 + 45*count;
        Animated.timing(animate, {
            toValue: n,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setToggle(true);
    }
    const handleSubmit2 = ()=>{
        Animated.timing(animate, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setToggle(false);
    }
    const handleAdd = uri => {
        setImageUris([...imageUris, uri]);
    }
    const handleRemove = uri => {
        setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
    }
    const handleSaveTask = (informations)=>{
        for (var prop in informations) {
            if (!informations.hasOwnProperty(prop)) continue;
            var k = 0;
            getItem.achievement.forEach(e=>{
                if(item['achievement'][k]['key'] == prop){
                    item['achievement'][k]['value'] = informations[prop];
                }
                k++;
            })
        }
        getItem.status = 'yes';
        getItem.image = imageUris;
        setItem(getItem);
        handleSubmit2();
    }
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Apptext style={styles.title}>{getItem.title}</Apptext>
                <View style={styles.icon}>
                    {getItem.status == 'yes' ? (
                        <MaterialCommunityIcons style={[styles.status,{backgroundColor:colors.success}]} name="progress-check" size={23} color={colors.white} />
                    ):(
                        <MaterialCommunityIcons style={[styles.status,{backgroundColor:colors.warning}]} name="progress-close" size={23} color={colors.white} />
                    )}
                    {toggle ?(
                        <TouchableOpacity onPress={handleSubmit2}>
                            <MaterialCommunityIcons name="chevron-down" size={35} color={colors.primary} />
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity onPress={handleSubmit1}>
                            <MaterialCommunityIcons name="chevron-right" size={35} color={colors.primary} />
                        </TouchableOpacity>
                    )}
                    
                </View>
            </View>
            <Animated.View style={{
                height:animate,
                paddingRight:5,
            }}>
                <AppForm
                    initialValues={initialValues}
                    onSubmit={handleSaveTask}
                    validationSchema={validateSchema}
                >
                <HeightSpace height={5}/>
                <HeightSpace height={2} style={{backgroundColor:colors.secondary}} />
                <HeightSpace height={10}/>
                <View style={styles.wrap}>
                    <Apptext style={defaultStyle.taskTitle}>Add from check / Hình ảnh</Apptext>
                </View>
                <ImageInputList imageUris={imageUris} onRemoveImage={handleRemove} onAddImage={handleAdd} />
                <HeightSpace height={15}/>
                <View style={styles.wrap}>
                    <Apptext style={defaultStyle.taskTitle}>Thành tích của bạn</Apptext>
                </View>
                
                <FlatList 
                style={{paddingHorizontal:15}}
                data={achivement}
                keyExtractor={(achi) => achi.key}
                renderItem={({ item }) => {
                let keyboardType = item.validationType == 'number'?'numeric':'default';
                return (
                        <>
                        {item.key == 'description' ? (
                        <>
                        <AppFormField
                        keyboardType={keyboardType}
                        name={item.key}
                        multiline
                        numberOfLines={3}
                        title={item.title}
                        typeSecond="yes"
                        maxHeight={60}
                        />
                        </>
                        ) : (
                        <>
                        <AppFormField
                        keyboardType={keyboardType}
                        name={item.key}
                        title={item.title}
                        suffix={item.unit}
                        typeSecond="yes"
                        />
                        </>
                        )}
                        </>
                    )
                }
                }
                />
                <HeightSpace height={10}/>
                <View style={styles.wrap}>
                    <Apptext style={defaultStyle.taskTitle}>HLV đánh giá task</Apptext>
                </View>
                <View style={{paddingHorizontal:15}}>
                    <HLVfeedbackline title="Đánh giá" content={hlv.evaluate} type={1} />
                    <HLVfeedbackline title="Điểm đánh giá" content={hlv.point} type={2} />
                    <AppTextInput title="HLV góp ý" defaultValue={hlv.feedback} multiline numberOfLines={3} maxHeight={60} typeSecond="yes" editable={false} />
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end',}}>
                <SubmitButton title="HOÀN THÀNH" top={20} bottom={10} fontweight="bold" color="primary" style={styles.buttonOut} style2={styles.button} />
                </View>
                </AppForm>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        borderColor:colors.light,
        borderWidth:1,
        borderRadius:7,
        marginVertical:5,
        paddingVertical:5,
        paddingLeft:10,
        paddingRight:5,
        overflow:'hidden',
        height:"auto",
    },
    box:{
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent:"space-between",
        alignItems:"center",
    },
    icon:{
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent:"space-between",
        alignItems:"center",
    },
    status:{
        marginRight:10,
        padding:3,
        borderRadius:5,
    },
    wrap:{
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    title:{
        fontWeight:"700",
        color:colors.medium,
        letterSpacing:0.5,
    },
    button:{
        fontSize:12,
        paddingVertical:7,
    },
    buttonOut:{
        width:120,
    }
});

export default SingleTask;