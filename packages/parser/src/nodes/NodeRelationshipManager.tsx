import { TextContainerNode, NodeBase, isLinkLikeNode } from '../types/nodes';
import { ParentBasedFlags, DomElement } from '../types/elements';
import {
  getHeaderNumber,
  BOLD_TAGS,
  ITALIC_TAGS,
  STRIKETHROUGH_TAGS,
  UNDERLINE_TAGS,
  LIST_TAGS,
} from '../types/tags';

/**
 * Manages the hierarchy among nodes
 * - should always be able to point to the list of current nodes to which new nodes must be added
 */

export interface NodeRelationshipManager {
  setTextContainer: (tc: TextContainerNode) => void;
  switchToTextContainerSiblings: () => void;
  goDown: (children: NodeBase[]) => void;
  goUp: (oneLevelHigherNodes: NodeBase[]) => void;
  isWithinTextContainer: () => boolean;
  getCurrentTextContainer: () => TextContainerNode | null;
  getNodes: () => NodeBase[];
  getKeyPrefix: () => string;
  getParentNode: () => NodeBase | null;
  setParentNode: (node: NodeBase | null) => void;
  updateParentFlags: (element: DomElement | undefined) => void;
  getParentFlags: () => ParentBasedFlags;
  setParentFlags: (flags: ParentBasedFlags) => void;
  setHasBreak: (value: boolean) => void;
  hasBreak: () => boolean;
}

export const createNodeRelationshipManager = (nodes: NodeBase[]): NodeRelationshipManager => {
  let currentNodes = nodes;
  let parentNode: NodeBase | null = null;
  let parentNodeOfTextContainer: NodeBase | null = null;
  let textContainerSiblings: NodeBase[] | null = null;
  let textContainer: TextContainerNode | null = null;
  let parentFlags: ParentBasedFlags = {};
  let hasBreakWithinTextContainer = false;

  const setTextContainer = (tc: TextContainerNode): void => {
    textContainer = tc;
    textContainerSiblings = currentNodes;
    currentNodes = textContainer.children;
    parentNodeOfTextContainer = parentNode;
    parentNode = textContainer;
  };

  const switchToTextContainerSiblings = (): void => {
    // Check if text container is really a text container and contains more nodes than one
    // It can happen that text containers have less nodes or empty as the dom elements have no text content.
    if (textContainer && textContainerSiblings && textContainer.children.length < 2) {
      let index = textContainerSiblings.length - 1;
      while (textContainerSiblings[index].key !== textContainer.key && index >= -1) {
        index -= 1;
      }
      if (index > -1) {
        if (textContainer.children.length === 0) {
          // remove
          textContainerSiblings.splice(index, 1);
        } else {
          // replace by single node
          const replacingNode: NodeBase = {
            ...textContainer.children[0],
            key: textContainer.key,
            parentKey: textContainer.parentKey,
            isWithinTextContainer: false,
          };
          textContainerSiblings[index] = replacingNode;
        }
      }
    }
    textContainer = null;
    currentNodes = textContainerSiblings as NodeBase[];
    textContainerSiblings = null;
    parentNode = parentNodeOfTextContainer;
    parentNodeOfTextContainer = null;
    hasBreakWithinTextContainer = false;
  };

  const goDown = (children: NodeBase[]): void => {
    currentNodes = children;
  };

  const goUp = (oneLevelHigherNodes: NodeBase[]): void => {
    currentNodes = oneLevelHigherNodes;
  };

  const isWithinTextContainer = (): boolean => textContainer !== null;

  const getCurrentTextContainer = (): TextContainerNode | null => textContainer;

  const getNodes = (): NodeBase[] => currentNodes;

  const getKeyPrefix = (): string => {
    return parentNode?.key ?? '';
  };

  const getParentNode = (): NodeBase | null => parentNode;

  const setParentNode = (node: NodeBase | null): void => {
    parentNode = node;
  };

  const updateParentFlags = (element: DomElement | undefined): void => {
    if (element && element.name) {
      const {
        isWithinBold,
        isWithinHeader,
        isWithinItalic,
        isWithinLink,
        isWithinList,
        isWithinStrikethrough,
        isWithinUnderline,
      } = parentFlags;
      parentFlags = {
        isWithinHeader: isWithinHeader ?? getHeaderNumber(element.name),
        isWithinBold: isWithinBold || BOLD_TAGS.has(element.name),
        isWithinItalic: isWithinItalic || ITALIC_TAGS.has(element.name),
        isWithinStrikethrough: isWithinStrikethrough || STRIKETHROUGH_TAGS.has(element.name),
        isWithinUnderline: isWithinUnderline || UNDERLINE_TAGS.has(element.name),
        isWithinLink: isWithinLink || (!!parentNode && isLinkLikeNode(parentNode)),
        isWithinList: isWithinList || LIST_TAGS.has(element.name),
      };
    }
  };

  const getParentFlags = (): ParentBasedFlags => parentFlags;
  const setParentFlags = (flags: ParentBasedFlags): void => {
    parentFlags = flags;
  };

  const setHasBreak = (value: boolean): void => {
    hasBreakWithinTextContainer = value;
  };

  const hasBreak = (): boolean => {
    return hasBreakWithinTextContainer;
  };

  return {
    setTextContainer,
    switchToTextContainerSiblings,
    goDown,
    goUp,
    isWithinTextContainer,
    getCurrentTextContainer,
    getNodes,
    getKeyPrefix,
    getParentNode,
    setParentNode,
    updateParentFlags,
    getParentFlags,
    setParentFlags,
    setHasBreak,
    hasBreak,
  };
};
