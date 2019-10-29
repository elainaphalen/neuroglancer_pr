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
import {TrackableBoolean} from 'neuroglancer/trackable_boolean'


export class ProofreadTab extends Tab {
  private prNeuronName = document.createElement('textarea');
  private prCellType = document.createElement('textarea');
  private prTags = document.createElement('textarea');
  private prLocTags = document.createElement('textarea');
  // private prLocTags = document.createElement('textarea');
  private prAnnotator = document.createElement('textarea');
  private prNotes = document.createElement('textarea');
  private prFinished = document.createElement('input');
  private prReviewed = document.createElement('input');
  private prSomaLoc = document.createElement('textarea');
  private prOverrideSuperSetCheck= document.createElement('input');
  
  constructor(
        public prNeuronNameString: TrackableString,
        public prCellTypeString: TrackableString,
        public prTagsString: TrackableString,
        public prLocTagsString: TrackableString,
        public prAnnotatorString: TrackableString,
        public prNotesString: TrackableString,
        public prFinishedString: TrackableBoolean,
        public prReviewedString: TrackableBoolean,
        public prSomaLocString: TrackableString,
        public prOverrideSuperSetCheckString: TrackableBoolean
        ) {
    super();
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    const div_prNeuronName = document.createElement('DIV');
    div_prNeuronName.setAttribute('align','right');
    const {prNeuronName} = this;
    const prNeuronName_label = document.createElement("H3");
    prNeuronName_label.style.padding = '0';
    prNeuronName_label.style.margin = '0';
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
    div_prCellType.setAttribute('align','right');
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
    div_prTags.setAttribute('align','right');
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
    div_prLocTags.setAttribute('align','right');
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
    div_prNotes.setAttribute('align','right');
  
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
    div_prFinished.setAttribute('align','right');
    const {prFinished} = this;
    prFinished.type = 'checkbox'
    const prFinishedLabel = document.createElement('label');
    prFinishedLabel.className = 'neuroglancer-Proofread-homogeneous';
    prFinishedLabel.textContent = 'Finished  '
    prFinishedLabel.appendChild(prFinished);
    div_prFinished.appendChild(linebreak);
    div_prFinished.appendChild(linebreak);
    div_prFinished.appendChild(prFinishedLabel);
    element.appendChild(div_prFinished);
    this.registerDisposer(prFinishedString.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prFinished.addEventListener('change',() => {
            this.updateModel();
            });
    prFinished.title = 'prFinished';
    prFinished.addEventListener('mousedown', (event: MouseEvent) => {
            event.preventDefault();
        });

    // prReviewed
    const div_prReviewed = document.createElement('DIV');
    div_prReviewed.setAttribute('align','right');
    const {prReviewed} = this;
    prReviewed.type = 'checkbox';
    const prReviewedLabel = document.createElement('label');
    prReviewedLabel.className = 'neuroglancer-Proofread-homogeneous';
    prReviewedLabel.textContent = 'Reviewed  '
    prReviewedLabel.appendChild(prReviewed);
    div_prReviewed.appendChild(linebreak);
    div_prReviewed.appendChild(linebreak);
    div_prReviewed.appendChild(linebreak);
    div_prReviewed.appendChild(prReviewedLabel);
    element.appendChild(div_prReviewed);
    this.registerDisposer(prReviewedString.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prFinished.addEventListener('change',() => {
            this.updateModel();
            });
    prReviewed.title = 'prReviewed';
    prFinished.addEventListener('mousedown', (event: MouseEvent) => {
            event.preventDefault();
        });

    // prSomaLoc
    const div_prSomaLoc = document.createElement('DIV');
    div_prSomaLoc.setAttribute('align','right');
    const {prSomaLoc} = this;
    const prSomaLocLabel = document.createElement('label');
    prSomaLocLabel.className = 'neuroglancer-Proofread-homogeneous';
    prSomaLocLabel.textContent = 'Soma location  ';
    prSomaLocLabel.appendChild(prSomaLoc);
    div_prSomaLoc.appendChild(linebreak);
    div_prSomaLoc.appendChild(linebreak);
    div_prSomaLoc.appendChild(prSomaLocLabel);
    element.appendChild(div_prSomaLoc);
    this.registerDisposer(prSomaLocString.changed.add(() => this.updateView()));
    prSomaLoc.addEventListener('save', () => this.updateModel());
    prSomaLoc.addEventListener('blur', () => this.updateModel());
    prSomaLoc.title = 'prSomaLoc  ';
    prSomaLoc.rows = 1;

    // prOverrideSuperSetCheck
    const div_prOverrideSuperSetCheck = document.createElement('DIV');
    div_prOverrideSuperSetCheck.setAttribute('align','right');
    const {prOverrideSuperSetCheck} = this;
    prOverrideSuperSetCheck.type = 'checkbox';
    const prOverrideSuperSetCheckLabel = document.createElement('label');
    prOverrideSuperSetCheckLabel.className = 'neuroglancer-Proofread-homogeneous';
    prOverrideSuperSetCheckLabel.textContent = 'Override Set Check  ';
    prOverrideSuperSetCheckLabel.appendChild(prOverrideSuperSetCheck);
    div_prOverrideSuperSetCheck.appendChild(linebreak);
    div_prOverrideSuperSetCheck.appendChild(linebreak);
    div_prOverrideSuperSetCheck.appendChild(prOverrideSuperSetCheckLabel);
    element.appendChild(div_prOverrideSuperSetCheck);
    this.registerDisposer(prOverrideSuperSetCheckString.changed.add(() => this.updateView()));
    prFinished.addEventListener('change',() => {
            this.updateModel();
            });
    //prOverrideSuperSetCheck.addEventListener('save', () => this.updateModel());
    //prOverrideSuperSetCheck.addEventListener('blur', () => this.updateModel());
    prOverrideSuperSetCheck.title = 'prOverrideSuperSetCheck';
    //prOverrideSuperSetCheck.rows = 1;
    prFinished.addEventListener('mousedown', (event: MouseEvent) => {
            event.preventDefault();
        });

    // prAnnotator
    const div_prAnnotator = document.createElement('DIV');
    div_prAnnotator.setAttribute('align','right');
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
    this.prFinished.checked = this.prFinishedString.value;
    this.prReviewed.checked = this.prReviewedString.value;
    this.prSomaLoc.value = '' + this.prSomaLocString._value;
    this.prOverrideSuperSetCheck.checked = this.prOverrideSuperSetCheckString.value;
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
    this.prFinishedString.value =this.prFinished.checked;
    this.prReviewedString.value=this.prReviewed.checked;
    this.prSomaLocString._value=this.prSomaLoc.value;
    this.prOverrideSuperSetCheckString.value=this.prOverrideSuperSetCheck.checked;

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
