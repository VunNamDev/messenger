import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import PersonMessengerScreen from './PersonMessenger';
import { DeviceEventEmitter } from 'react-native';
var filter = {
  box: '' //// 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
};

class Item extends Component {
  constructor(props) {
    super(props);
  }

  _messContent = (content = '') => {
    if (content.length >= 20) {
      return content.slice(0, 25) + '...';
    }
    return content;
  };
  _getDate = item => {
    const date = new Date(item[1][0].date);
    const now = new Date(Date.now());

    if (date.getDate() == now.getDate() && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
      return date.getHours() + ':' + date.getMinutes();
    }
    return date.getDate() + ' ' + 'Th' + date.getMonth();
  };
  render() {
    const { item, index, onClick } = this.props;
    this.smsNotReadCount = 0;
    item[1].forEach((item, index) => {
      if (item.read == 0) {
        this.smsNotReadCount = this.smsNotReadCount + 1;
      }
    });
    return (
      <TouchableOpacity
        onPress={() => {
          onClick(item);
        }}
      >
        <View keys={index} style={{ height: 70, flexDirection: 'row', width: null, alignItems: 'center' }}>
          <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: '#9F9F9F', borderRadius: 25, backgroundColor: 'white' }} />

          <View style={{ flex: 1, marginLeft: 15, flexDirection: 'column' }}>
            <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#282828', flex: 1 }}>{item[0]}</Text>

              {this.smsNotReadCount != 0 ? (
                <View style={{ height: 20, width: 20, backgroundColor: 'orange', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#fff' }}>{this.smsNotReadCount}</Text>
                </View>
              ) : null}
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Text style={{ color: '#9F9F9F', flex: 1 }}>{this._messContent(item[1][0].body)}</Text>
              <Text style={{ color: '#9F9F9F' }}>{this._getDate(item)}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#9F9F9F' }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default class HopThoai extends Component {
  constructor(props) {
    super(props);
    this.state = { arrMess: [] };
  }

  componentWillMount() {
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        //console.log(smsList);
        let arr = JSON.parse(smsList);

        let arrObject = [];
        arr.forEach((value, index) => {
          if (arrObject[value.address]) {
            arrObject[value.address].push(value);
          } else {
            arrObject[value.address] = [value];
          }
        });

        this.peopleArray = Object.keys(arrObject).map(i => {
          return [i, arrObject[i]];
        });

        this.peopleArray.sort((a, b) => {
          if (a[1][0].date < b[1][0].date) return 1;
          else return -1;
        });

        this.setState({
          arrMess: this.peopleArray
        });
      }
    );
    DeviceEventEmitter.addListener('EVET_TEST', event => {
      SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
          //console.log(smsList);
          let arr = JSON.parse(smsList);

          let arrObject = [];
          arr.forEach((value, index) => {
            if (arrObject[value.address]) {
              arrObject[value.address].push(value);
            } else {
              arrObject[value.address] = [value];
            }
          });

          this.peopleArray = Object.keys(arrObject).map(i => {
            return [i, arrObject[i]];
          });

          this.peopleArray.sort((a, b) => {
            if (a[1][0].date < b[1][0].date) return 1;
            else return -1;
          });

          this.setState({
            arrMess: this.peopleArray
          });
        }
      );
    });
  }

  onClick = item => {
    // item[1].sort((a, b) => {
    //   if (a.date > b.date) return 1;
    //   else return -1;
    // });
    this.props.navigation.navigate('PersonMessengerScreen', {
      data: item
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          showsHorizontalScrollI={false}
          showsVerticalScrollIndicator={false}
          data={this.state.arrMess}
          renderItem={({ item, index }) => {
            return <Item item={item} index={index} onClick={this.onClick} />;
          }}
          keyExtractor={(item, index) => index + ''}
        />
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
