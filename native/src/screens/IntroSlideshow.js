import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Text } from 'native-base';
import { setUserNotFirstTimeLoadingApp } from '../../shared/redux/ducks/user';
import THEME from '../styles/styledComponentTheme';

const images = {
  logo: require('../../assets/intro/logo.png'),
  map: require('../../assets/intro/map.png'),
  happyRide: require('../../assets/intro/happy-ride.png'),
  rainMoney: require('../../assets/intro/rain-money.png'),
  peopleMap: require('../../assets/intro/people-map.png'),
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 96,
  },
  image: {
    width: 256,
    height: 196,
    marginTop: 64,
    marginBottom: 32,
  },
  text: {
    fontSize: 22,
    fontFamily: 'source-sans',
    color: 'rgba(0, 0, 0, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 26,
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

const slides = [
  {
    key: 'screen1',
    title: 'RENTING BIKES MADE EASY!',
    text: 'Rent now or reserve\nfor in the future',
    icon: 'logo',
    colors: ['#ffffff', '#ffffff'],
  },
  {
    key: 'screen2',
    title: 'USE THE MAP',
    text: 'Or our "Find Closest" bike feature',
    icon: 'map',
    colors: ['#ffffff', '#ffffff'],
  },
  {
    key: 'screen3',
    title: 'RIDE AWAY',
    text: 'Just scan the QR on the bike or enter the 6 digit identifier',
    icon: 'happyRide',
    colors: ['#ffffff', '#ffffff'],
  },
  {
    key: 'screen4',
    title: 'GET DISCOUNT',
    text: 'For dropping off at one of our designated stations',
    icon: 'rainMoney',
    colors: ['#ffffff', '#ffffff'],
  },
  {
    key: 'screen5',
    title: 'JUST TAP 2 GO!',
    text: '',
    icon: 'peopleMap',
    colors: ['#ffffff', '#ffffff'],
  },
];

class IntroSlideShow extends React.Component {
  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingBottom: props.bottomSpacer + 16,
          width: props.width,
          height: props.height,
        },
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Text style={styles.title}>{props.title}</Text>
      <Image style={styles.image} source={images[props.icon]} />
      <Text style={styles.text}>{props.text}</Text>
    </LinearGradient>
  );

  render() {
    const { setUserNotFirstTimeLoadingApp } = this.props;
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        bottomButton
        activeDotStyle={{ backgroundColor: THEME.primary }}
        onDone={setUserNotFirstTimeLoadingApp}
      />
    );
  }
}

IntroSlideShow.propTypes = {
  setUserNotFirstTimeLoadingApp: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setUserNotFirstTimeLoadingApp,
};

export default connect(
  null,
  mapDispatchToProps
)(IntroSlideShow);
