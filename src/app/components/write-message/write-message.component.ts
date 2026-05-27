import { Component } from '@angular/core';
import { MessageComponent } from "../message/message.component";

@Component({
  selector: 'app-write-message',
  imports: [MessageComponent],
  templateUrl: './write-message.component.html',
  styleUrl: './write-message.component.css'
})
export class WriteMessageComponent {

}
