import React, {useContext} from 'react';

export type SwipeModalDirection = 'top' | 'right' | 'bottom' | 'left';

export interface SwipeModalParams {
  direction?: SwipeModalDirection;
  allowBackDrop?: boolean;
  autoHide?: boolean;
  duration?: number;
  renderChild: () => React.ReactElement;
}

export interface SwipeModalContextValue {
  show: (params: SwipeModalParams) => void;
}

export const SwipeModalContext = React.createContext<SwipeModalContextValue>({
  show: () => {
    // empty function
  },
});

export const useSwipeModal = () => {
  const swipeModalContext = useContext(SwipeModalContext);

  if (!swipeModalContext) {
    throw new Error('useSwipeModal must be used within as SwipeModalProvider');
  }

  return swipeModalContext;
};
