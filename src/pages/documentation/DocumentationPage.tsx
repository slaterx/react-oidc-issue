import React from 'react';
import {MarkdownView} from '../../components';

export class DocumentationPage extends React.Component<any, any> {
  render() {
    return (
      <MarkdownView name="documentation" url="/docs/README.md" />
    );
  }
}
