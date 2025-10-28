declare module 'react-native-masonry-list' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface MasonryListProps {
    images: Array<{
      uri: string;
      id: string;
      renderItem?: () => JSX.Element;
    }>;
    columns?: number;
    spacing?: number;
    containerWidth?: number;
    imageContainerStyle?: ViewStyle;
  }

  export default class MasonryList extends Component<MasonryListProps> {}
}
