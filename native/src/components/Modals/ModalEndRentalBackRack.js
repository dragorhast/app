import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Button, H2, H3, Text, View } from 'native-base';
import ROUTES from '../../routes';
import { StyledModal, SSVG, SHeadingLeft } from '../../styles';

const ModalEndRentalBackRack = ({ nextPage, close, isVisible }) => (
  <Modal visible={isVisible} onBackdropPress={close} backdropOpacity={0.9}>
    <StyledModal>
      <View style={{ justifyContent: 'space-between', paddingHorizontal: 32, flex: 1 }}>
        <H2>Ensure Bike Is Safe</H2>

        <SSVG>
          <Image style={{ width: 200, height: 160 }} source={require('../../../assets/warning-putting-back.png')} />
        </SSVG>

        <View>
          <Text>Make sure that the bike is not blocking any path ways and is stored safely</Text>
          <SHeadingLeft>REMEMBER</SHeadingLeft>
          <Text>We will give you a discount for dropping off at one of our stations!</Text>
        </View>

        <Button halfWid onPress={nextPage}>
          <Text>Confirm</Text>
        </Button>
        <Button halfWid danger onPress={() => Actions[ROUTES.IssueReport]}>
          <Text>Issue</Text>
        </Button>
      </View>
    </StyledModal>
  </Modal>
);

ModalEndRentalBackRack.propTypes = {
  nextPage: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export { ModalEndRentalBackRack };
