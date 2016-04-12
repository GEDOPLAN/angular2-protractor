import {Component} from 'angular2/core'

@Component({
    templateUrl: 'app/components/formular/formular.html',
    styleUrls: ['app/components/formular/formular.css']
})
export class Formular{

    messages:Message[]=[]

    username:string="Gast";
    message:string
    
    submit(){
        this.messages.push(new Message(this.username, this.message))
    }
}

class Message{
    constructor(public username:string, public message:string){}
}


