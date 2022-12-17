import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useSwipeModal} from './SwipeModal/SwipeModalContext';

const Example: React.FC = () => {
  const swipeModal = useSwipeModal();

  function handleTopPress() {
    swipeModal.show({
      direction: 'top',
      allowBackDrop: true,
      renderChild: () => {
        return (
          <View style={styles.topModal}>
            <Text style={styles.modalText}>This Modal came from top</Text>
          </View>
        );
      },
    });
  }

  function handleRightPress() {
    swipeModal.show({
      direction: 'right',
      autoHide: true,
      duration: 2000,
      renderChild: () => {
        return (
          <View style={styles.rightModal}>
            <Text style={styles.modalText}>This Modal came from right</Text>
          </View>
        );
      },
    });
  }

  function handleLeftPress() {
    swipeModal.show({
      direction: 'left',
      renderChild: () => {
        return (
          <View style={styles.leftModal}>
            <Text style={styles.modalText}>This Modal came from left</Text>
          </View>
        );
      },
    });
  }

  function handleBottomPress() {
    swipeModal.show({
      direction: 'bottom',
      allowBackDrop: true,
      renderChild: () => {
        return (
          <View style={styles.bottomModal}>
            <Text style={styles.modalText}>This Modal came from bottom</Text>
          </View>
        );
      },
    });
  }

  return (
    <View style={styles.main}>
      <Button title="Top" onPress={handleTopPress} />
      <Button title="Bottom" onPress={handleBottomPress} />
      <Button title="Left" onPress={handleLeftPress} />
      <Button title="Right" onPress={handleRightPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    marginVertical: 5,
    backgroundColor: '#00BCD4',
  },
  topModal: {
    flex: 1,
    marginBottom: 300,
    backgroundColor: '#C5CAE9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    flex: 1,
    marginTop: 300,
    backgroundColor: '#26A69A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftModal: {
    flex: 1,
    marginRight: 150,
    backgroundColor: '#AB47BC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightModal: {
    flex: 1,
    marginLeft: 150,
    backgroundColor: '#BCAAA4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Example;
