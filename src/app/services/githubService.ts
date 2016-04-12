import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class GithubService {
    constructor(private _http:Http){}
    
    getOrganisation(orgname: string): Observable<any>{
        return this._http.get(`https://api.github.com/orgs/${orgname}`).map(r=> r.json());
    }
}

