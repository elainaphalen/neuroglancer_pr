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

import {TrackableString} from 'neuroglancer/trackable_string';
import {UserLayer} from 'neuroglancer/layer';
import {ProofreadTab} from 'neuroglancer/widget/proofread_tab';


const NEURON_NAME_JSON_KEY = 'proofreadNeuronName';
const TAGS_JSON_KEY = 'tags';
const LOC_TAGS_JSON_KEY = 'loc_tags';
const ANNOTATOR_JSON_KEY = 'annotator';
const PROOFREAD_TAB_NAME = 'Proofread'

export interface UserLayerWithProofread extends UserLayer {
    neuronName: TrackableString;
    tags: TrackableString;
    loc_tags: TrackableString;
    annotator: TrackableString;
}

/**
 * Mixin that adds a `Proofread` tab to a user layer.
 */
export function UserLayerWithProofreadMixin<TBase extends {new (...args: any[]): UserLayer}>(
    Base: TBase) {
  class C extends Base implements UserLayerWithProofread {
    neuronName = new TrackableString();
    tags = new TrackableString();
    loc_tags = new TrackableString();
    annotator = new TrackableString();

    constructor(...args: any[]) {
      super(...args);
      this.neuronName.changed.add(this.specificationChanged.dispatch);
      this.tags.changed.add(this.specificationChanged.dispatch);
      this.loc_tags.changed.add(this.specificationChanged.dispatch);
      this.annotator.changed.add(this.specificationChanged.dispatch);

      this.tabs.add(PROOFREAD_TAB_NAME, {
        label: PROOFREAD_TAB_NAME,
        order: 100,
        getter: () => new ProofreadTab(this.neuronName, this.tags,this.loc_tags,this.annotator)
      });
      const specification = args[1];
      this.neuronName.restoreState(specification[NEURON_NAME_JSON_KEY]);
      this.tags.restoreState(specification[TAGS_JSON_KEY])
      this.loc_tags.restoreState(specification[TAGS_JSON_KEY])
      this.annotator.restoreState(specification[TAGS_JSON_KEY])
    }

    toJSON(): any {
      const x = super.toJSON();
      x[NEURON_NAME_JSON_KEY] = this.neuronName.toJSON();
      x[TAGS_JSON_KEY]= this.tags.toJSON();
      x[LOC_TAGS_JSON_KEY]=this.loc_tags.toJSON();
      x[ANNOTATOR_JSON_KEY]=this.annotator.toJSON();
      return x;
    }
  }
  return C;
}
