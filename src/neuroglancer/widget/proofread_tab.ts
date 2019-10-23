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
  private textArea = document.createElement('textarea');
  
  constructor(public transform: TrackableString) {
    super();
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');
    const {textArea} = this;
    const textAreaLabel = document.createElement('label');
    textAreaLabel.className = 'neuroglancer-Proofread-homogeneous';
    //textAreaLabel.textContent = 'BUTTON';
    textAreaLabel.appendChild(textArea);
    element.appendChild(textAreaLabel);
    this.registerDisposer(transform.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    textArea.addEventListener('save', () => this.updateModel());
    textArea.addEventListener('blur', () => this.updateModel());
    

    textArea.title = 'GUI_TextArea';
    textArea.rows = 1;
    //const saveButton = document.createElement('button');
    //saveButton.textContent = 'Save';
    //saveButton.addEventListener('click', () => this.updateModel());
    //element.appendChild(saveButton);


    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset to Empty';
    resetButton.addEventListener('click', () => this.transform.reset());
    element.appendChild(resetButton);
    this.updateView();
  }

  private updateView() {
    if (!this.visible) {
      return;
    }
    this.textArea.value = '' + this.transform._value;
  }

  private updateModel() {
    try
    {
    this.transform._value=this.textArea.value;
    this.transform.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
