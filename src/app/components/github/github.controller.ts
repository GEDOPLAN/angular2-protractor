import {Component} from 'angular2/core'
import {GithubService} from '../../services/githubService'
import {ObjectIteratePipe} from '../../pipes/ObjectIteratePipe'


@Component({
    templateUrl: 'app/components/github/github.html',
    styleUrls: ['app/components/github/github.css'],
    providers: [GithubService],
    pipes: [ObjectIteratePipe]
})
export class Github{
    constructor(private _githubService: GithubService){}
    
    organisationName="GEDOPLAN";
    
    orgInfo:any;
    
    ngOnInit(){
        this._githubService.getOrganisation(this.organisationName).subscribe(r => this.orgInfo=r);
    }
}


