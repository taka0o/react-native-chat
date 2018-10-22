import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Content, 
  Footer, 
  Text, 
  View 
} from 'native-base';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import Fire from '../Firebase';

type Props = {
  name: string
}

export default class Chat extends Component<Props> {
  constructor(props) {
    super(props);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }
  state = {
    messages: []
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
      avatar: 'https://placeimg.com/140/140/any'
    };
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    Fire.shared.off();
  }

  componentDidMount() {
    Fire.shared.on(message => 
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }

  renderBubble(props) {
    console.log('Message user id: ' + props.currentMessage.user.id);
    console.log('Fire shared uid: ' + Fire.shared.uid);
    if (props.currentMessage.user.id !== Fire.shared.uid) {
      return ( 
        <View>
          <Text>{props.currentMessage.user.name}</Text>
          <Bubble
            {...props}
          />
        </View>
      );
    } else {
      return ( 
        <View>
          <Bubble
            {...props}
          />
        </View>
      );     
    }
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <Container>
        <Header>
          <Text>Chat window</Text>
        </Header>
         <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
            renderBubble={this.renderBubble}
            renderFooter={this.renderFooter} 
          />
       <Footer />
      </Container>
    );
  }
}