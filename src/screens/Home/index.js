import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  AsyncStorage,
} from "react-native"
import { Icon } from "react-native-elements"
import { Right, Left, Header } from "native-base"
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { withNavigation } from 'react-navigation'
import * as actionInterview from '../../redux/action'
import { connect } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: ""
    }
  }

  async componentWillMount() {
    const { navigation } = this.props
    const username = await navigation.getParam('username')
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
                        const token = await AsyncStorage.removeItem("uid")
                        if (token == null) {
                          navigation.navigate("Register")
                        }
                      } catch (error) { console.error(error) }
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
  }

  clickEventListener = item => {
    Alert.alert("Message", "Item clicked. " + item.name)
  }

  render() {
    const { navigate } = this.props.navigation
    const { username } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.wrapperTop}>
            <View style={{ alignItems: "center", flexDirection: "column", margin: '7%' }}>
              <Text >Ok, {username}</Text>
              <Text style={{ fontWeight: "bold" }}>PT. Dumbways.id</Text>
              <Text>Punya 4 Pertanyaan Untukmu</Text>
            </View>
            <Text style={{ textAlign: "center", margin: '5%' }}>Silahkan Ikuti</Text>
          </View>
          <View
            style={styles.boxInformation} >
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingHorizontal: wp("11%"), alignItems: "center" }} >
                <Icon
                  name="timer"
                  size={100}
                  color="rgba(116,123,190,0.7)"
                />
                <Text>4 Menit</Text>
              </View>
              <View style={{ paddingHorizontal: wp("11%"), alignItems: "center" }} >
                <Icon
                  name="cloud-upload"
                  size={100}
                  color="rgba(116,123,190,0.7)"
                />
                <Text>6 MB Upload</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('Question')}
          >
            <Text style={styles.buttonText}>Mulai Interview</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    menu: state.menu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMenu: (value) => dispatch(actionInterview.getMenu(value))
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen))


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  button: {
    borderColor: '#517da2',
    borderRadius: 25,
    marginVertical: 50,
    marginHorizontal: "30%",
    paddingVertical: "3%",
    paddingHorizontal: '3%',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '100',
    color: '#517da2',
    textAlign: 'center',
  },
  wrapperTop: {
    width: wp("100%"),
    backgroundColor: 'rgba(86,130,163,0)',
    flexDirection: "column",
    alignItems: "center",
    padding: hp('2%'),
  },
  boxInformation: {
    backgroundColor: "#f4f3f4",
    margin: wp("2%"),
    padding: wp('4%'),
    width: wp("96%"),
    borderRadius: hp("2%"),
    alignItems: "center"
  }
})
