import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Apptext from './Apptext';
import colors from '../config/colors';
function HLVfeedbackline({title,content,type=1,style}){
    if(type != 1 && type != 2 && type != 3 ){
        type = 1;
    }
    if(content == ""){
        content = null;
    }
    if(content == "bad"){
        var backgroundColor=colors.warning;
        content = "Không tốt";
    }
    if(content == "notbad"){
        var backgroundColor=colors.warn;
        content = "Tạm được";
    }
    if(content == "good"){
        var backgroundColor=colors.success;
        content = "Tốt";
    }
    return (
        <View style={[styles.box,style]}>
            {title && <Text style={styles.text2}>{title}</Text>}
            <Text style={{paddingRight:10}}>:</Text>
            {type == 1 && (
                <>
                {content ? (<Apptext style={[styles.text1,{backgroundColor:backgroundColor,color:colors.white}]}>{content}</Apptext>)
                        : (<Apptext style={styles.text1}>Chưa đánh giá</Apptext>)}
                </>
            )}
            {type == 2 && (
                <>
                {content ? (<Apptext style={styles.text4}>{content}/10</Apptext>)
                        : (<Apptext style={styles.text4}>0/10</Apptext>)}
                </>
            )}
            {type == 3 && (
                <>
                {content ? (<Apptext style={styles.text3}>{content}</Apptext>)
                        : (<Apptext style={styles.text3}>HLV chưa có góp ý </Apptext>)}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    box:{
        flexDirection: "row",
        width: "100%",
        alignItems:'center',      
    },
    text2: {
        fontSize: 14,
        fontWeight: "600",
        width:100,
    },
    suffix2: {
        position:"absolute",
        right:10,
        top:7,
        fontSize:14,
        color:colors.medium,
    },
    text1:{
        paddingVertical: 5,
        paddingHorizontal:10,
        marginVertical: 5,
        backgroundColor: "#F1F3F4",
        borderRadius: 7,
        minWidth:130,
        textAlign:"center",
        color:colors.grey,
    },
    text3:{
        flex:1,
        paddingVertical: 5,
        paddingHorizontal:10,
        marginVertical: 5,
        backgroundColor: "#F1F3F4",
        borderRadius: 7,
        minWidth:130,
        textAlign:"left",
    },
    text4:{
        paddingVertical: 5,
        marginVertical: 5,
    }
});

export default HLVfeedbackline;