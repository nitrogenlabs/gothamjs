import {Flux, FluxAction} from '@nlabs/arkhamjs';
import js from 'highlight.js/lib/languages/javascript';
import remark from 'remark';
import remarkReact from 'remark-react';
import RemarkLowlight from 'remark-react-lowlight';
import {Hunter} from 'rip-hunter';

import {MarkdownConstants} from '../constants/MarkdownConstants';

const githubSchema = require('hast-util-sanitize/lib/github.json');

const schema = {
  ...githubSchema,
  attributes: {
    ...githubSchema.attributes,
    code: [
      ...(githubSchema.attributes.code || []),
      'className'
    ]
  }
};

export class MarkdownActions {
  static clearExternal(): Promise<FluxAction> {
    return Flux.dispatch({type: MarkdownConstants.CLEAR_EXTERNAL});
  }

  static getExternal(url: string): Promise<FluxAction> {
    const content = Flux.getState(['app', 'external', url]);

    if(content) {
      return Flux.dispatch({content, type: MarkdownConstants.GET_EXTERNAL, url});
    }

    return Hunter.get(url).then((content) => {
      const renderedContent = remark().use(remarkReact, {
        remarkReactComponents: {
          code: new RemarkLowlight({js})
        },
        sanitize: schema
      }).processSync(content).contents;

      Flux.dispatch({content: renderedContent, type: MarkdownConstants.GET_EXTERNAL, url});
    });
  }
}
