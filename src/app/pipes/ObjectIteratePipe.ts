import {Pipe, PipeTransform} from 'angular2/core'

@Pipe({ name: 'ObjectIterate' })
export class ObjectIteratePipe implements PipeTransform {
    transform(value: any, args: any[]) {
       
       let values:Val[]=[];
       for (var att in value){
           values.push({ label: att, value: value[att]})
       }
       
       return values;
    }
}

interface Val { value: string, label: string };