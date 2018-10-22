import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Content, 
  Footer, 
  Text,
  Form,
  Item,
  Input,
  Button 
} from 'native-base';

export default class Main extends Component {

  state = {
    name: ""
  };

  updateUsername = (name) => {
    this.setState({name: name});
  }

  login = () => {
    this.props.navigation.navigate('Chat', {name: this.state.name});
  }

  render() {
    return (
      <Container>
        <Header>
          <Text>Let's chat!</Text>
        </Header>
        <Content>
          <Text>
            Login
          </Text>
          <Form>
            <Item>
              <Input 
                placeholder="Username"
                onChangeText={this.updateUsername} 
              />
            </Item>
          </Form>
          <Button onPress={this.login}>
            <Text>Connect</Text>
          </Button>
        </Content>
        <Footer />
      </Container>
    );
  }
}