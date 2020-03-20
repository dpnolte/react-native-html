import React from 'react';
import { LinkNode, NodeBase } from '@react-native-html/parser';
import {
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedbackProps,
  Linking,
  TextProperties,
} from 'react-native';
import { onLayoutHandler } from './types';

interface Props {
  node: LinkNode;
  style?: StyleProp<ViewStyle>;
  TouchableComponent: React.ElementType<TouchableWithoutFeedbackProps>;
  TextComponent: React.ElementType<TextProperties>;
  renderChildNode: (node: NodeBase, index: number) => React.ReactNode;
  onLayout?: onLayoutHandler;
}

export const HtmlNodeLink = ({
  node,
  style,
  TouchableComponent,
  TextComponent,
  renderChildNode,
  onLayout,
}: Props) => {
  const LinkComponent = node.isWithinTextContainer ? TextComponent : TouchableComponent;
  return (
    <LinkComponent style={style} onPress={() => onPress(node.source)} onLayout={onLayout}>
      {node.children.map((child, childIndex) => renderChildNode(child, childIndex))}
    </LinkComponent>
  );
};

const onPress = (uri: string, customHandler?: (uri: string) => void) => {
  if (customHandler) {
    customHandler(uri);
  } else {
    Linking.openURL(uri);
  }
};
