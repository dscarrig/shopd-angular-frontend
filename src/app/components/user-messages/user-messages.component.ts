import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../service/data/message.service';
import { Message } from '../../app.classes';
import { BasicAuthenticationService } from 'src/app/service/app/basic-authentication.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-messages',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {
  private messageService = inject(MessageService);
  private authenticationService = inject(BasicAuthenticationService);
  messages: Message[] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    const userId = this.authenticationService.getAuthenticatedUserId();

    if (userId) {
      this.messageService.getMessages(userId).subscribe({
        next: (data: Message[]) => { this.messages = data; },
        error: () => { this.errorMessage = 'Failed to load messages.'; }
      });
    } else {
      this.errorMessage = 'User not authenticated.';
    }

  }
}
