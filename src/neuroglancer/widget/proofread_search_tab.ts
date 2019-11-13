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

import {Neurondb} from 'neuroglancer/neurondb';
import {Tab} from 'neuroglancer/widget/tab_view';

type titleType = 'H3' | 'label';

export class ProofreadSearchTab extends Tab {
  

  m:Map<string,HTMLElement> = new Map();
  
  private dbNeuronPrefix = document.createElement('textarea');
  private dbFindAnnotator = document.createElement('textarea');
  private dbFindTags = document.createElement('textarea');
  private dbFindFinished = document.createElement('textarea');
  private dbFindReviewed = document.createElement('textarea');
  private dbFindResult = document.createElement('textarea');
  private dbLoadNeuronName = document.createElement('textarea');
   
  constructor(public transform: Neurondb) {
    super();

    this.m.set("dbNeuronPrefix",this.dbNeuronPrefix);
    this.m.set("dbFindAnnotator",this.dbFindAnnotator);
    this.m.set("dbFindTags",this.dbFindTags);
    this.m.set("dbFindFinished",this.dbFindFinished);
    this.m.set("dbFindReviewed",this.dbFindReviewed);
    this.m.set("dbFindResult",this.dbFindResult);
    this.m.set("dbLoadNeuronName",this.dbLoadNeuronName);
    
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    this.addTextField(this.dbNeuronPrefix,'Prefix','H3');
    this.addTextField(this.dbFindAnnotator,'Annotator','H3');
    this.addTextField(this.dbFindTags,'Tags','H3');
    this.addTextField(this.dbFindFinished,'Finished','H3');
    this.addTextField(this.dbFindReviewed,'Reviewed','H3');
    this.addTextField(this.dbFindResult,'Result','H3', 8);
    this.addTextField(this.dbLoadNeuronName,'Load Neuron','H3');
    this.updateView();
    
   
  }

  private addTextField(tarea:HTMLTextAreaElement, title:string,type:titleType, rows:number = 1){
    const txarea = tarea;
    const div_textArea = document.createElement('DIV');
    div_textArea.setAttribute('align','right');
    if(type === 'label'){
    const textAreaLabel=document.createElement('label');
    textAreaLabel.textContent = title;
    textAreaLabel.appendChild(txarea);
    div_textArea.appendChild(textAreaLabel);
    }
    if(type === 'H3'){
      const title_label = document.createElement('H3');
      title_label.style.padding = '0';
      title_label.style.margin='0';
      title_label.appendChild(document.createTextNode(title));
      div_textArea.appendChild(title_label);
      div_textArea.appendChild(txarea);
    }
    this.element.appendChild(div_textArea);
    this.registerDisposer(this.transform.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    txarea.addEventListener('save', () => this.updateModel());
    txarea.addEventListener('blur', () => this.updateModel());
    txarea.rows = 1;
    try{
    txarea.id = this.getKeyByValue(this.m,tarea)!;
    }
    catch{
      txarea.id = "";
    }
    txarea.rows = rows;
  }
  
  private updateView() {
    for (let key in this.transform._value)
    {
      let field = this.m.get(key)!;
      let txt: string = this.transform._value[key];
      if (field.nodeName == 'TEXTAREA'){
        (<HTMLTextAreaElement>field).value = ''+txt;
      }else if( field.nodeName == 'INPUT'){
        if(JSON.parse(txt)){
        (<HTMLInputElement>field).checked = true;
        }else {
        (<HTMLInputElement>field).checked = false;
        }
      }
    }
  
  }
  getKeyByValue(object:Map<string, HTMLElement>, value:HTMLElement) 
     {return Object.keys(object).find(key => object.get(key) === value)};
  
  private updateModel() {
  try
    {
      for (let key in this.transform._value){
        let field = this.m.get(key)!;
        if(field.nodeName == 'TEXTAREA'){
          this.transform._value[key]= (<HTMLTextAreaElement>field).value;
        }
      }
      this.transform.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
