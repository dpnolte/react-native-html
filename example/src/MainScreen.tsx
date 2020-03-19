import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from './RootStack';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
}

export const MainScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('BasicExample')}
      >
        <Text style={styles.touchableLabel}>Basic Example</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('ListIndicatorExample')}
      >
        <Text style={styles.touchableLabel}>List Indicator Example</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('CustomNodeExample')}
      >
        <Text style={styles.touchableLabel}>Custom Node Example</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  touchable: {
    marginVertical: 20,
  },
  touchableLabel: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
