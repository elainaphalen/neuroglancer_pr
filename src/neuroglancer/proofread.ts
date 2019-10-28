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
 * Description here
 */
export class Proofread implements WatchableValueInterface<string> {
  changed = new NullarySignal();
  _value = '';

  get value() {
    return this._value;
  }

  

  /**
   * Resets to the .
   */
  reset() {
    this._value = '';
    this.changed.dispatch();
  }

  toJSON() {
    if(this._value == ''){
      return '';
    }else{
      return this._value;
    }
  }

  restoreState(x: string) {
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
