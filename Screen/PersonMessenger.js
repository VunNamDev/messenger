import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { Left } from 'native-base';
import moment from 'moment';
const { width, height } = Dimensions.get('screen');

class Header extends Component {
  constructor(props) {
    super(props);
  }
  _identifiedChatfuel = address => {
    const regex = new RegExp('[A-Za-z]');
    if (regex.test(address)) {
      return 1;
    }
    return 0;
  };
  render() {
    return (
      <View style={{ height: 60, backgroundColor: '#EBEBEB', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <View style={{ height: 40, width: 40, borderRadius: 10, margin: 10, marginRight: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: 24, width: 24 }} source={require('../icons/back.png')} />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: '#3A3A3A', fontSize: 18, fontWeight: 'bold' }}>{this.props.address}</Text>
        </View>
        {console.log('adr ' + this.props.address)}
        {this._identifiedChatfuel(this.props.address) == 0 ? (
          <View style={{ marginRight: 10, width: 100, height: 60, flexDirection: 'row' }}>
            <TouchableOpacity>
              <View style={{ height: 40, width: 40, borderRadius: 10, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 24, width: 24 }} source={require('../icons/call.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ height: 40, width: 40, borderRadius: 10, margin: 10, marginLeft: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 24, width: 24 }} source={require('../icons/orange_more.png')} />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.props.onClick();
            }}
          >
            <View style={{ height: 40, width: 40, borderRadius: 10, margin: 10, marginLeft: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f79743' }}>XOÁ</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
let lastDate = new Date();

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#FAFAFA'
    };

    console.log(lastDate);
  }

  _compareDate = date => {
    if (date.toLocaleDateString() == lastDate.toLocaleDateString()) {
      return 1;
    }
    lastDate = date;
    {
      console.log('so sánh 2' + date + ' vafff ' + lastDate);
    }
    return 0;
  };
  render() {
    const { item, index, clickItem } = this.props;
    const isShowTick = this.props.status;
    this.date = new Date(item.date);

    return (
      <View style={{ flex: 1 }}>
        {this._compareDate(this.date) == 0 ? (
          <View
            style={{
              justifyContent: 'center',
              height: 20,
              marginLeft: 10,
              marginRight: 10,
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: '#BEBEBE' }} />
            <View style={{ flex: 2, height: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 12 }}>{this.date.toLocaleDateString()}</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: '#BEBEBE' }} />
          </View>
        ) : null}
        {item.type == 1 ? (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
            {isShowTick ? (
              <TouchableOpacity
                onPress={() => {
                  clickItem(item, index);
                }}
              >
                <View
                  style={{
                    backgroundColor: item.isTick ? '#444' : '#fff',
                    width: 20,
                    height: 20,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: 'black',
                    margin: 10,
                    marginLeft: 35,
                    marginRight: 5
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 40, height: 40, borderRadius: 25, borderWidth: 1, borderColor: 'black', margin: 10, marginRight: 5 }} />
            )}
            <View style={{ flex: 2 / 3, alignItems: 'flex-end', flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#EBEBEB', borderRadius: 10, margin: 10, padding: 10, marginLeft: 0 }}>
                <Text style={{ fontSize: 16, color: '#252525' }}>{item.body}</Text>
              </View>
              <Text style={{ fontSize: 10, marginBottom: 10 }}>{moment(this.date).format('hh:mm')}</Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ flex: 2 / 3, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, marginBottom: 10 }}>{moment(this.date).format('hh:mm')}</Text>
              <View
                style={{
                  alignItems: 'flex-end',
                  backgroundColor: '#37B7C0',
                  borderRadius: 10,
                  margin: 10,
                  padding: 10,

                  marginRight: 0
                }}
              >
                <Text style={{ fontSize: 16, color: '#252525' }}>{item.body}</Text>
              </View>
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 25, borderWidth: 1, borderColor: 'black', margin: 10, marginLeft: 5 }} />
          </View>
        )}
      </View>
    );
  }
}

export default class PersonMessenger extends Component {
  constructor(props) {
    super(props);
    (this.data = this.props.navigation.state.params.data[1].map(e => {
      return { ...e, isTick: false };
    })),
      (this.state = {
        address: this.props.navigation.state.params.data[0],
        data: this.data,
        status: false
      });
  }

  _identifiedChatfuel = address => {
    const regex = new RegExp('[A-Za-z]');
    if (regex.test(address)) {
      return 1;
    }
    return 0;
  };
  onClick = () => {
    this.setState({
      status: !this.state.status
    });

    //alert(this.state.status);
  };
  clickItem = (item, index) => {
    const list = this.state.data;
    list[index].isTick = !list[index].isTick;
    this.setState({ data: list });
  };
  render() {
    return (
      <View style={styles.container}>
        {console.log(this.state.address)}
        <Header address={this.state.address} {...this.props} onClick={this.onClick} />

        <View style={{ flex: 1, transform: [{ scaleY: 1 }] }}>
          <FlatList
            style={{ flex: 1 }}
            showsHorizontalScrollI={false}
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            keyExtractor={({ item, index }) => index + ''}
            renderItem={({ item, index }) => {
              return <Item key={index} item={item} index={index} status={this.state.status} clickItem={this.clickItem} />;
            }}
          />

          {this._identifiedChatfuel(this.state.address) == 0 ? (
            <View style={{ marginBottom: 0 }}>
              <View style={{ height: 1, backgroundColor: '#EBEBEB' }} />
              <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, alignItems: 'flex-end' }}>
                <TouchableOpacity>
                  <View style={{ height: 35, width: 35, marginBottom: 10, borderWidth: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 40 }} />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,

                    margin: 5,
                    flexDirection: 'row',

                    paddingTop: 7,
                    alignItems: 'flex-end'
                  }}
                >
                  <TextInput
                    placeholder={'Nhập tin nhắn'}
                    underlineColorAndroid={'transparent'}
                    multiline={true}
                    style={{ marginBottom: 7, flex: 1, padding: 1, fontSize: 18 }}
                  />
                  <View style={{ height: 25, width: 25, borderRadius: 5, borderWidth: 1, marginBottom: 10 }} />
                </View>
                <TouchableOpacity>
                  <View style={{ height: 35, width: 45, borderRadius: 15, borderWidth: 1, marginBottom: 10 }} />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
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
