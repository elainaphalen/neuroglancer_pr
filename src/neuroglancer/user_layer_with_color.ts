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

import {UserLayer} from 'neuroglancer/layer';
import {Color} from 'neuroglancer/color';
import {ColorTab} from 'neuroglancer/widget/ColorTab';


const COLOR_TAB_NAME = 'Colors';
const COLOR_KEY = 'colors';


export interface UserLayerWithColor extends UserLayer {
    cl: Color;
    
}

/**
 * Mixin that adds a `Color` tab to a user layer.
 */
export function UserLayerWithColorMixin<TBase extends {new (...args: any[]): UserLayer}>(
    Base: TBase) {
  class C extends Base implements UserLayerWithColor {
    cl = new Color();


    constructor(...args: any[]) {
      super(...args);
      
      this.cl.changed.add(this.specificationChanged.dispatch);
      this.tabs.add(COLOR_TAB_NAME, {
        label: COLOR_TAB_NAME,
        order: 100,
        getter: () => new ColorTab(this.cl)
      });
      const specification = args[1];
      this.cl.restoreState(specification[COLOR_KEY]);
    

    }
    toJSON(): any {
      const x = super.toJSON();
      x[COLOR_KEY] = this.cl.toJSON();
      return x;
    }
  }
  return C;
}
