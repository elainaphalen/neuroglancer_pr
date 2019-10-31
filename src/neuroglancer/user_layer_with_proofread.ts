/**
 * @license
 * Copyright 2018 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {UserLayer} from 'neuroglancer/layer';
import {Proofread} from 'neuroglancer/proofread';
import {ProofreadTab} from 'neuroglancer/widget/proofread_tab';

const PROOFREAD_KEY = 'pr';

export interface UserLayerWithProofread extends UserLayer {
    poc: Proofread;
}

/**
 * Mixin that adds a `Proofread` tab to a user layer.
 */
export function UserLayerWithProofreadMixin<TBase extends {new (...args: any[]): UserLayer}>(
    Base: TBase) {
  class C extends Base implements UserLayerWithProofread {
    poc = new Proofread();

    constructor(...args: any[]) {
      super(...args);
      this.poc.changed.add(this.specificationChanged.dispatch);
      this.tabs.add('Proofread', {
        label: 'Proofread',
        order: 100,
        getter: () => new ProofreadTab(this.poc)
      });
      const specification = args[1];
      this.poc.restoreState(specification[PROOFREAD_KEY]);
    }
    toJSON(): any {
      const x = super.toJSON();
      x[PROOFREAD_KEY] = this.poc.toJSON(); 
      return x;
    }
  }
  return C;
}
