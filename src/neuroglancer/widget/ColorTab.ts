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
import {Atab} from 'neuroglancer/ui/AbstractTab';

export class ColorTab extends Atab {
  
  private set_color_val = document.createElement('textarea');
  private clSetVal = document.createElement('input');
  private clClear = document.createElement('input');
  private clNeuronColor = document.createElement('textarea');
  private clNeuronColorButton = document.createElement('input');
  private clAlsoLoadNeurons = document.createElement('input');
  private clClearBeforeLoad = document.createElement('input');

  constructor(public transform: Color) {
    super(transform);
   
    this.m.set("set_color_val",this.set_color_val);
    this.m.set("clSetVal",this.clSetVal);
    this.m.set("clClear",this.clClear);
    this.m.set("clNeuronColor",this.clNeuronColor);
    this.m.set("clAlsoLoadNeurons",this.clAlsoLoadNeurons);
    this.m.set("clClearBeforeLoad",this.clClearBeforeLoad);
    
    const {element} = this;
    element.classList.add('neuroglancer-Color-widget');
    
    this.addTextField(this.set_color_val,'Color value','H3');
    this.addInputElement(this.clSetVal,'Set color to selections','button','clSetVal');
    this.addInputElement(this.clClear,'Clear colors','button','clClear');
    this.addTextField(this.clNeuronColor,'Neuron color mapping','H3', 14, 28);
    this.addInputElement(this.clNeuronColorButton,'Set color','button','clNeuronColorButton');
    this.addInputElement(this.clAlsoLoadNeurons,'Also load neurons');
    this.addInputElement(this.clClearBeforeLoad,'Clear segments before load');

    this.updateView();
  }  
  
 updateModel() {
  try{
      for (let key in this.transform._value){
        let field = this.m.get(key)!;
        if(field.nodeName == 'TEXTAREA'){
          this.transform._value[key]= (<HTMLTextAreaElement>field).value;
        }else if(field.nodeName == 'INPUT' && (<HTMLInputElement>field).type === "checkbox"){
          
          if((<HTMLInputElement>field).checked){
            this.transform._value[key] = '1';
            }else{
            this.transform._value[key] = '0';
            }
        }
      }
      this.transform.changed.dispatch();
    }catch{
      this.updateView();
    }
  }
}
