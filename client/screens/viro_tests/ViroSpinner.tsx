import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroSpinner,
} from '@viro-community/react-viro';
import React from 'react';
import {StyleSheet} from 'react-native';
import {handleTrackingUpdated} from '../../utils/handleTrackingUpdated';

const HelloWorldSceneAR = () => {
  return (
    <ViroARScene onTrackingUpdated={handleTrackingUpdated}>
      <ViroSpinner type="light" position={[0, 0, -2]} />
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
