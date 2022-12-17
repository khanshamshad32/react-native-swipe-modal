# react-native-swipe-modal
A react native library, provides a Modal that supports transition from all direction with swipe to close it.

- supports sliding from all directions
- support closing on backdrop press(Android)


<img src='https://user-images.githubusercontent.com/32536287/206968597-c0ef2d90-f476-4415-9730-79fc44d71cde.gif' width='30%'/>





## Usage

Wrap root component in `SwipeModalProvider` 

`import {SwipeModalProvider} from 'react-native-swipe-modal';`



In chlid component, where modal needs to be displayed, import `useSwipeModal` and call its show method to show modal

`import {useSwipeModal} from 'react-native-swipe-modal';`


`const swipeModal = useSwipeModal();`

`swipeModal.show({
  direction: 'top',
  renderChild: () => {
    return modalContent
  },
});`


#### Other params of show 

`SwipeModalDirection = 'top' | 'right' | 'bottom' | 'left';`

- direction?: SwipeModalDirection;
- allowBackDrop?: boolean;
- autoHide?: boolean;
- duration?: number;
- renderChild: () => React.ReactElement;




