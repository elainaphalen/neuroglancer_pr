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
import {Color} from 'neuroglancer/color';
import {Tab} from 'neuroglancer/widget/tab_view';


type titleType = 'H3' | 'label';
type buttonType = 'checkbox'|'button';

export class ColorTab extends Tab {

  m:Map<string,HTMLElement> = new Map();
  
  private clColVal = document.createElement('textarea');
  private clSetVal = document.createElement('input');
  private clClear = document.createElement('input');
  
   
  constructor(public transform: Color) {
    super();
   
    this.m.set("set_color_val",this.clColVal);
    this.m.set("SetColorVal",this.clSetVal);
    this.m.set("Clear",this.clClear);
    
    const {element} = this;
    element.classList.add('neuroglancer-Color-widget');
    
    this.addTextField(this.clColVal,'Color value','H3');
    this.addInputElement(this.clSetVal,'Set color to selections','button','clSetVal');
    this.addInputElement(this.clClear,'Clear colors','button','clClear');
    this.updateView();   
  }
  
  private addInputElement(inp:HTMLInputElement,title:string,type:buttonType,id:string){
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
    input.id= id;
    input.addEventListener('change',() => {
            this.updateModel();
            });
  }

  private addTextField(tarea:HTMLTextAreaElement, title:string, type:titleType, rows:number =3, cols:number =20 ){
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
    txarea.cols = cols;
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
  try{
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
