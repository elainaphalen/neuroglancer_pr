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

import {Neurondb, IValue} from 'neuroglancer/neurondb';
import {Tab} from 'neuroglancer/widget/tab_view';

type titleType = 'H3' | 'label';

export class ProofreadSearchTab extends Tab {
  

  m:Map<string,HTMLElement> = new Map();
  
  private textArea = document.createElement('textarea');
  private textArea1 = document.createElement('textarea');
  private textArea2 = document.createElement('textarea');
  private textArea3 = document.createElement('textarea');
  private textArea4 = document.createElement('textarea');
  private textArea5 = document.createElement('textarea');
  private textArea6 = document.createElement('textarea');
   
  constructor(public transform: Neurondb) {
    super();

    this.m.set("dbNeuronPrefix",this.textArea);
    this.m.set("dbFindAnnotator",this.textArea1);
    this.m.set("dbFindTags",this.textArea2);
    this.m.set("dbFindFinished",this.textArea3);
    this.m.set("dbFindReviewed",this.textArea4);
    this.m.set("dbFindResult",this.textArea5);
    this.m.set("dbLoadNeuronName",this.textArea6);
    
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    this.addTextField(this.textArea,'NeuronName','H3');
    this.addTextField(this.textArea1,'Cell Type','H3');
    this.addTextField(this.textArea2,'Tags','H3');
    this.addTextField(this.textArea3,'Location Tags','H3');
    this.addTextField(this.textArea4,'Annotator','H3');
    this.addTextField(this.textArea5,'Notes','H3');
    this.addTextField(this.textArea6,'Finished','H3');
    this.updateView();
    
   
  }

  private addTextField(tarea:HTMLTextAreaElement, title:string,type:titleType){
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
      let ta: IValue ={};
      ta["dbNeuronPrefix"] = this.textArea.value;
      ta['dbFindAnnotator'] =this.textArea1.value;
      ta['dbFindTags'] =this.textArea2.value;
      ta['dbFindFinished'] =this.textArea3.value;
      ta['dbFindReviewed'] =this.textArea4.value;
      ta['dbFindResult'] =this.textArea5.value;
      ta['dbLoadNeuronName'] =this.textArea6.value;
      
      //let new_val: Array<IValue>= [ta,ta2];
      this.transform._value = ta;
      //this.transform._value=this.textArea.value;
      this.transform.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
