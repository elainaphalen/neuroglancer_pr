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

import {Proofread} from 'neuroglancer/proofread';
import {Atab} from 'neuroglancer/ui/AbstractTab';

export class ProofreadTab extends Atab {
  m:Map<string,HTMLElement> = new Map();
  
  private prNeuronName = document.createElement('textarea');
  private prCellType = document.createElement('textarea');
  private prTags = document.createElement('textarea');
  private prLocTags = document.createElement('textarea');
  private prUncertainCon = document.createElement('textarea');
  private prAnnotator = document.createElement('textarea');
  private prNotes = document.createElement('textarea');
  private prFinished = document.createElement('input');
  private prReviewed = document.createElement('input');
  private prSomaLoc = document.createElement('textarea');
  private prSomaLocCopyLoc = document.createElement('input');
  private prOverrideSuperSetCheck = document.createElement('input');
  private prSaveNeuron = document.createElement('input');

 
  constructor(public transform: Proofread) {
    super(transform);

    this.m.set("prNeuronName",this.prNeuronName);
    this.m.set("prCellType",this.prCellType);
    this.m.set("prTags",this.prTags);
    this.m.set("prLocTags",this.prLocTags);
    this.m.set("prUncertainCon",this.prUncertainCon);
    this.m.set("prAnnotator",this.prAnnotator);
    this.m.set("prNotes",this.prNotes);
    this.m.set("prFinished",this.prFinished);
    this.m.set("prReviewed",this.prReviewed);
    this.m.set("prSomaLoc",this.prSomaLoc);
    this.m.set("prSomaLocCopyLoc",this.prSomaLocCopyLoc);
    this.m.set("prOverrideSuperSetCheck",this.prOverrideSuperSetCheck);
    this.m.set("prSaveNeuron",this.prSaveNeuron);

    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    this.addTextField(this.prNeuronName,'Neuron Name','H3', 2);
    this.addTextField(this.prCellType,'Cell Type','H3');
    this.addTextField(this.prTags,'Tags','H3');
    this.addTextField(this.prLocTags,'Location Tags','H3', 2);
    this.addTextField(this.prUncertainCon,'Uncertain Continuation','H3', 4);
    this.addTextField(this.prNotes,'Notes','H3', 6);
    this.addInputElement(this.prFinished,'Finished');
    this.addInputElement(this.prReviewed,'Reviewed');
    this.addTextField(this.prSomaLoc,'Soma Location' ,'H3');
    this.addInputElement(this.prSomaLocCopyLoc,'Copy Location','button','prSomaLocCopyLoc');
    this.addInputElement(this.prOverrideSuperSetCheck,'Override Set Check');
    this.addTextField(this.prAnnotator,'Annotator','H3');
    this.addInputElement(this.prSaveNeuron,'Save Neuron','button','prSaveNeuron');

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
