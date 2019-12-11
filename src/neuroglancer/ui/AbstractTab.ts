

import {WatchableValueInterface} from 'neuroglancer/trackable_value';
import {Tab} from 'neuroglancer/widget/tab_view';

type titleType = 'H3' | 'label';
type buttonType = 'checkbox'|'button';

export interface IValue{
  [details: string] : string;
}

export abstract class Atab extends Tab{

    m:Map<string,HTMLElement> = new Map();

    constructor(public model: WatchableValueInterface<IValue>){
        super()
    }

 addInputElement(inp:HTMLInputElement,title:string,type:buttonType = 'checkbox',id?:string){
    const linebreak = document.createElement("br");
    const input = inp;
    const div_inpArea = document.createElement('DIV');
    div_inpArea.setAttribute('align','right');
    input.type = type;

    if(type === 'checkbox'){
        const inputlabel = document.createElement('label');
        inputlabel.textContent=title;
        inputlabel.appendChild(input);
        div_inpArea.appendChild(inputlabel);
    }else{
      input.name = title;
      input.value = title;
      input.textContent = title;
      input.title = title;
      div_inpArea.appendChild(input);
    }
    
    div_inpArea.appendChild(linebreak);
    div_inpArea.appendChild(linebreak);
    
    this.element.appendChild(div_inpArea);
    this.registerDisposer(this.model.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    if(id){
      input.id= id;
    }

    if (type === 'button') {
      input.addEventListener('mousedown',()=>{
        document.dispatchEvent(new Event(input.id));
      })
    } else {
      input.addEventListener('change',() => {
              this.updateModel();
              });
    }
  }

   addTextField(tarea:HTMLTextAreaElement, title:string, type:titleType, rows:number=1, cols:number=24){
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
    this.registerDisposer(this.model.changed.add(() => this.updateView()));
    this.registerDisposer(this.visibility.changed.add(() => this.updateView()));
    txarea.addEventListener('save', () => this.updateModel());
    txarea.addEventListener('blur', () => this.updateModel());
    txarea.rows = rows;
    txarea.cols = cols;
  }
 public abstract updateModel():void ;
 //public abstract updateView():void;

getKeyByValue(object:Map<string, HTMLElement>, value:HTMLElement) 
     {return Object.keys(object).find(key => object.get(key) === value)};

updateView() {
    for (let key in this.model.value)
    {
      let field = this.m.get(key)!;
      let txt: string = this.model.value[key];
      if (field.nodeName == 'TEXTAREA'){
        (<HTMLTextAreaElement>field).value = ''+txt;
      }else if( field.nodeName == 'INPUT'){
        if(JSON.parse(txt)=="1"){
        (<HTMLInputElement>field).checked = true;
        }else {
        (<HTMLInputElement>field).checked = false;
        }
      }
    }  
  }
  


}