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
import {Neurondb} from 'neuroglancer/neurondb';
import {ProofreadSearchTab} from 'neuroglancer/widget/proofread_search_tab';

const NEURONDB_KEY = 'neurondb';
const SEARCH_TAB_NAME = 'Search DB';

export interface UserLayerWithNeurondb extends UserLayer {
    sr: Neurondb;
}

/**
 * Mixin that adds a `Proofread` tab to a user layer.
 */
export function UserLayerWithNeurondbMixin<TBase extends {new (...args: any[]): UserLayer}>(
    Base: TBase) {
  class C extends Base implements UserLayerWithNeurondb {
    sr = new Neurondb;

    constructor(...args: any[]) {
      super(...args);
      this.sr.changed.add(this.specificationChanged.dispatch);
      this.tabs.add(SEARCH_TAB_NAME, {
        label: SEARCH_TAB_NAME,
        order: 100,
        getter: () => new ProofreadSearchTab(this.sr)
      });
      const specification = args[1];
      this.sr.restoreState(specification[NEURONDB_KEY]);
    }
    toJSON(): any {
      const x = super.toJSON();
      x[NEURONDB_KEY] = this.sr.toJSON(); 
      return x;
    }
  }
  return C;
}
