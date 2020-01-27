/**
 * @license
 * Copyright 2016 Google Inc.
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
import {WatchableValueInterface} from 'neuroglancer/trackable_value';
import {NullarySignal} from 'neuroglancer/util/signal';



/**
 * Class for representing a coordinate transform specified by a user.
 *
 * Typically it represents a transform from a local coordinate space to a global coordinate space.
 */

export interface IValue{
  [details: string] : string;
}

export class Color implements WatchableValueInterface<IValue>{
  changed = new NullarySignal();
  
  _value: IValue;

  constructor(){
    //maybe you can add to same dictionary instead of array of dictionary
    let textArea: IValue ={};
    textArea["set_color_val"]="";
    textArea["clNeuronColor"]="";
    textArea["clAlsoLoadNeurons"]="0";
    textArea["clClearBeforeLoad"]="0";

    this._value =textArea;
  }

  get value() {
    return this._value;
  }

  reset() {
   let empty: IValue ={};
   
    empty["set_color_val"]="";
    empty["clNeuronColor"]="";
    empty["clAlsoLoadNeurons"]="0";
    empty["clClearBeforeLoad"]="0";
   this._value = empty;
   this.changed.dispatch();
  }

  toJSON() {
    return this._value;
  }

  restoreState(x: IValue) {
    if (x == null) {
      this.reset();
      return;
    }
    
    try{
      this._value = x;
      this.changed.dispatch();
    }catch(ignoredError){
      this.reset();
    }
    
  }
}
