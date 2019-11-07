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

import {Color, IValue} from 'neuroglancer/color';
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
    element.classList.add('neuroglancer-Proofread-widget');

    
    this.addTextField(this.clColVal,'Color value','H3');
    this.addCheckBox(this.clSetVal,'Set color value to selections','button');
    this.addCheckBox(this.clClear,'Clear all colors','button');
    this.updateView();   
  }


  private addCheckBox(cb:HTMLInputElement,title:string,type:buttonType){
    const linebreak = document.createElement("br");
    const checkbox = cb;
    const div_cbArea = document.createElement('DIV');
    div_cbArea.setAttribute('align','right');
    checkbox.type = type;

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
            console.log("AadadaadSDa");
            const evt = new KeyboardEvent('keydown',{'code':'0x0010'})
            console.log(evt);
            document.dispatchEvent(evt);
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
      }
    }
  
    
  }
  getKeyByValue(object:Map<string, HTMLElement>, value:HTMLElement) 
     {return Object.keys(object).find(key => object.get(key) === value)};
  
  private updateModel() {
  try
    {
      let ta: IValue ={};
      
     // const evt = new KeyboardEvent('keydown',{"code":"0x0010"});
     // if(this.clClear.checked){evt}else{ta['Clear'] ="0"};
     // if(this.clSetVal.checked){ta['SetColorVal'] = "1"}else{ta['SetColorVal']= "0"}

      ta['set_color_val'] =this.clColVal.value;
     // ta['SetColorVal'] =this.clSetVal.value;
      //ta['Clear'] =this.clClear.value;
      
      //let new_val: Array<IValue>= [ta,ta2];
      this.transform._value = ta;
      
      this.transform.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
