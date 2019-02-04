import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Button, H2, H3, Text, View } from 'native-base';
import { StyledModal } from '../../styles';
import Loading from '../../screens/Loading';
import { timeFromDate } from '../../../shared/util';

class ModalEndRentalConfirm extends React.Component {
  state = {
    loadingFetchRentalInfo: true,
  };

  static propTypes = {
    close: PropTypes.func.isRequired,
    // TODO validate
    rentalInfo: PropTypes.shape({
      rentalStartTime: PropTypes.string,
    }).isRequired,
    endRental: PropTypes.func.isRequired,
    getRentalInfo: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
  };

  async componentWillMount() {
    const { getRentalInfo } = this.props;
    await getRentalInfo();
    this.setState({ loadingFetchRentalInfo: false });
  }

  render() {
    const { loadingFetchRentalInfo } = this.state;
    const { isVisible, close, rentalInfo, endRental } = this.props;
    return (
      <Modal visible={isVisible} onBackdropPress={close} backdropOpacity={0.9}>
        <StyledModal>
          {loadingFetchRentalInfo && <Loading />}
          {!loadingFetchRentalInfo && (
            <View>
              <H2>Confirmation Page</H2>

              <H3>
                {timeFromDate(new Date(rentalInfo.startTime))} - {timeFromDate(new Date())}
              </H3>

              <View style={{ height: 160, width: '80%', backgroundColor: 'grey', alignSelf: 'center' }}>
                <Text>IMAGE</Text>
              </View>

              <Button halfWid large onPress={endRental}>
                <Text>RETURN</Text>
              </Button>
            </View>
          )}
        </StyledModal>
      </Modal>
    );
  }
}

export { ModalEndRentalConfirm };
