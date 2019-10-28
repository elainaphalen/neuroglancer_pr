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
import {ProofreadSearchTab} from 'neuroglancer/widget/proofread_search_tab';

// const SEARCH_NEURON_NAME_JSON_KEY = 'dbNeuronName';
const SEARCH_PREFIX_JSON_KEY = 'dbNeuronPrefix';
// const SEARCH_TAGS_JSON_KEY = 'dbTags';
// const SEARCH_LOC_SEARCH_TAGS_JSON_KEY = 'dbLocTags';
const SEARCH_ANNOTATOR_JSON_KEY = 'dbFindAnnotator';
const SEARCH_TAGS_JSON_KEY = 'dbFindTags';
const SEARCH_FINISHED_JSON_KEY = 'dbFindFinished';
const SEARCH_REVIEWED_JSON_KEY = 'dbFindReviewed';
const SEARCH_RESULT_JSON_KEY = 'dbFindResult';
const SEARCH_LOAD_NEURON_JSON_KEY = 'dbLoadNeuronName';
const SEARCH_TAB_NAME = 'Search DB'

export interface UserLayerWithSearchDB extends UserLayer {
    // dbNeuronName: TrackableString;
    dbNeuronPrefix: TrackableString;
    // dbTags: TrackableString;
    // dbLocTags: TrackableString;
    dbFindAnnotator: TrackableString;
    dbFindTags: TrackableString;
    dbFindFinished: TrackableString;
    dbFindReviewed: TrackableString;
    dbFindResult: TrackableString;
    dbLoadNeuronName: TrackableString;
}

/**
 * Mixin that adds a `Proofread` tab to a user layer.
 */
export function UserLayerWithSearchDBMixin<TBase extends {new (...args: any[]): UserLayer}>(
    Base: TBase) {
  class C extends Base implements UserLayerWithSearchDB {
    // dbNeuronName = new TrackableString();
    dbNeuronPrefix = new TrackableString();
    dbFindAnnotator = new TrackableString();
    dbFindTags = new TrackableString();
    dbFindFinished = new TrackableString();
    dbFindReviewed = new TrackableString();
    // dbLocTags = new TrackableString();
    dbFindResult = new TrackableString();
    dbLoadNeuronName = new TrackableString();

    constructor(...args: any[]) {
      super(...args);
      // this.dbNeuronName.changed.add(this.specificationChanged.dispatch);
      this.dbNeuronPrefix.changed.add(this.specificationChanged.dispatch);
      this.dbFindAnnotator.changed.add(this.specificationChanged.dispatch);
      this.dbFindTags.changed.add(this.specificationChanged.dispatch);
      this.dbFindFinished.changed.add(this.specificationChanged.dispatch);
      this.dbFindReviewed.changed.add(this.specificationChanged.dispatch);
      // this.dbTags.changed.add(this.specificationChanged.dispatch);
      // this.dbLocTags.changed.add(this.specificationChanged.dispatch);
      this.dbFindResult.changed.add(this.specificationChanged.dispatch);
      this.dbLoadNeuronName.changed.add(this.specificationChanged.dispatch);

      this.tabs.add(SEARCH_TAB_NAME, {
        label: SEARCH_TAB_NAME,
        order: 100,
        getter: () => new ProofreadSearchTab(
          // this.dbNeuronName,
          this.dbNeuronPrefix,
          this.dbFindAnnotator,
          this.dbFindTags,
          this.dbFindFinished,
          this.dbFindReviewed,
          // this.dbTags,
          // this.dbLocTags,
          this.dbFindResult,
          this.dbLoadNeuronName
          )
      });
      const specification = args[1];
      // this.dbNeuronName.restoreState(specification[SEARCH_NEURON_NAME_JSON_KEY]);
      this.dbNeuronPrefix.restoreState(specification[SEARCH_PREFIX_JSON_KEY]);
      this.dbFindAnnotator.restoreState(specification[SEARCH_ANNOTATOR_JSON_KEY]);
      this.dbFindTags.restoreState(specification[SEARCH_TAGS_JSON_KEY]);
      this.dbFindFinished.restoreState(specification[SEARCH_FINISHED_JSON_KEY]);
      this.dbFindReviewed.restoreState(specification[SEARCH_REVIEWED_JSON_KEY]);
      // this.dbTags.restoreState(specification[SEARCH_TAGS_JSON_KEY])
      // this.dbLocTags.restoreState(specification[SEARCH_LOC_SEARCH_TAGS_JSON_KEY])
      this.dbFindResult.restoreState(specification[SEARCH_RESULT_JSON_KEY])
      this.dbLoadNeuronName.restoreState(specification[SEARCH_LOAD_NEURON_JSON_KEY])
    }

    toJSON(): any {
      // for updating GUI
      const x = super.toJSON();
      // x[SEARCH_NEURON_NAME_JSON_KEY] = this.dbNeuronName.toJSON();
      x[SEARCH_PREFIX_JSON_KEY] = this.dbNeuronPrefix.toJSON();
      x[SEARCH_ANNOTATOR_JSON_KEY]=this.dbFindAnnotator.toJSON();
      x[SEARCH_TAGS_JSON_KEY]=this.dbFindTags.toJSON();
      x[SEARCH_FINISHED_JSON_KEY]=this.dbFindFinished.toJSON();
      x[SEARCH_REVIEWED_JSON_KEY]=this.dbFindReviewed.toJSON();
      x[SEARCH_LOAD_NEURON_JSON_KEY]=this.dbLoadNeuronName.toJSON();
      // x[SEARCH_TAGS_JSON_KEY]= this.dbTags.toJSON();
      // x[SEARCH_LOC_SEARCH_TAGS_JSON_KEY]=this.dbLocTags.toJSON();
      return x;
    }
  }
  return C;
}
