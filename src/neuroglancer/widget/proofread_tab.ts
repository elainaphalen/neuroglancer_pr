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

import {Proofread, IValue} from 'neuroglancer/proofread';
import {Tab} from 'neuroglancer/widget/tab_view';

type titleType = 'H3' | 'label';

export class ProofreadTab extends Tab {
  

  m:Map<string,HTMLElement> = new Map();
  
  private prNeuronName = document.createElement('textarea');
  private textArea1 = document.createElement('textarea');
  private prTags = document.createElement('textarea');
  private prLocTags = document.createElement('textarea');
  private prAnnotator = document.createElement('textarea');
  private prNotes = document.createElement('textarea');
  private prFinished = document.createElement('input');
  private prReviewed = document.createElement('input');
  private prSomaLoc = document.createElement('textarea');
  private prOverrideSuperSetCheck = document.createElement('input');
  private text = document.createElement('textarea');

 
  constructor(public transform: Proofread) {
    super();

    this.m.set("prNeuronName",this.prNeuronName);
    this.m.set("prCellType",this.textArea1);
    this.m.set("prTags",this.prTags);
    this.m.set("prLocTags",this.prLocTags);
    this.m.set("prAnnotator",this.prAnnotator);
    this.m.set("prNotes",this.prNotes);
    this.m.set("prFinished",this.prFinished);
    this.m.set("prReviewed",this.prReviewed);
    this.m.set("prSomaLoc",this.prSomaLoc);
    this.m.set("prOverrideSuperSetCheck",this.prOverrideSuperSetCheck);
    this.m.set("text",this.text);

    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    this.addTextField(this.prNeuronName,'NeuronName','H3');
    this.addTextField(this.textArea1,'Cell Type','H3');
    this.addTextField(this.prTags,'Tags','H3');
    this.addTextField(this.prLocTags,'Location Tags','H3');
    this.addTextField(this.prAnnotator,'Annotator','H3');
    this.addTextField(this.prNotes,'Notes','H3');
    this.addCheckBox(this.prFinished,'Finished');
    this.addCheckBox(this.prReviewed,'Reviewed');
    this.addTextField(this.prSomaLoc,'Soma Location' ,'H3');
    this.addTextField(this.text,'text','H3');
    this.addCheckBox(this.prOverrideSuperSetCheck,'Override Set Check');
    this.updateView();
    
   
  }

  private addCheckBox(cb:HTMLInputElement,title:string){
    const linebreak = document.createElement("br");
    const checkbox = cb;
    const div_cbArea = document.createElement('DIV');
    div_cbArea.setAttribute('align','right');
    checkbox.type = 'checkbox';
    const checkboxlabel = document.createElement('label');
    checkboxlabel.textContent=title;
    checkboxlabel.appendChild(checkbox);
    div_cbArea.appendChild(linebreak);
    div_cbArea.appendChild(linebreak);
    div_cbArea.appendChild(checkboxlabel);
    this.element.appendChild(div_cbArea);
    this.registerDisposer(this.transform.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    checkbox.addEventListener('change',() => {
            this.updateModel();
            });
    checkbox.addEventListener('mousedown', (event: MouseEvent) => {
            event.preventDefault();
        });

  }
  private addTextField(tarea:HTMLTextAreaElement, title:string, type:titleType, rows:number =3 ){
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
    txarea.rows = rows;
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
        //(<HTMLInputElement>field).checked = true
      }
    }
      
  }

  getKeyByValue(object:Map<string, HTMLElement>, value:HTMLElement) 
     {return Object.keys(object).find(key => object.get(key) === value)};
  
  private updateModel() {
  try
    {
      let ta: IValue ={};
      ta["prNeuronName"] = this.prNeuronName.value;
      ta['prCellType'] =this.textArea1.value;
      ta['prTags'] =this.prTags.value;
      ta['prLocTags'] =this.prLocTags.value;
      ta['prAnnotator'] =this.prAnnotator.value;
      ta['prNotes'] =this.prNotes.value;
      ta['text'] = this.text.value;
      if(this.prFinished.checked){ta['prFinished'] ="1"}else{ta['prFinished'] ="0"};
      if(this.prReviewed.checked){ta['prReviewed'] ="1"}else{ta['prReviewed'] ="0"};
      ta['prSomaLoc'] =this.prSomaLoc.value;
      if(this.prOverrideSuperSetCheck.checked){ta['prOverrideSuperSetCheck'] ="1"}else{ta['prOverrideSuperSetCheck'] ="0"};
      
      //let new_val: Array<IValue>= [ta,ta2];
      this.transform._value = ta;
      //this.transform._value=this.textArea.value;
      this.transform.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
