import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Button, H1, H2, H3, Text, View } from 'native-base';
import { StyledModal } from '../../styles';

const ModalEndRentalBackRack = ({ nextPage, close, isVisible }) => (
  <Modal visible={isVisible} onBackdropPress={close} backdropOpacity={0.9}>
    <StyledModal>
      <H3>Put back in Rack</H3>

      <View style={{ height: 160, width: '80%', backgroundColor: 'grey', alignSelf: 'center' }}>
        <Text>IMAGE</Text>
      </View>

      <Button halfWid large onPress={nextPage}>
        <Text>Back in Rack</Text>
      </Button>
    </StyledModal>
  </Modal>
);

export { ModalEndRentalBackRack };
