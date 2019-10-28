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

/**
 * @file Tab for updating a coordinate dbNeuronPrefixString.
 */

import './coordinate_transform.css';

import {TrackableString} from 'neuroglancer/trackable_string';
import {Tab} from 'neuroglancer/widget/tab_view';

export class ProofreadSearchTab extends Tab {
  private dbNeuronPrefix = document.createElement('textarea');
  private dbFindAnnotator = document.createElement('textarea');
  private dbFindTags = document.createElement('textarea');
  private dbFindFinished = document.createElement('textarea');
  private dbFindReviewed = document.createElement('textarea');
  private dbFindResult = document.createElement('textarea');
  private dbLoadNeuronName = document.createElement('textarea');
  

  constructor(
        public dbNeuronPrefixString: TrackableString,
        public dbFindAnnotatorString: TrackableString,
        public dbFindTagsString: TrackableString,
        public dbFindFinishedString: TrackableString,
        public dbFindReviewedString: TrackableString,
        public dbFindResultString: TrackableString,
        public dbLoadNeuronNameString: TrackableString
        ) {
    super();
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    const div_dbNeuronPrefix = document.createElement('DIV');
    const {dbNeuronPrefix} = this;
    const neuron_name = document.createElement("H3");
    neuron_name.appendChild(document.createTextNode("By prefix"));
    const dbNeuronPrefixLabel = document.createElement('label');
    dbNeuronPrefixLabel.className = 'neuroglancer-Proofread-homogeneous';
    dbNeuronPrefixLabel.appendChild(dbNeuronPrefix);
    div_dbNeuronPrefix.appendChild(neuron_name);
    div_dbNeuronPrefix.appendChild(dbNeuronPrefixLabel);
    element.appendChild(div_dbNeuronPrefix);
    this.registerDisposer(dbNeuronPrefixString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    dbNeuronPrefix.addEventListener('save', () => this.updateModel());
    dbNeuronPrefix.addEventListener('blur', () => this.updateModel());
    dbNeuronPrefix.title = 'dbNeuronPrefix';
    dbNeuronPrefix.rows = 1;


    const div_dbFindAnnotator = document.createElement('DIV');
    const {dbFindAnnotator} = this;
    const dbFindAnnotator_title = document.createElement("H3");
    dbFindAnnotator_title.appendChild(document.createTextNode("By annotator"));
    const dbFindAnnotator_box = document.createElement('label');
    dbFindAnnotator_box.className = 'neuroglancer-Proofread-homogeneous';
    dbFindAnnotator_box.appendChild(dbFindAnnotator);
    div_dbFindAnnotator.appendChild(dbFindAnnotator_title);
    div_dbFindAnnotator.appendChild(dbFindAnnotator_box);
    element.appendChild(div_dbFindAnnotator);
    this.registerDisposer(dbFindAnnotatorString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    dbFindAnnotator.addEventListener('save', () => this.updateModel());
    dbFindAnnotator.addEventListener('blur', () => this.updateModel());
    dbFindAnnotator.title = 'dbFindAnnotator';
    dbFindAnnotator.rows = 1;

    // dbFindTags
    const div_dbFindTags = document.createElement('DIV');
    const {dbFindTags} = this;
    const dbFindTags_title = document.createElement("H3");
    dbFindTags_title.appendChild(document.createTextNode("By tags"));
    const dbFindTags_box = document.createElement('label');
    dbFindTags_box.className = 'neuroglancer-Proofread-homogeneous';
    dbFindTags_box.appendChild(dbFindTags);
    div_dbFindTags.appendChild(dbFindTags_title);
    div_dbFindTags.appendChild(dbFindTags_box);
    element.appendChild(div_dbFindTags);
    this.registerDisposer(dbFindTagsString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    dbFindTags.addEventListener('save', () => this.updateModel());
    dbFindTags.addEventListener('blur', () => this.updateModel());
    dbFindTags.title = 'dbFindTags';
    dbFindTags.rows = 1;


    // dbFindFinished
    const div_dbFindFinished = document.createElement('DIV');
    const {dbFindFinished} = this;
    const dbFindFinished_title = document.createElement("H3");
    dbFindFinished_title.appendChild(document.createTextNode("By finish status"));
    const dbFindFinished_box = document.createElement('label');
    dbFindFinished_box.className = 'neuroglancer-Proofread-homogeneous';
    dbFindFinished_box.appendChild(dbFindFinished);
    div_dbFindFinished.appendChild(dbFindFinished_title);
    div_dbFindFinished.appendChild(dbFindFinished_box);
    element.appendChild(div_dbFindFinished);
    this.registerDisposer(dbFindFinishedString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    dbFindFinished.addEventListener('save', () => this.updateModel());
    dbFindFinished.addEventListener('blur', () => this.updateModel());
    dbFindFinished.title = 'dbFindFinished';
    dbFindFinished.rows = 1;


    // dbFindReviewed
    const div_dbFindReviewed = document.createElement('DIV');
    const {dbFindReviewed} = this;
    const dbFindReviewed_title = document.createElement("H3");
    dbFindReviewed_title.appendChild(document.createTextNode("By reviewed status"));
    const dbFindReviewed_box = document.createElement('label');
    dbFindReviewed_box.className = 'neuroglancer-Proofread-homogeneous';
    dbFindReviewed_box.appendChild(dbFindReviewed);
    div_dbFindReviewed.appendChild(dbFindReviewed_title);
    div_dbFindReviewed.appendChild(dbFindReviewed_box);
    element.appendChild(div_dbFindReviewed);
    this.registerDisposer(dbFindReviewedString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    dbFindReviewed.addEventListener('save', () => this.updateModel());
    dbFindReviewed.addEventListener('blur', () => this.updateModel());
    dbFindReviewed.title = 'dbFindReviewed';
    dbFindReviewed.rows = 1;


    const div_dbFindResult = document.createElement('DIV');
    const {dbFindResult} = this;
    const tags = document.createElement("H3");
    tags.appendChild(document.createTextNode("Search results"));
    const dbFindResultLabel = document.createElement('label');
    dbFindResultLabel.className = 'neuroglancer-Proofread-homogeneous';
    dbFindResultLabel.appendChild(dbFindResult);
    div_dbFindResult.appendChild(tags);
    div_dbFindResult.appendChild(dbFindResultLabel);
    element.appendChild(div_dbFindResult);
    this.registerDisposer(dbFindResultString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    dbFindResult.addEventListener('save', () => this.updateModel());
    dbFindResult.addEventListener('blur', () => this.updateModel());
    dbFindResult.title = 'dbFindResult';
    dbFindResult.rows = 3;


    const div_dbLoadNeuronName = document.createElement('DIV');
    const {dbLoadNeuronName} = this;
    const dbLoadNeuronName_title = document.createElement("H3");
    dbLoadNeuronName_title.appendChild(document.createTextNode("Load Neuron"));
    const dbLoadNeuronName_box = document.createElement('label');
    dbLoadNeuronName_box.className = 'neuroglancer-Proofread-homogeneous';
    dbLoadNeuronName_box.appendChild(dbLoadNeuronName);
    div_dbLoadNeuronName.appendChild(dbLoadNeuronName_title);
    div_dbLoadNeuronName.appendChild(dbLoadNeuronName_box);
    element.appendChild(div_dbLoadNeuronName);
    this.registerDisposer(dbLoadNeuronNameString.changed.add(() => this.updateView()));
    dbLoadNeuronName.addEventListener('save', () => this.updateModel());
    dbLoadNeuronName.addEventListener('blur', () => this.updateModel());
    dbLoadNeuronName.title = 'dbLoadNeuronName';
    dbLoadNeuronName.rows = 1;
 
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    this.updateView();
  }

  /*private reset(){
    this.dbNeuronPrefixString.reset();
    this.dbFindResultString.reset();
  }*/

  private updateView() {
    if (!this.visible) {
      return;
    }
    this.dbNeuronPrefix.value = '' + this.dbNeuronPrefixString._value;
    this.dbFindAnnotator.value = '' + this.dbFindAnnotatorString._value;
    this.dbFindTags.value = '' + this.dbFindTagsString._value;
    this.dbFindFinished.value = '' + this.dbFindFinishedString._value;
    this.dbFindReviewed.value = '' + this.dbFindReviewedString._value;

    this.dbFindResult.value = '' + this.dbFindResultString._value;

    this.dbLoadNeuronName.value = '' + this.dbLoadNeuronNameString._value;
  }

  private updateModel() {
    try
    {
    this.dbNeuronPrefixString._value=this.dbNeuronPrefix.value;

    // dbFindAnnotator
    this.dbFindAnnotatorString._value=this.dbFindAnnotator.value;
    this.dbFindTagsString._value=this.dbFindTags.value;
    this.dbFindFinishedString._value=this.dbFindFinished.value;
    this.dbFindReviewedString._value=this.dbFindReviewed.value;

    this.dbLoadNeuronNameString._value=this.dbLoadNeuronName.value;
    this.dbNeuronPrefixString.changed.dispatch();
    this.dbFindAnnotatorString.changed.dispatch();
    this.dbFindTagsString.changed.dispatch();
    this.dbFindFinishedString.changed.dispatch();
    this.dbFindReviewedString.changed.dispatch();
    this.dbLoadNeuronNameString.changed.dispatch();
    // this.dbNeuronPrefixString._value=this.dbNeuronPrefix.value;
    // this.dbNeuronPrefixString.changed.dispatch();
    // this.dbFindResultString._value=this.dbFindResult.value;
    // this.dbFindResultString.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
