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
   
  constructor(public transform: Color) {
    super(transform);
   
    this.m.set("set_color_val",this.set_color_val);
    this.m.set("clSetVal",this.clSetVal);
    this.m.set("clClear",this.clClear);
    
    const {element} = this;
    element.classList.add('neuroglancer-Color-widget');
    
    this.addTextField(this.set_color_val,'Color value','H3');
    this.addInputElement(this.clSetVal,'Set color to selections','button','clSetVal');
    this.addInputElement(this.clClear,'Clear colors','button','clClear');

    this.updateView();   
  }  
  
 updateModel() {
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
