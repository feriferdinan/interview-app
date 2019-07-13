import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  AsyncStorage,
  StatusBar,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
import IconI from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
import { Right, Left, Header } from "native-base";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { withNavigation } from 'react-navigation';
const axios = require('axios');
import configs from '../../../config'
import * as actionCrosswords from '../../redux/action';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';


class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const userId = await navigation.getParam('userId');
    const username = await navigation.getParam('username');
    this.setState({ username: username })
  }


  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header style={{ backgroundColor: 'white' }} androidStatusBarColor='black'>
          <Left>
            <Text style={{ fontSize: 20, fontWeight: 'bold', width: 190 }}>
              Selamat Datang
          </Text>
          </Left>
          <Right>
            <Menu >
              <MenuTrigger ><Icon name="more-vert" /></MenuTrigger>
              <MenuOptions >
                <MenuOption
                  onSelect={() => navigation.navigate("Profile")}
                  text='Profile' style={{ padding: 11 }} />
                <MenuOption text='Setting' style={{ padding: 11 }} />
                <MenuOption onSelect={() => Alert.alert('Konfirmasi', 'Apakah anda yakin?'
                  , [{
                    text: 'Keluar', onPress: async () => {
                      try {
                        const token = await AsyncStorage.removeItem("uid");
                        if (token == null) {
                          navigation.navigate("Register");
                        }
                      } catch (error) { console.error(error); }
                    }
                  },
                  { text: 'Batal' }
                  ]
                )} text='Keluar' style={{ padding: 11 }} />
              </MenuOptions>
            </Menu>
          </Right>
        </Header>

      )
    }
  };

  clickEventListener = item => {
    Alert.alert("Message", "Item clicked. " + item.name);
  };

  render() {
    const { navigate } = this.props.navigation;
    const { username } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#f2fcfe', '#f2fcfe']} style={{ flex: 1 }} >
          <View style={styles.wrapperContent}>
            <View style={{ alignItems: "center", flexDirection: "column", margin: 30 }}>
              <Text >Ok, {username}</Text>
              <Text style={{ fontWeight: "bold" }}>PT. Dumbways.id</Text>
              <Text>Punya 4 Pertanyaan Untukmu</Text>
            </View>
            <Text style={{ textAlign: "center", margin: 20 }}>Silahkan Ikuti</Text>
            <TouchableOpacity
              onPress={() => navigate('Camera')}
              style={{ backgroundColor: "#f4f3f4", margin: 10, padding: 30, width: "95%", borderRadius: 10, alignItems: "center" }} >
              <View style={{ flexDirection: "row" }}>
                <View style={{ paddingHorizontal: 40, alignItems: "center" }} >
                  <Icon
                    name="timer"
                    size={100}
                    color="rgba(116,123,190,0.7)"
                  />
                  <Text>8 Menit</Text>
                </View>
                <View style={{ paddingHorizontal: 40, alignItems: "center" }} >
                  <Icon
                    name="cloud-upload"
                    size={100}
                    color="rgba(116,123,190,0.7)"
                  />
                  <Text>6 MB Upload</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Question')}
            >
              <Text style={styles.buttonText}>Mulai Interview</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: state.menu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMenu: (value) => dispatch(actionCrosswords.getMenu(value))
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen))


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    width: "90%",
    borderColor: '#517da2',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    borderWidth: 2
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '100',
    color: '#517da2',
    textAlign: 'center',
    paddingHorizontal: 30
  },

  wrapperContent: {
    width: "100%",
    backgroundColor: 'rgba(86,130,163,0)',
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,

  },

});
