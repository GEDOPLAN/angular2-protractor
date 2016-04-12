import {Component} from 'angular2/core'
import {ExampleService} from '../../services/exampleService'
import {ObjectIteratePipe} from '../../pipes/ObjectIteratePipe'


@Component({
    templateUrl: 'app/components/service/service.html',
    styleUrls: ['app/components/service/service.css'],
    providers: [ExampleService],
    pipes: [ObjectIteratePipe]
})
export class Service{
    constructor(private _exampleService: ExampleService){}

    infos:any;
    
    ngOnInit(){
        this._exampleService.getExampleData(1).subscribe(r => this.infos=r);
    }
}


