/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import _ from 'lodash';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

var filter = {
  box: 'inbox' // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
};

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

export default class App extends Component {
  render() {
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        let arr = JSON.parse(smsList);

        const arrJS = _.unionBy(arr, o => o.address).map(o => o.address);
        //console.log(smsList);
        //get object and object mess
        let arrObject = [];
        arr.forEach((value, index) => {
          if (arrObject[value.address]) {
            arrObject[value.address].push(value);
          } else {
            arrObject[value.address] = [value];
          }
        });

        // let peopleArray = Object.keys(arrObject).map(i => {
        //   if (arrObject[i] || arrObject[i].length < 2) {
        //     return arrObject[i];
        //   }
        //   return _.sortBy(arrObject[i], (a, b) => {
        //     return b.date - a.date;
        //   });
        // });
        let peopleArray = Object.keys(arrObject).map(i => {
          return [i, arrObject[i]];
        });

        peopleArray.sort((a, b) => {
          if (a[1][0].date < b[1][0].date) return 1;
          else return -1;
        });
        // const obj = [];
        // peopleArray.forEach(value => {
        //   obj[value[0]] = [...value[1]];
        // });

        console.log(peopleArray);

        //console.log(obj);
      }
    );
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
