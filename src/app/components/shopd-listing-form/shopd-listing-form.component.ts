import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopd-listing-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopd-listing-form.component.html',
  styleUrl: './shopd-listing-form.component.css',
  standalone: true
})
export class ShopdListingFormComponent {
  @Input() showCancelButton: boolean = true;
  @Input() submitButtonText: string = 'Submit';
  @Input() cancelButtonText: string = 'Cancel';
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  itemName = '';
  price: number | null = null;
  description = '';
  photoFile: File | null = null;
  photoPreview: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.photoFile = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.photoFile);
    }
  }

  removePhoto() {
    this.photoFile = null;
    this.photoPreview = null;
  }

  isFormValid(): boolean {
    return !!this.itemName.trim() &&
      this.price !== null &&
      this.price > 0 &&
      !!this.description.trim();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.formSubmit.emit({
        itemName: this.itemName,
        price: this.price,
        description: this.description,
        photo: this.photoFile
      });
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
}
