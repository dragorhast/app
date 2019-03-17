import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import { Button, H1, H2, Text, View } from 'native-base';
import { StyledModal, SSVG, SHeadingLeft } from '../../styles';
import ROUTES from '../../routes';
import Loading from '../../screens/LoadingScreen';
import { timeFromDate } from '../../../shared/util';
import ManPayPhoneSVG from '../../../assets/man-paying-phone.svg';

class ModalEndRentalConfirm extends React.Component {
  state = {
    loadingFetchRentalInfo: true,
  };

  static propTypes = {
    close: PropTypes.func.isRequired,
    rentalInfo: PropTypes.shape({
      startTime: PropTypes.string,
      costSoFar: PropTypes.number,
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
            <View style={{ justifyContent: 'space-between', paddingHorizontal: 32, flex: 1 }}>
              <H2>Confirm Rental</H2>

              <SSVG>
                <ManPayPhoneSVG width={160} height={160} />
              </SSVG>

              <SHeadingLeft>Time of Ride</SHeadingLeft>
              <H1 style={{ alignSelf: 'flex-start' }}>
                {timeFromDate(new Date(rentalInfo.startTime))} - {timeFromDate(new Date())}
              </H1>

              <SHeadingLeft>Cost</SHeadingLeft>
              <H1 style={{ alignSelf: 'flex-start' }}>£{rentalInfo.costSoFar / 100}</H1>

              <Button halfWid onPress={endRental}>
                <Text>Confirm</Text>
              </Button>
              <Button halfWid danger onPress={() => Actions[ROUTES.IssueReport]}>
                <Text>Issue</Text>
              </Button>
            </View>
          )}
        </StyledModal>
      </Modal>
    );
  }
}

export { ModalEndRentalConfirm };
