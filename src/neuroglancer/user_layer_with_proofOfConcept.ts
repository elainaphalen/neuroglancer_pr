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
import {ProofOfConcept} from 'neuroglancer/proofofconcept';
import {ProofOfConceptTab} from 'neuroglancer/widget/proofofconcept_tab';

const PROOF_OF_CONCEPT_KEY = 'poc';

export interface UserLayerWithProofOfConcept extends UserLayer {
    poc: ProofOfConcept;
}

/**
 * Mixin that adds a `Proofread` tab to a user layer.
 */
export function UserLayerWithProofOfConceptMixin<TBase extends {new (...args: any[]): UserLayer}>(
    Base: TBase) {
  class C extends Base implements UserLayerWithProofOfConcept {
    poc = new ProofOfConcept;

    constructor(...args: any[]) {
      super(...args);
      this.poc.changed.add(this.specificationChanged.dispatch);
      this.tabs.add('POC', {
        label: 'POC',
        order: 100,
        getter: () => new ProofOfConceptTab(this.poc)
      });
      const specification = args[1];
      this.poc.restoreState(specification[PROOF_OF_CONCEPT_KEY]);
    }
    toJSON(): any {
      const x = super.toJSON();
      x[PROOF_OF_CONCEPT_KEY] = this.poc.toJSON(); 
      return x;
    }
  }
  return C;
}
