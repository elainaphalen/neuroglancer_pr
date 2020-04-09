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

export class Proofread implements WatchableValueInterface<IValue>{
  changed = new NullarySignal();
  
  _value: IValue;

  constructor(){
    //maybe you can add to same dictionary instead of array of dictionary
    let textArea: IValue ={};
    textArea["prNeuronName"]= "";
    textArea["prCellType"]="";
    textArea["prTags"]="";
    textArea["prLocTags"]="";
    textArea["prUncertainCon"]="";
    textArea["prMergers"]="";
    textArea["prAnnotator"]="";
    textArea["prNotes"]="";
    textArea["prFinished"]="false";
    textArea["prReviewed"]="false";
    textArea["prSomaLoc"]="";
    textArea["prOverrideSuperSetCheck"]="false";
    textArea["prOverrideConflictCheck"]="false";
    textArea["prGrowThreshold"]="";
    textArea["prSuperGrowThreshold"]="";

    this._value =textArea;
  }

  get value() {
    return this._value;
  }

  /**
   * Resets to the .
   */
  reset() {
   let textArea: IValue ={};
   textArea["prNeuronName"]= "";
    textArea["prCellType"]="";
    textArea["prTags"]="";
    textArea["prLocTags"]="";
    textArea["prUncertainCon"]="";
    textArea["prMergers"]="";
    textArea["prAnnotator"]="";
    textArea["prNotes"]="";
    textArea["prFinished"]="false";
    textArea["prReviewed"]="false";
    textArea["prSomaLoc"]="";
    textArea["prOverrideSuperSetCheck"]="false";
    textArea["prOverrideConflictCheck"]="false";
    textArea["prGrowThreshold"]="";
    textArea["prSuperGrowThreshold"]="";
   this._value = textArea;
   this.changed.dispatch();
  }

  toJSON() {
    /*for(let x of this._value){
      for(let key in x){
        let value = x[key];
        ;
      }
    }*/
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
