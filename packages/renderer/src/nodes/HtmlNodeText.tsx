import React from 'react';
import { TextNode } from '@react-native-html/parser';
import { TextProperties, StyleProp, TextStyle, StyleSheet } from 'react-native';
import { HtmlHeaderStyles, BasicStyle } from '../HtmlStyles';
import { onLayoutHandler } from './types';

interface Props {
  node: TextNode;
  TextComponent: React.ElementType<TextProperties>;
  textStyle?: StyleProp<TextStyle>;
  italicStyle?: StyleProp<TextStyle>;
  boldStyle?: StyleProp<TextStyle>;
  underlineStyle?: StyleProp<TextStyle>;
  strikethroughStyle?: StyleProp<TextStyle>;
  paragraphStyle?: StyleProp<TextStyle>;
  paragraphAfterHeaderStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
  headerStyles: HtmlHeaderStyles;
  onLayout?: onLayoutHandler;
  firstChildInListItemStyle?: StyleProp<BasicStyle>;
}

export const HtmlNodeText: React.FC<Props> = ({
  node,
  TextComponent,
  textStyle,
  paragraphStyle,
  paragraphAfterHeaderStyle,
  linkStyle,
  headerStyles,
  onLayout,
  firstChildInListItemStyle,
  italicStyle,
  boldStyle,
  underlineStyle,
  strikethroughStyle,
}) => {
  const combinedStyles: StyleProp<TextStyle>[] = [textStyle];
  if (node.isBold) {
    combinedStyles.push(boldStyle ?? styles.bold);
  }
  if (node.isItalic) {
    combinedStyles.push(italicStyle ?? styles.italic);
  }
  if (node.isUnderlined) {
    combinedStyles.push(underlineStyle ?? styles.underline);
  }
  if (node.hasStrikethrough) {
    combinedStyles.push(strikethroughStyle ?? styles.strike);
  }

  if (!node.isWithinTextContainer) {
    combinedStyles.push(paragraphStyle);
    if (node.isAfterHeader) {
      combinedStyles.push(paragraphAfterHeaderStyle);
    }
  }

  if (node.isWithinLink) {
    combinedStyles.push(styles.link);
    if (linkStyle) {
      combinedStyles.push(linkStyle);
    }
  }

  if (node.header) {
    const headerStyle = `h${node.header}` as keyof HtmlHeaderStyles;
    if (headerStyles[headerStyle]) {
      combinedStyles.push(headerStyles[headerStyle]);
    }
  }

  if (firstChildInListItemStyle) {
    combinedStyles.push(firstChildInListItemStyle);
  }

  return (
    <TextComponent onLayout={onLayout} style={combinedStyles}>
      {node.content}
    </TextComponent>
  );
};

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
  strike: {
    textDecorationLine: 'line-through',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    color: '#0000EE',
    textDecorationLine: 'underline',
  },
});
