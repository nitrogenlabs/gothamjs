/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FluxFramework} from '@nlabs/arkhamjs';

export class ArkhamJS {
  static fluxFramework: FluxFramework;

  static setFlux(flux: FluxFramework) {
    ArkhamJS.fluxFramework = flux;
  }

  static get flux(): FluxFramework {
    return ArkhamJS.fluxFramework;
  }
}
