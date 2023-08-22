import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './health_tracker_data'


function HealthTracker({ navigation, route }){ 
const url = (api.health_tracker ?? "health_tracker/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state

const onPressTrackActivity = () => {}
const onPressTrackNutrition = () => {}
const onPressTrackSleep = () => {}
const onPressTrackWellness = () => {}

async function getItem() {
      dispatch(actionCreators.loading())

      try {
        if (url in history){
           dispatch(actionCreators.local(history[url]))
        } else if (url.indexOf('http') > -1){
          const response = await fetch(url)
          const json = await response.json()
          if(json){
            dispatch(actionCreators.success(route.params?.id ? json : json[0], url))
          }   
        } else {
          const json = route.params?.id ? data[route.params?.id] : items.item
          dispatch(actionCreators.success(json, url))
        }
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

useEffect(() => {
    getItem();
}, []);
  
if (loading) {
    return (
        <View style={styles.center}>
        <ActivityIndicator animating={true} />
        </View>
    )
}

return(
<ScrollView style={styles.health_tracker} showsVerticalScrollIndicator={false}>
<View style={{flexDirection: 'row'}}>
<Text style={styles.overview}>{item.overview}</Text>
<View style={{flexDirection: 'column'}}>
<Text style={styles.activity} numberOfLines={1}>{item.activity}</Text>
<Text style={styles.nutrition} numberOfLines={1}>{item.nutrition}</Text>
</View>
</View>
<View style={{flexDirection: 'row'}}>
<Text style={styles.sleep} numberOfLines={1}>{item.sleep}</Text>
<Text style={styles.wellness} numberOfLines={1}>{item.wellness}</Text>
</View>
<View style={{flexDirection: 'row'}}>
<TouchableOpacity  onPress={onPressTrackActivity}>
    <View style={styles.track_activity}>{'Track Activity'}</View>
</TouchableOpacity>
<TouchableOpacity  onPress={onPressTrackNutrition}>
    <View style={styles.track_nutrition}>{'Track Nutrition'}</View>
</TouchableOpacity>
</View>
<View style={{flexDirection: 'row'}}>
<TouchableOpacity  onPress={onPressTrackSleep}>
    <View style={styles.track_sleep}>{'Track Sleep'}</View>
</TouchableOpacity>
<TouchableOpacity  onPress={onPressTrackWellness}>
    <View style={styles.track_wellness}>{'Track Wellness'}</View>
</TouchableOpacity>
</View>
</ScrollView>
)}

export default HealthTracker;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "justifyContent": "center",
        "alignItems": "center"
    },
    "overview": {
        "fontSize": 12,
        "fontWeight": "250",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "activity": {
        "flex": 1,
        "color": "#2b2b2b",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "nutrition": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "sleep": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "wellness": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "track_activity": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    },
    "track_nutrition": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    },
    "track_sleep": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    },
    "track_wellness": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    }
});