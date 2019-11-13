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

import {ProofOfConcept} from 'neuroglancer/proofofconcept';
import {Tab} from 'neuroglancer/widget/tab_view';

type titleType = 'H3' | 'label';
type buttonType = 'checkbox'|'button';

export class ProofOfConceptTab extends Tab {
  

  m:Map<string,HTMLElement> = new Map();
  
  private textArea = document.createElement('textarea');
  private textArea1 = document.createElement('textarea');
  private textArea2 = document.createElement('textarea');
  private textArea3 = document.createElement('textarea');
  private textArea4 = document.createElement('textarea');
  private textArea5 = document.createElement('textarea');
  private textArea6 = document.createElement('input');
  private textArea7 = document.createElement('input');
  private textArea8 = document.createElement('textarea');
  private textArea9 = document.createElement('input');

 
  constructor(public transform: ProofOfConcept) {
    super();

    this.m.set("prNeuronName",this.textArea);
    this.m.set("prCellType",this.textArea1);
    this.m.set("prTags",this.textArea2);
    this.m.set("prLocTags",this.textArea3);
    this.m.set("prAnnotator",this.textArea4);
    this.m.set("prNotes",this.textArea5);
    this.m.set("prFinished",this.textArea6);
    this.m.set("prReviewed",this.textArea7);
    this.m.set("prSomaLoc",this.textArea8);
    this.m.set("prOverrideSuperSetCheck",this.textArea9);

    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    this.addTextField(this.textArea,'NeuronName','H3');
    this.addTextField(this.textArea1,'Cell Type','H3');
    this.addTextField(this.textArea2,'Tags','H3');
    this.addTextField(this.textArea3,'Location Tags','H3');
    this.addTextField(this.textArea4,'Annotator','H3');
    this.addTextField(this.textArea5,'Notes','H3');
    this.addInputElement(this.textArea6,'Finished',"checkbox");
    this.addInputElement(this.textArea7,'Reviewed',"checkbox");
    this.addTextField(this.textArea8,'Soma Location' ,'H3');
    this.addInputElement(this.textArea9,'Override Set Check',"checkbox");
    this.updateView();   
  }

  private addInputElement(inp:HTMLInputElement,title:string,type:buttonType,id?:string){
    const linebreak = document.createElement("br");
    const input = inp;
    const div_inpArea = document.createElement('DIV');
    div_inpArea.setAttribute('align','right');
    input.type = type;

    if(type === 'checkbox'){
        const inputlabel = document.createElement('label');
        inputlabel.textContent=title;
        inputlabel.appendChild(input);
        div_inpArea.appendChild(inputlabel);
    }else{
      input.name = title;
      input.value = title;
      input.textContent = title;
      input.title = title;
      div_inpArea.appendChild(input);
    }
    
    div_inpArea.appendChild(linebreak);
    div_inpArea.appendChild(linebreak);
    
    this.element.appendChild(div_inpArea);
    this.registerDisposer(this.transform.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    if(id){input.id= id;}
    input.addEventListener('change',() => {
            this.updateModel();
            });
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
      for (let key in this.transform._value){
        let field = this.m.get(key)!;
        if(field.nodeName == 'TEXTAREA'){
          this.transform._value[key]= (<HTMLTextAreaElement>field).value;
        }else if(field.nodeName == 'INPUT' && (<HTMLInputElement>field).type === "checkbox"){
          this.transform._value[key] = String((<HTMLInputElement>field).checked);
        }       
      }
      this.transform.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
