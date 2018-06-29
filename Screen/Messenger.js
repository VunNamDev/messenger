import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import Router from './TabRouter';
import { TestModul } from '../libs/AIBModul';
import SmsListener from 'react-native-android-sms-listener';
import { DeviceEventEmitter } from 'react-native';
export default class Messenger extends Component {
  constructor(props) {
    super(props);
    // let x = '10';
    // TestModul.callNativeToReact(x, data => {
    //   alert(data);
    // });
  }
  componentWillMount() {
    DeviceEventEmitter.addListener('EVET_TEST', event => {
      console.log('DeviceEventEmitter ' + JSON.stringify(event));
    });
  }
  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            marginTop: 10,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: '#969696'
          }}
        >
          <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableOpacity>
              <View style={{ height: 35, width: 35, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 25, width: 25 }} source={require('../icons/find.png')} />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                margin: 5,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TextInput placeholder={'Tìm kiếm'} underlineColorAndroid={'transparent'} style={{ flex: 1, padding: 1, fontSize: 18 }} />
              <TouchableOpacity>
                <View style={{ height: 35, width: 35, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={{ height: 25, width: 25 }} source={require('../icons/micro.png')} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <View style={{ height: 35, width: 35, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 25, width: 25 }} source={require('../icons/more.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Router {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  }
});
