/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Flux, FluxAction} from '@nlabs/arkhamjs';

import {MarkdownConstants} from '../constants/MarkdownConstants';


// import {get} from '@nlabs/rip-hunter';
// import js from 'highlight.js/lib/languages/javascript';
// import rehypeReact from 'rehype-react';
// import {remark} from 'remark';
// import RemarkLowlight from 'remark-react-lowlight';

// const githubSchema = require('hast-util-sanitize/lib/github.json');

// const schema = {
//   ...githubSchema,
//   attributes: {
//     ...githubSchema.attributes,
//     code: [
//       ...(githubSchema.attributes.code || []),
//       'className'
//     ]
//   }
// };

export class MarkdownActions {
  static clearExternal(): Promise<FluxAction> {
    return Flux.dispatch({type: MarkdownConstants.CLEAR_EXTERNAL});
  }

  static getExternal(url: string): Promise<FluxAction> {
    return Promise.resolve(Flux.dispatch({type: MarkdownConstants.GET_EXTERNAL}));
    // const content = Flux.getState(['app', 'external', url]);

    // if(content) {
    //   return Flux.dispatch({content, type: MarkdownConstants.GET_EXTERNAL, url});
    // }

    // return get(url).then((content) => {
    //   const remarkOptions: any = {
    //     components: {
    //       code: new RemarkLowlight({js})
    //     }
    //   };
    //   const renderedContent = remark().use(rehypeReact, remarkOptions).processSync(content).result;

    //   return Flux.dispatch({content: renderedContent, type: MarkdownConstants.GET_EXTERNAL, url});
    // });
  }
}
