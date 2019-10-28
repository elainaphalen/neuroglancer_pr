/**
 * @license
 * Copyright 2018 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain prAnnotatorString copy of the License at
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
 * @file Tab for updating prAnnotatorString coordinate prNeuronNameString.
 */

import './coordinate_transform.css';

import {TrackableString} from 'neuroglancer/trackable_string';
import {Tab} from 'neuroglancer/widget/tab_view';

export class ProofreadTab extends Tab {
  private prNeuronName = document.createElement('textarea');
  private prCellType = document.createElement('textarea');
  private prTags = document.createElement('textarea');
  private prLocTags = document.createElement('textarea');
  // private prLocTags = document.createElement('textarea');
  private prAnnotator = document.createElement('textarea');
  private prNotes = document.createElement('textarea');
  private prFinished = document.createElement('textarea');
  private prReviewed = document.createElement('textarea');
  private prSomaLoc = document.createElement('textarea');
  private prOverrideSuperSetCheck= document.createElement('textarea');
  
  constructor(
        public prNeuronNameString: TrackableString,
        public prCellTypeString: TrackableString,
        public prTagsString: TrackableString,
        public prLocTagsString: TrackableString,
        public prAnnotatorString: TrackableString,
        public prNotesString: TrackableString,
        public prFinishedString: TrackableString,
        public prReviewedString: TrackableString,
        public prSomaLocString: TrackableString,
        public prOverrideSuperSetCheckString: TrackableString
        ) {
    super();
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    const div_prNeuronName = document.createElement('DIV');
    const {prNeuronName} = this;
    const prNeuronName_label = document.createElement("H3");
    prNeuronName_label.appendChild(document.createTextNode("Neuron name"));
    const prNeuronNameLabel = document.createElement('label');
    prNeuronNameLabel.className = 'neuroglancer-Proofread-homogeneous';
    prNeuronNameLabel.appendChild(prNeuronName);
    div_prNeuronName.appendChild(prNeuronName_label);
    div_prNeuronName.appendChild(prNeuronNameLabel);
    element.appendChild(div_prNeuronName);
    this.registerDisposer(prNeuronNameString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prNeuronName.addEventListener('save', () => this.updateModel());
    prNeuronName.addEventListener('blur', () => this.updateModel());
    prNeuronName.title = 'prNeuronName';
    prNeuronName.rows = 1;


    // prCellType
    const div_prCellType = document.createElement('DIV');
    const {prCellType} = this;
    const prCellType_label = document.createElement("H3");
    prCellType_label.appendChild(document.createTextNode("Cell type"));
    const prCellTypeLabel = document.createElement('label');
    prCellTypeLabel.className = 'neuroglancer-Proofread-homogeneous';
    prCellTypeLabel.appendChild(prCellType);
    div_prCellType.appendChild(prCellType_label);
    div_prCellType.appendChild(prCellTypeLabel);
    element.appendChild(div_prCellType);
    this.registerDisposer(prCellTypeString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prCellType.addEventListener('save', () => this.updateModel());
    prCellType.addEventListener('blur', () => this.updateModel());
    prCellType.title = 'prCellType';
    prCellType.rows = 1;


    const div_prTags = document.createElement('DIV');
    const {prTags} = this;
    const prTags_label = document.createElement("H3");
    prTags_label.appendChild(document.createTextNode("Tags"));
    const prTagsLabel = document.createElement('label');
    prTagsLabel.className = 'neuroglancer-Proofread-homogeneous';
    prTagsLabel.appendChild(prTags);
    div_prTags.appendChild(prTags_label);
    div_prTags.appendChild(prTagsLabel);
    element.appendChild(div_prTags);
    this.registerDisposer(prTagsString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prTags.addEventListener('save', () => this.updateModel());
    prTags.addEventListener('blur', () => this.updateModel());
    prTags.title = 'prTags';
    prTags.rows = 3;
    

    const div_prLocTags = document.createElement('DIV');
    const {prLocTags} = this;
    const prLocTagsLabel = document.createElement('label');
    const Location_tags = document.createElement("H3");
    const linebreak = document.createElement("br");
    Location_tags.appendChild(document.createTextNode("Location tags"));
    prLocTagsLabel.className = 'neuroglancer-Proofread-homogeneous';
    prLocTagsLabel.appendChild(prLocTags);
    div_prLocTags.appendChild(Location_tags);
    div_prLocTags.appendChild(prLocTagsLabel);
    //div_prLocTags.appendChild(linebreak);
    element.appendChild(div_prLocTags);
    this.registerDisposer(prLocTagsString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prLocTags.addEventListener('save', () => this.updateModel());
    prLocTags.addEventListener('blur', () => this.updateModel());
    prLocTags.title = 'prLocTags';
    prLocTags.rows = 3;
    
    // prNotes
    const div_prNotes = document.createElement('DIV');
    const {prNotes} = this;
    const prNotes_label = document.createElement("H3");
    prNotes_label.appendChild(document.createTextNode("Notes"));
    const prNotesLabel = document.createElement('label');
    prNotesLabel.className = 'neuroglancer-Proofread-homogeneous';
    prNotesLabel.appendChild(prNotes);
    div_prNotes.appendChild(prNotes_label);
    div_prNotes.appendChild(prNotesLabel);
    element.appendChild(div_prNotes);
    this.registerDisposer(prNotesString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prNotes.addEventListener('save', () => this.updateModel());
    prNotes.addEventListener('blur', () => this.updateModel());
    prNotes.title = 'prNotes';
    prNotes.rows = 8;
    
    // prFinished
    const div_prFinished = document.createElement('DIV');
    const {prFinished} = this;
    const prFinished_label = document.createElement("H3");
    prFinished_label.appendChild(document.createTextNode("Finished"));
    const prFinishedLabel = document.createElement('label');
    prFinishedLabel.className = 'neuroglancer-Proofread-homogeneous';
    prFinishedLabel.appendChild(prFinished);
    div_prFinished.appendChild(prFinished_label);
    div_prFinished.appendChild(prFinishedLabel);
    element.appendChild(div_prFinished);
    this.registerDisposer(prFinishedString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prFinished.addEventListener('save', () => this.updateModel());
    prFinished.addEventListener('blur', () => this.updateModel());
    prFinished.title = 'prFinished';
    prFinished.rows = 1;
    
    // prReviewed
    const div_prReviewed = document.createElement('DIV');
    const {prReviewed} = this;
    const prReviewed_label = document.createElement("H3");
    prReviewed_label.appendChild(document.createTextNode("Reviewed"));
    const prReviewedLabel = document.createElement('label');
    prReviewedLabel.className = 'neuroglancer-Proofread-homogeneous';
    prReviewedLabel.appendChild(prReviewed);
    div_prReviewed.appendChild(prReviewed_label);
    div_prReviewed.appendChild(prReviewedLabel);
    element.appendChild(div_prReviewed);
    this.registerDisposer(prReviewedString.changed.add(() => this.updateView()));
    // this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prReviewed.addEventListener('save', () => this.updateModel());
    prReviewed.addEventListener('blur', () => this.updateModel());
    prReviewed.title = 'prReviewed';
    prReviewed.rows = 1;

    // prSomaLoc
    const div_prSomaLoc = document.createElement('DIV');
    const {prSomaLoc} = this;
    const prSomaLocLabel = document.createElement('label');
    prSomaLocLabel.className = 'neuroglancer-Proofread-homogeneous';
    prSomaLocLabel.textContent = 'Soma location';
    prSomaLocLabel.appendChild(prSomaLoc);
    div_prSomaLoc.appendChild(linebreak);
    div_prSomaLoc.appendChild(linebreak);
    div_prSomaLoc.appendChild(prSomaLocLabel);
    element.appendChild(div_prSomaLoc);
    this.registerDisposer(prSomaLocString.changed.add(() => this.updateView()));
    prSomaLoc.addEventListener('save', () => this.updateModel());
    prSomaLoc.addEventListener('blur', () => this.updateModel());
    prSomaLoc.title = 'prSomaLoc';
    prSomaLoc.rows = 1;

    // prOverrideSuperSetCheck
    const div_prOverrideSuperSetCheck = document.createElement('DIV');
    const {prOverrideSuperSetCheck} = this;
    const prOverrideSuperSetCheckLabel = document.createElement('label');
    prOverrideSuperSetCheckLabel.className = 'neuroglancer-Proofread-homogeneous';
    prOverrideSuperSetCheckLabel.textContent = 'Override Set Check';
    prOverrideSuperSetCheckLabel.appendChild(prOverrideSuperSetCheck);
    div_prOverrideSuperSetCheck.appendChild(linebreak);
    div_prOverrideSuperSetCheck.appendChild(linebreak);
    div_prOverrideSuperSetCheck.appendChild(prOverrideSuperSetCheckLabel);
    element.appendChild(div_prOverrideSuperSetCheck);
    this.registerDisposer(prOverrideSuperSetCheckString.changed.add(() => this.updateView()));
    prOverrideSuperSetCheck.addEventListener('save', () => this.updateModel());
    prOverrideSuperSetCheck.addEventListener('blur', () => this.updateModel());
    prOverrideSuperSetCheck.title = 'prOverrideSuperSetCheck';
    prOverrideSuperSetCheck.rows = 1;

    // prAnnotator
    const div_prAnnotator = document.createElement('DIV');
    const {prAnnotator} = this;
    const prAnnotatorLabel = document.createElement('label');
    prAnnotatorLabel.className = 'neuroglancer-Proofread-homogeneous';
    prAnnotatorLabel.textContent = 'Annotator    ';
    prAnnotatorLabel.appendChild(prAnnotator);
    div_prAnnotator.appendChild(linebreak);
    div_prAnnotator.appendChild(linebreak);
    div_prAnnotator.appendChild(prAnnotatorLabel);
    element.appendChild(div_prAnnotator);
    this.registerDisposer(prAnnotatorString.changed.add(() => this.updateView()));
    prAnnotator.addEventListener('save', () => this.updateModel());
    prAnnotator.addEventListener('blur', () => this.updateModel());
    prAnnotator.title = 'prAnnotator';
    prAnnotator.rows = 1; 


    /*const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset to Empty';
    resetButton.addEventListener('click', () => this.reset());
    element.appendChild(resetButton);*/
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    this.updateView();
  }

  /*private reset(){
    this.prNeuronNameString.reset();
    this.prTagsString.reset();
  }*/

  private updateView() {
    if (!this.visible) {
      return;
    }
    this.prNeuronName.value = '' + this.prNeuronNameString._value;
    this.prCellType.value = '' + this.prCellTypeString._value;
    this.prTags.value = '' + this.prTagsString._value;
    this.prLocTags.value = '' + this.prLocTagsString._value;
    this.prAnnotator.value = '' + this.prAnnotatorString._value;
    this.prNotes.value = '' + this.prNotesString._value;
    this.prFinished.value = '' + this.prFinishedString._value;
    this.prReviewed.value = '' + this.prReviewedString._value;
    this.prSomaLoc.value = '' + this.prSomaLocString._value;
    this.prOverrideSuperSetCheck.value = '' + this.prOverrideSuperSetCheckString._value;
  }

  private updateModel() {
    try
    {
    this.prNeuronNameString._value=this.prNeuronName.value;
    this.prCellTypeString._value=this.prCellType.value;
    this.prTagsString._value=this.prTags.value;
    this.prLocTagsString._value=this.prLocTags.value;
    this.prAnnotatorString._value=this.prAnnotator.value;
    this.prNotesString._value=this.prNotes.value;
    this.prFinishedString._value=this.prFinished.value;
    this.prReviewedString._value=this.prReviewed.value;
    this.prSomaLocString._value=this.prSomaLoc.value;
    this.prOverrideSuperSetCheckString._value=this.prOverrideSuperSetCheck.value;

    this.prNeuronNameString.changed.dispatch();
    this.prCellTypeString.changed.dispatch();
    this.prTagsString.changed.dispatch();
    this.prLocTagsString.changed.dispatch();
    this.prAnnotatorString.changed.dispatch();
    this.prNotesString.changed.dispatch();
    this.prFinishedString.changed.dispatch();
    this.prReviewedString.changed.dispatch();
    this.prSomaLocString.changed.dispatch();
    this.prOverrideSuperSetCheckString.changed.dispatch();

    } catch {
      this.updateView();
    }
  }
}
