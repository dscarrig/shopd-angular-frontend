import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../service/data/message.service';
import { BasicAuthenticationService } from '../../service/app/basic-authentication.service';
import { Message } from '../../app.classes';

@Component({
  selector: 'app-message-details',
  imports: [CommonModule],
  templateUrl: './message-details.component.html',
  styleUrl: './message-details.component.css'
})
export class MessageDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(BasicAuthenticationService);

  message: Message | null = null;
  errorMessage: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'No message ID provided.';
      return;
    }
    this.messageService.getMessageById(id).subscribe({
      next: (msg: Message) => {
        this.message = msg;
        if (!msg.read) {
          this.messageService.markMessageAsRead(id).subscribe({
            next: () => {
              const userId = this.authService.getAuthenticatedUserId();
              if (userId) this.messageService.refreshUnreadCount(userId);
            }
          });
        }
      },
      error: () => { this.errorMessage = 'Failed to load message.'; }
    });
  }

  goBack(): void {
    this.router.navigate(['/user-messages']);
  }
}
