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
// import {SegmentationUserLayer} from 'neuroglancer/segmentation_user_layer';
// import {Tab} from 'neuroglancer/widget/tab_view';
import {Atab} from 'neuroglancer/ui/AbstractTab';
import {Proofread} from 'neuroglancer/proofread';
// import {getCachedJson} from 'neuroglancer/util/trackable';
// import {RemoteActionHandler} from 'neuroglancer/python_integration/remote_actions';
// import {makeDefaultViewer} from 'neuroglancer/ui/default_viewer';
// import {getDefaultDataSourceProvider} from 'neuroglancer/datasource/default_provider';
// import {CachingCredentialsManager} from 'neuroglancer/credentials_provider';
// import {TrackableBasedCredentialsManager} from 'neuroglancer/python_integration/credentials_provider';
//
// type titleType = 'H3' | 'label';


export class ProofreadTab extends Atab {


  m: Map<string,HTMLElement> = new Map();

  private prNeuronName = document.createElement('textarea');
  private prCellType = document.createElement('textarea');
  private prTags = document.createElement('textarea');
  private prLocTags = document.createElement('textarea');
  private prUncertainCon = document.createElement('textarea');
  private prMergers = document.createElement('textarea');
  private prAnnotator = document.createElement('textarea');
  private prNotes = document.createElement('textarea');
  private prFinished = document.createElement('input');
  private prReviewed = document.createElement('input');
  private prSomaLoc = document.createElement('textarea');
  private prSomaLocCopyLoc = document.createElement('input');
  private prGrowThreshold = document.createElement('textarea');
  private prSuperGrowThreshold = document.createElement('textarea');
  private prOverrideSuperSetCheck = document.createElement('input');
  private prOverrideConflictCheck = document.createElement('input');
  private prSaveNeuron = document.createElement('input');



  constructor(public transform: Proofread) {
    super(transform);
    const {element} = this;
    element.classList.add('neuroglancer-Proofread-widget');


    this.m.set('prNeuronName', this.prNeuronName);
    this.m.set('prCellType', this.prCellType);
    this.m.set('prTags', this.prTags);
    this.m.set('prLocTags', this.prLocTags);
    this.m.set('prUncertainCon', this.prUncertainCon);
    this.m.set('prMergers', this.prMergers);
    this.m.set('prAnnotator', this.prAnnotator);
    this.m.set('prNotes', this.prNotes);
    this.m.set('prFinished', this.prFinished);
    this.m.set('prReviewed', this.prReviewed);
    this.m.set('prSomaLoc', this.prSomaLoc);
    this.m.set('prSomaLocCopyLoc', this.prSomaLocCopyLoc);
    this.m.set('prGrowThreshold', this.prGrowThreshold);
    this.m.set('prSuperGrowThreshold', this.prSuperGrowThreshold);
    this.m.set('prOverrideSuperSetCheck', this.prOverrideSuperSetCheck);
    this.m.set('prOverrideConflictCheck', this.prOverrideConflictCheck);
    this.m.set('prSaveNeuron', this.prSaveNeuron);

    this.addTextField(this.prNeuronName, 'Neuron Name', 'H3', 2);
    this.addTextField(this.prCellType, 'Cell Type', 'H3');
    this.addTextField(this.prTags, 'Tags', 'H3');
    this.addTextField(this.prLocTags, 'Location Tags', 'H3', 2);
    this.addTextField(this.prUncertainCon, 'Uncertain Continuation', 'H3', 4);
    this.addTextField(this.prMergers, 'Merge Locations', 'H3', 4);
    this.addTextField(this.prNotes, 'Notes', 'H3', 8, 28);
    this.addTextField(this.prGrowThreshold, 'Grow Threshold', 'H3');
    this.addTextField(this.prSuperGrowThreshold, 'Super Grow Threshold', 'H3');
    this.addInputElement(this.prFinished, 'Finished');
    this.addInputElement(this.prReviewed, 'Reviewed');
    this.addTextField(this.prSomaLoc, 'Soma Location', 'H3');
    this.addInputElement(this.prSomaLocCopyLoc, 'Copy Location', 'button', 'prSomaLocCopyLoc');
    this.addInputElement(this.prOverrideSuperSetCheck, 'Override Set Check');
    this.addInputElement(this.prOverrideConflictCheck, 'Override Conflict Check');
    this.addTextField(this.prAnnotator, 'Annotator', 'H3');
    this.addInputElement(this.prSaveNeuron, 'Save Neuron', 'button', 'prSaveNeuron');


    // const credentialsManager = new TrackableBasedCredentialsManager();
    // const dataSourceProvider = getDefaultDataSourceProvider(
    //     {credentialsManager: new CachingCredentialsManager(credentialsManager)});
    // let viewer = (<any>window)['viewer'] = makeDefaultViewer({
    //   showLayerDialog: false,
    //   resetStateWhenEmpty: false,
    //   dataSourceProvider,
    // });
    // const remoteActionHandler = new RemoteActionHandler(viewer);
    // document.addEventListener('click', () => {
    //     //   remoteActionHandler.sendActionRequested.dispatch('save-neuron',JSON.parse(JSON.stringify(getCachedJson(viewer.state).value)));
    //     // }
    //   window.alert('test for save button');}
    // );


    this.updateView();
  }

  updateModel() {
    try {
      for (let key in this.transform._value) {
        let field = this.m.get(key)!;
        if(field.nodeName === 'TEXTAREA') {
          this.transform._value[key]= (<HTMLTextAreaElement>field).value;
        } else if(field.nodeName === 'INPUT' && (<HTMLInputElement>field).type === 'checkbox') {

          if((<HTMLInputElement>field).checked) {
            this.transform._value[key] = '1';
          } else {
            this.transform._value[key] = '0';
          }
        }
      }
      this.transform.changed.dispatch();
    } catch {
      this.updateView();
    }
  }
}
