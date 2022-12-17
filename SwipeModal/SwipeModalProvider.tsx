import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {
  SwipeModalContext,
  SwipeModalDirection,
  SwipeModalParams,
} from './SwipeModalContext';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

const MAX_ALPHA = 0.75;

const SwipeModalProvider: React.FC<{children: React.ReactElement}> = ({
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [offset, setOffset] = useState(new Animated.Value(0));

  const [alpha, setAlpha] = useState(MAX_ALPHA);

  const animationDirection = useRef<SwipeModalDirection | undefined>();

  const backHandler = useRef<any>(null);
  const swipeModalChild = useRef<any>();

  const removeBackHandler = useCallback(() => {
    if (backHandler.current) {
      backHandler.current.remove();
    }
  }, []);

  useEffect(() => {
    return removeBackHandler;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = useCallback(
    (direction: SwipeModalDirection) => {
      setModalVisible(true);
      offset.setValue(['top', 'bottom'].includes(direction) ? -height : -width);
      Animated.timing(offset, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setAlpha(MAX_ALPHA);
    },
    [offset],
  );

  const hideModal = useCallback(
    (duration = 300) => {
      const direction = animationDirection.current ?? 'bottom';
      let value = ['top', 'bottom'].includes(direction) ? -height : -width;
      Animated.timing(offset, {
        toValue: value,
        duration,
        useNativeDriver: false,
      }).start(() => {
        setModalVisible(false);
      });

      // remove back handler on hide
      removeBackHandler();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset],
  );

  const show = useCallback(
    ({
      direction = 'bottom',
      autoHide,
      duration = 4000,
      allowBackDrop = false,
      renderChild,
    }: SwipeModalParams) => {
      animationDirection.current = direction;
      swipeModalChild.current = renderChild;
      showModal(direction);

      // add back handler to show
      backHandler.current = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (allowBackDrop) {
            hideModal();
          }
          return true;
        },
      );

      if (autoHide) {
        setTimeout(() => {
          hideModal();
        }, duration);
      }
    },
    [hideModal, showModal],
  );

  function onGestureRelease({nativeEvent}: any) {
    const {translationX, translationY} = nativeEvent;
    const direction = animationDirection.current;
    if (!direction) {
      return;
    }

    // right or left swipe released
    if (
      (direction === 'right' && translationX > 0) ||
      (direction === 'left' && translationX < 0)
    ) {
      if (Math.abs(translationX) > width * 0.3) {
        hideModal(200); // if swipe is more than 30% of screen hide the modal
      } else {
        Animated.timing(offset, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    } // top or bottom swipe released
    else if (
      (direction === 'top' && translationY < 0) ||
      (direction === 'bottom' && translationY > 0)
    ) {
      if (Math.abs(translationY) > height * 0.3) {
        hideModal(200); // if swipe is more than 30% of screen hide the modal
      } else {
        Animated.timing(offset, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
  }

  function onGestureBegin({nativeEvent}: any) {
    const {translationX, translationY} = nativeEvent;
    const direction = animationDirection.current;
    if (!direction) {
      return;
    }

    let value = 0;

    if (direction === 'right' && translationX > 0) {
      value -= translationX;
    } else if (direction === 'left' && translationX < 0) {
      value = translationX;
    } else if (direction === 'top' && translationY < 0) {
      value = translationY;
    } else if (direction === 'bottom' && translationY > 0) {
      value -= translationY;
    }

    if (value !== 0) {
      let _alpha = MAX_ALPHA;
      if (direction === 'right' || direction === 'left') {
        _alpha = (1 - Math.abs(value) / width) * MAX_ALPHA;
      } else {
        _alpha = (1 - Math.abs(value) / height) * MAX_ALPHA;
      }
      setAlpha(_alpha);
      setOffset(new Animated.Value(value));
    }
  }

  function getStyle() {
    switch (animationDirection.current) {
      case 'top':
        return {top: offset, left: 0};
      case 'left':
        return {top: 0, left: offset};
      case 'right':
        return {top: 0, right: offset};
      case 'bottom':
      default:
        return {bottom: offset, left: 0};
    }
  }

  return (
    <SwipeModalContext.Provider value={{show}}>
      {children}
      {modalVisible && (
        <View style={[styles.main, {backgroundColor: `rgba(0,0,0, ${alpha})`}]}>
          <GestureHandlerRootView>
            <PanGestureHandler
              onGestureEvent={onGestureBegin}
              onCancelled={onGestureRelease}
              onEnded={onGestureRelease}
              onFailed={onGestureRelease}>
              <Animated.View style={[styles.body, getStyle()]}>
                {swipeModalChild.current()}
              </Animated.View>
            </PanGestureHandler>
          </GestureHandlerRootView>
        </View>
      )}
    </SwipeModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  main: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'absolute',
  },
  body: {
    width,
    height,
  },
});

export default SwipeModalProvider;
