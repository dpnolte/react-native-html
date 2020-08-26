import React from 'react';
import { HtmlStyles } from '@react-native-html/renderer';

import { HtmlScreenBase } from './HtmlScreenBase';

const html = `
<table width="868">
<tbody>
<tr>
<td width="117"><strong>Ontbijt</strong></td>
<td width="751">1 volkoren boterham met margarine uit een kuipje en appelstroop<br>
Een bekertje halfvolle melk (150 ml)</td>
</tr>
<tr>
<td><strong>Tussendoor</strong></td>
<td width="751">Een geschilde appel in partjes<br>
Een bekertje lauwe thee zonder suiker of een bekertje water</td>
</tr>
<tr>
<td><strong>Lunch</strong></td>
<td width="751">2 volkoren boterhammen met margarine uit een kuipje; met pindakaas zonder suiker en zout en 1 met zuivelspread<br>
Een bekertje halfvolle melk (150 ml)</td>
</tr>
<tr>
<td><strong>Tussendoor</strong></td>
<td width="751">Een schaaltje druiven<br>
Een bekertje thee zonder suiker</td>
</tr>
<tr>
<td><strong>Warme maaltijd</strong></td>
<td width="751">Een half varkensfiletlapje (50 gram), 1-2 opscheplepels doperwten en 1-2 opscheplepels zilvervliesrijst met 1 eetlepel kerriesaus<br>
Een bekertje water</td>
</tr>
</tbody>
</table>
`;

// Some colorful example styling
const htmlStyles: HtmlStyles = {
  table: {
    table: {
      marginBottom: 20,
    },
    th: {
      backgroundColor: '#f7f8fa',
    },
    td: {
      padding: 5,
    },
    even: {
      backgroundColor: '#f7f8fa',
    },
    odd: {
      backgroundColor: '#eaeded',
    },
    overflowX: false,
  },
};

export const TableNoOverflowXExampleScreen: React.FC = () => {
  return <HtmlScreenBase rawHtml={html} htmlViewProps={{ htmlStyles }} />;
};
