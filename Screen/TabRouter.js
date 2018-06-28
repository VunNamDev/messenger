import React, { Component } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import DanhBa from './DanhBa';
import HopThoai from './HopThoai';
import { Tabs, Tab } from 'native-base';
export default class Router extends Component {
  render() {
    return (
      <Tabs style={{ marginLeft: 10, marginRight: 10 }} tabBarUnderlineStyle={{ backgroundColor: '#F79743' }} initialPage={0}>
        <Tab
          tabStyle={{ backgroundColor: '#FAFAFA' }}
          textStyle={{ color: '#909090', fontSize: 12 }}
          activeTabStyle={{ backgroundColor: '#FAFAFA' }}
          activeTextStyle={{ color: '#F79743', fontWeight: 'normal', fontSize: 12 }}
          heading={'Hộp thoại'.toUpperCase()}
        >
          <HopThoai {...this.props} />
        </Tab>
        <Tab
          tabStyle={{ backgroundColor: '#FAFAFA' }}
          textStyle={{ color: '#909090', fontSize: 12 }}
          activeTabStyle={{ backgroundColor: '#FAFAFA' }}
          activeTextStyle={{ color: '#F79743', fontWeight: 'normal', fontSize: 12 }}
          heading={'Danh bạ'.toUpperCase()}
        >
          <DanhBa {...this.props} />
        </Tab>
      </Tabs>
    );
  }
}
// export default TabNavigator(
//   {
//     HopThoai: {
//       screen: HopThoai
//     },
//     DanhBa: {
//       screen: DanhBa
//     }
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarLabel: ({ focused }) => {
//         const { routeName } = navigation.state;
//         let lab;
//         switch (routeName) {
//           case 'HopThoai':
//             lab = 'Hộp thoại';
//             break;
//           case 'DanhBa':
//             lab = 'Danh Bạ';
//         }

//         if (focused) return <Text style={{ fontSize: 12, textAlign: 'center' }}>{lab}</Text>;
//         return
//         <View>
//           <Text style={{ fontSize: 12, textAlign: 'center', color: '#d1cece' }}>{lab}</Text>
//           <View  ></View>
//         </View>;
//       }
//     }),

//     tabBarComponent: TabBarBottom,
//     tabBarPosition: 'top',
//     animationEnabled: true,
//     swipeEnabled: true,
//     tabBarOptions: {
//       activeTintColor: 'black',
//       inactiveTintColor: 'gray'
//     }
//   }
// );
