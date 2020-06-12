import React from 'react';
import {StyleSheet,ActivityIndicator,View} from 'react-native';

export const Activityindicator =({size,color})=>{
    return (
        <View style = {styles.Actcontainer}>
        <ActivityIndicator
           animating = {true}
           color = {color}
           size = {size}
           style = {styles.activityIndicator}/>
     </View>
    )
 }
const styles=StyleSheet.create(
    {
       Actcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
    }
);