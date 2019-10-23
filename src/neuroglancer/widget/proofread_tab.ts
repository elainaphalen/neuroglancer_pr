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
 * @file Tab for updating a coordinate transform.
 */

import './coordinate_transform.css';

import {TrackableString} from 'neuroglancer/trackable_string';
import {Tab} from 'neuroglancer/widget/tab_view';

export class ProofreadTab extends Tab {
  private prNeuronName = document.createElement('textarea');
  private prTags = document.createElement('textarea');
  private prLocTags = document.createElement('textarea');
  private prAnnotator = document.createElement('textarea');
  

  
  constructor(public transform: TrackableString,public t: TrackableString,public lt: TrackableString,public a: TrackableString) {
    super();
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    const div_prNeuronName = document.createElement('DIV');
    const {prNeuronName} = this;
    const Neuron_names = document.createElement("H3");
    Neuron_names.appendChild(document.createTextNode("Neuron_names"));
    const prNeuronNameLabel = document.createElement('label');
    prNeuronNameLabel.className = 'neuroglancer-Proofread-homogeneous';
    //prNeuronNameLabel.textContent = 'Neuron name';
    prNeuronNameLabel.appendChild(prNeuronName);

    div_prNeuronName.appendChild(Neuron_names);
    div_prNeuronName.appendChild(prNeuronNameLabel);
    
    element.appendChild(div_prNeuronName);
    this.registerDisposer(transform.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prNeuronName.addEventListener('save', () => this.updateModel());
    prNeuronName.addEventListener('blur', () => this.updateModel());
    prNeuronName.title = 'prNeuronName';
    prNeuronName.rows = 1;


    const div_prTags = document.createElement('DIV');
    const {prTags} = this;
    const tags = document.createElement("H3");
    tags.appendChild(document.createTextNode("Tags"));
    const prTagsLabel = document.createElement('label');
    prTagsLabel.className = 'neuroglancer-Proofread-homogeneous';
    //prTagsLabel.textContent = 'Tags';
    prTagsLabel.appendChild(prTags);

    div_prTags.appendChild(tags);
    div_prTags.appendChild(prTagsLabel);
    
    element.appendChild(div_prTags);
    this.registerDisposer(t.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prTags.addEventListener('save', () => this.updateModel());
    prTags.addEventListener('blur', () => this.updateModel());
    prTags.title = 'prTags';
    prTags.rows = 3;
    

    const div_prLocTags = document.createElement('DIV');
    const {prLocTags} = this;
    const prLocTagsLabel = document.createElement('label');
    const Location_tags = document.createElement("H3");
    const linebreak = document.createElement("br");
    Location_tags.appendChild(document.createTextNode("Location_tags"));
    prLocTagsLabel.className = 'neuroglancer-Proofread-homogeneous';
    //prLocTagsLabel.textContent = 'Location tags';
    prLocTagsLabel.appendChild(prLocTags);

    div_prLocTags.appendChild(Location_tags);
    div_prLocTags.appendChild(prLocTagsLabel);
    //div_prLocTags.appendChild(linebreak);
    element.appendChild(div_prLocTags);
    this.registerDisposer(lt.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prLocTags.addEventListener('save', () => this.updateModel());
    prLocTags.addEventListener('blur', () => this.updateModel());
    prLocTags.title = 'GUI_TextArea';
    prLocTags.rows = 3;
    
    const div_prAnnotator = document.createElement('DIV');
    const {prAnnotator} = this;
    const prAnnotatorLabel = document.createElement('label');
   // const Annotator = document.createElement("H3");
    //Annotator.appendChild(document.createTextNode("Annotator"));
    prAnnotatorLabel.className = 'neuroglancer-Proofread-homogeneous';
    prAnnotatorLabel.textContent = 'Annotator    ';
    prAnnotatorLabel.appendChild(prAnnotator);
    div_prAnnotator.appendChild(linebreak);
    div_prAnnotator.appendChild(linebreak);
    //div_prAnnotator.appendChild(Annotator);
    div_prAnnotator.appendChild(prAnnotatorLabel);
    
    element.appendChild(div_prAnnotator);
    this.registerDisposer(a.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    prAnnotator.addEventListener('save', () => this.updateModel());
    prAnnotator.addEventListener('blur', () => this.updateModel());
    prAnnotator.title = 'GUI_TextArea';
    prAnnotator.rows = 1;
    
    /*const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset to Empty';
    resetButton.addEventListener('click', () => this.reset());
    element.appendChild(resetButton);*/
    this.updateView();
  }

  /*private reset(){
    this.transform.reset();
    this.t.reset();
  }*/

  private updateView() {
    if (!this.visible) {
      return;
    }
    this.prNeuronName.value = '' + this.transform._value;
    this.prTags.value = '' + this.t._value;
    this.prLocTags.value = '' + this.lt._value;
    this.prAnnotator.value = '' + this.a._value;
  }

  private updateModel() {
    try
    {
    this.transform._value=this.prNeuronName.value;
    this.lt._value=this.prLocTags.value;
    this.t._value=this.prTags.value;
    this.a._value=this.prAnnotator.value;

    this.t.changed.dispatch();
    this.lt.changed.dispatch();
    this.a.changed.dispatch();
    this.transform.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
