import { View, Text, Button, SafeAreaView } from 'react-native';
import React from 'react';

const App = () => {
  return (
    <SafeAreaView>
      <View style={{height:"100%"}}>
        <View
          style={{
            padding: 8,
            backgroundColor: 'white',
            flex: 1,
            flexDirection:"row",
            justifyContent:"space-between"

          }}
        >
          <Text>App</Text>
          <View><Button  title='Click Me'/></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
