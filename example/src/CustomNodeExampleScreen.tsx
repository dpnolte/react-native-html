import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ElementParser, NodeBase, CustomRendererArgs } from '@react-native-html/renderer';

import { HtmlScreenBase } from './HtmlScreenBase';

const html = `<h1>Custom Node Parser & Renderer</h1>
<p>Below the custom node 'Magic' that is rendered with MagicView:</p>
<div class="magic">stuff you don't want to render but show something else in stead</div>
<p>Normal text again!</p>
`;

export const CustomNodeExampleScreen = () => {
  return (
    <HtmlScreenBase
      rawHtml={html}
      htmlViewProps={{
        customParser,
        customRenderer,
      }}
    />
  );
};

interface MagicNode extends NodeBase {
  type: 'Magic';
}
const isMagicNode = (node: NodeBase): node is MagicNode => node.type === 'Magic';

const customParser: ElementParser = ({ hasClassName, path }) => {
  if (hasClassName('magic')) {
    return {
      node: {
        type: 'Magic',
        path,
      },
      continueParsingChildren: false,
    };
  }
  return undefined;
};

const customRenderer = ({ node }: CustomRendererArgs) => {
  if (isMagicNode(node)) {
    return <MagicView />;
  }
  return undefined;
};

const MagicView = () => {
  return (
    <View style={styles.magic}>
      <Text>Acracadabra, hide the text inside the div and render this instead!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  magic: {
    backgroundColor: 'red',
    marginVertical: 15,
    padding: 20,
  },
});
