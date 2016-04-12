import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ExampleService {
    constructor(private _http:Http){}
    
    getExampleData(id:number): Observable<any>{
        return this._http.get(`rest/posts/${id}`).map(r=> r.json());
    }
}

