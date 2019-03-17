import React from 'react';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import { H3, Button, CheckBox, Form, Item, Label, Input, Text, View, Toast } from 'native-base';
import { Screen, CardMediumShadow, ShadowedTextArea, StyledInline } from '../styles';
import Theme from '../../native-base-theme/variables/platform';
import ROUTES from '../routes';
import withIssue, { IssueReportProps } from '../../shared/redux/containers/IssueReportContainer';

const StyledThisIsYourBikeID = styled(Text)`
  color: ${Theme.brandDanger};
  font-style: italic;
  font-size: 12;
  display: flex;
`;

class IssueReport extends React.Component {
  static propTypes = {
    ...IssueReportProps,
  };

  static defaultProps = {
    bikeId: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      bikeId: props.bikeId || '',
      description: '',
      issueWithBike: false,
    };
  }

  /**
   * Checks if there are any errors with the input  from state
   * Shows a Toast if there are any
   *
   * @returns {boolean}
   */
  areThereInputError = () => {
    const { description, issueWithBike, bikeId } = this.state;
    let errorText = null;
    if (description.length < 10) errorText = 'Must type in a proper description';

    if (issueWithBike && (!bikeId || bikeId.length < 6 || bikeId.length > 6))
      errorText = 'Issues with bike needs an Id - 6 long';

    if (errorText) {
      Toast.show({
        text: errorText,
        type: 'danger',
        position: 'top',
        duration: 5000,
        buttonText: 'okay',
      });
      return true;
    }

    return false;
  };

  /**
   * Checks for errors
   *
   * Passes Issue + reroutes to Home
   */
  sendReport = async () => {
    const { reportIssue } = this.props;
    const { bikeId, description } = this.state;

    if (this.areThereInputError()) return;
    try {
      await reportIssue({ bikeId, description });
      Actions[ROUTES.Home]();
    } catch (e) {
      // Error handles by redux toast
      return Promise.resolve();
    }
  };

  render() {
    const { issueWithBike, description, bikeId } = this.state;
    const { bikeId: bikeIdProps } = this.props;

    return (
      <Screen>
        <CardMediumShadow>
          <StyledInline>
            <H3>Is the issue with a bike?</H3>
            <CheckBox checked={issueWithBike} onPress={() => this.setState({ issueWithBike: !issueWithBike })} />
          </StyledInline>

          <Form>
            {issueWithBike && (
              <View>
                {bikeIdProps && bikeId === bikeIdProps && (
                  <StyledThisIsYourBikeID>This is your current rental's ID</StyledThisIsYourBikeID>
                )}
                <Item inlineLabel>
                  <Label>Bike ID:</Label>
                  <Input
                    value={bikeId}
                    placeHolder="6 digit ID under bike"
                    onChangeText={input => this.setState({ bikeId: input })}
                  />
                </Item>
              </View>
            )}

            <ShadowedTextArea
              rowSpan={5}
              bordered
              placeholder="What happens to be the matter..."
              value={description}
              onChangeText={input => this.setState({ description: input })}
              returnKeyType="done"
            />
          </Form>
          <Button onPress={this.sendReport} primary halfWid>
            <Text>Report</Text>
          </Button>
        </CardMediumShadow>
      </Screen>
    );
  }
}

export default withIssue(IssueReport);
