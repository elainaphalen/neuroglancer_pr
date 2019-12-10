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

import {Atab} from 'neuroglancer/ui/AbstractTab';
import {Neurondb} from 'neuroglancer/neurondb';


export class ProofreadSearchTab extends Atab {
  

  m:Map<string,HTMLElement> = new Map();
  
  private dbNeuronPrefix = document.createElement('textarea');
  private dbFindAnnotator = document.createElement('textarea');
  private dbFindTags = document.createElement('textarea');
  private dbFindFinished = document.createElement('textarea');
  private dbFindReviewed = document.createElement('textarea');
  private dbFindResult = document.createElement('textarea');
  private dbLoadNeuronName = document.createElement('textarea');
  private dbNoChildren = document.createElement('input');
   
  constructor(public transform: Neurondb) {
    super(transform);

    this.m.set("dbNeuronPrefix",this.dbNeuronPrefix);
    this.m.set("dbFindAnnotator",this.dbFindAnnotator);
    this.m.set("dbFindTags",this.dbFindTags);
    this.m.set("dbFindFinished",this.dbFindFinished);
    this.m.set("dbFindReviewed",this.dbFindReviewed);
    this.m.set("dbFindResult",this.dbFindResult);
    this.m.set("dbLoadNeuronName",this.dbLoadNeuronName);
    this.m.set("dbLoadWithoutChildren",this.dbNoChildren);
    
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');

    this.addTextField(this.dbNeuronPrefix,'Prefix','H3');
    this.addTextField(this.dbFindAnnotator,'Annotator','H3');
    this.addTextField(this.dbFindTags,'Tags','H3');
    this.addTextField(this.dbFindFinished,'Finished','H3');
    this.addTextField(this.dbFindReviewed,'Reviewed','H3');
    this.addTextField(this.dbFindResult,'Result','H3', 8);
    this.addTextField(this.dbLoadNeuronName,'Load Neuron','H3');
    this.addInputElement(this.dbNoChildren,'Load without children');
    this.updateView();
  }


   
  updateModel() {
  try
    {
      for (let key in this.transform._value){
        let field = this.m.get(key)!;
        field.id = key;
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
