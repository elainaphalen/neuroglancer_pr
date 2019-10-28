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

const NEURON_NAME_JSON_KEY = 'prNeuronName';
const CELL_TYPE_JSON_KEY = 'prCellType';
const TAGS_JSON_KEY = 'prTags';
const LOC_TAGS_JSON_KEY = 'prLocTags';
const ANNOTATOR_JSON_KEY = 'prAnnotator';
const NOTES_JSON_KEY = 'prNotes';
const FINISHED_JSON_KEY = 'prFinished';
const REVIEWED_JSON_KEY = 'prReviewed';
const PROOFREAD_TAB_NAME = 'Proofread';
const SOMA_LOC_JSON_KEY = 'prSomaLoc';
const OVERRIDE_SUPERSET_CHECK_JSON_KEY = 'prOverrideSuperSetCheck';

export interface UserLayerWithProofread extends UserLayer {
    prNeuronName: TrackableString;
    prCellType: TrackableString;
    prTags: TrackableString;
    prLocTags: TrackableString;
    prAnnotator: TrackableString;
    prNotes: TrackableString;
    prFinished: TrackableString;
    prReviewed: TrackableString;
    prSomaLoc: TrackableString;
    prOverrideSuperSetCheck: TrackableString;
}

/**
 * Mixin that adds a `Proofread` tab to a user layer.
 */
export function UserLayerWithProofreadMixin<TBase extends {new (...args: any[]): UserLayer}>(
    Base: TBase) {
  class C extends Base implements UserLayerWithProofread {
    prNeuronName = new TrackableString();
    prCellType = new TrackableString();
    prTags = new TrackableString();
    prLocTags = new TrackableString();
    prAnnotator = new TrackableString();
    prNotes = new TrackableString();
    prFinished = new TrackableString();
    prReviewed = new TrackableString();
    prSomaLoc = new TrackableString();
    prOverrideSuperSetCheck = new TrackableString();

    constructor(...args: any[]) {
      super(...args);
      this.prNeuronName.changed.add(this.specificationChanged.dispatch);
      this.prCellType.changed.add(this.specificationChanged.dispatch);
      this.prTags.changed.add(this.specificationChanged.dispatch);
      this.prLocTags.changed.add(this.specificationChanged.dispatch);
      this.prAnnotator.changed.add(this.specificationChanged.dispatch);
      this.prNotes.changed.add(this.specificationChanged.dispatch);
      this.prFinished.changed.add(this.specificationChanged.dispatch);
      this.prReviewed.changed.add(this.specificationChanged.dispatch);
      this.prSomaLoc.changed.add(this.specificationChanged.dispatch);
      this.prOverrideSuperSetCheck.changed.add(this.specificationChanged.dispatch);

      this.tabs.add(PROOFREAD_TAB_NAME, {
        label: PROOFREAD_TAB_NAME,
        order: 100,
        getter: () => new ProofreadTab(
          this.prNeuronName,
          this.prCellType,
          this.prTags,
          this.prLocTags,
          this.prAnnotator,
          this.prNotes,
          this.prFinished,
          this.prReviewed,
          this.prSomaLoc,
          this.prOverrideSuperSetCheck
          )
      });
      const specification = args[1];
      this.prNeuronName.restoreState(specification[NEURON_NAME_JSON_KEY]);
      this.prCellType.restoreState(specification[CELL_TYPE_JSON_KEY]);
      this.prTags.restoreState(specification[TAGS_JSON_KEY]);
      this.prLocTags.restoreState(specification[LOC_TAGS_JSON_KEY]);
      this.prAnnotator.restoreState(specification[ANNOTATOR_JSON_KEY]);
      this.prNotes.restoreState(specification[NOTES_JSON_KEY]);
      this.prFinished.restoreState(specification[FINISHED_JSON_KEY]);
      this.prReviewed.restoreState(specification[REVIEWED_JSON_KEY]);
      this.prSomaLoc.restoreState(specification[SOMA_LOC_JSON_KEY]);
      this.prOverrideSuperSetCheck.restoreState(specification[OVERRIDE_SUPERSET_CHECK_JSON_KEY]);
    }

    toJSON(): any {
      const x = super.toJSON();

      
      if(this.prNeuronName._value || this.prCellType._value ||this.prTags._value || this.prLocTags._value || this.prAnnotator._value || this.prNotes._value || this.prFinished._value || this.prReviewed._value || this.prSomaLoc._value){
       
      x[NEURON_NAME_JSON_KEY] = this.prNeuronName.toJSON();
      x[CELL_TYPE_JSON_KEY] = this.prCellType.toJSON();
      x[TAGS_JSON_KEY]= this.prTags.toJSON();
      x[LOC_TAGS_JSON_KEY]=this.prLocTags.toJSON();
      x[ANNOTATOR_JSON_KEY]=this.prAnnotator.toJSON();
      x[NOTES_JSON_KEY]=this.prNotes.toJSON();
      x[FINISHED_JSON_KEY]=this.prFinished.toJSON();
      x[REVIEWED_JSON_KEY]=this.prReviewed.toJSON();
      x[SOMA_LOC_JSON_KEY]=this.prSomaLoc.toJSON();
      x[OVERRIDE_SUPERSET_CHECK_JSON_KEY]=this.prOverrideSuperSetCheck.toJSON();
      }
      return x;
    }
  }
  return C;
}
