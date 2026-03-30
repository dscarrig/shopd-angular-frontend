import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITEM_CATEGORIES } from '../../app.constants';

@Component({
  selector: 'app-shopd-listing-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopd-listing-form.component.html',
  styleUrl: './shopd-listing-form.component.css',
  standalone: true
})
export class ShopdListingFormComponent implements OnChanges {
  @Input() showCancelButton: boolean = true;
  @Input() submitButtonText: string = 'Submit';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() initialItemName: string = '';
  @Input() initialPrice: number | null = null;
  @Input() initialDescription: string = '';
  @Input() initialCategory: string = '';
  @Input() initialAvailable: boolean = true;
  @Input() initialQuantity: number | null = null;
  @Input() initialImageUrl: string = '';
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  itemName: string = '';
  price: number | null = null;
  description: string = '';
  category: string = '';
  available: boolean = true;
  quantity: number | null = null;
  photoFile: File | null = null;
  photoPreview: string | null = null;

  // Category options from constants
  categories = ITEM_CATEGORIES;

  ngOnChanges(changes: SimpleChanges): void {
    // Pre-populate form fields when inputs change
    if (changes['initialItemName']) {
      this.itemName = this.initialItemName;
    }
    if (changes['initialPrice']) {
      this.price = this.initialPrice;
    }
    if (changes['initialDescription']) {
      this.description = this.initialDescription;
    }
    if (changes['initialCategory']) {
      this.category = this.initialCategory;
    }
    if (changes['initialAvailable']) {
      this.available = this.initialAvailable;
    }
    if (changes['initialQuantity']) {
      this.quantity = this.initialQuantity;
    }
    if (changes['initialImageUrl'] && this.initialImageUrl) {
      this.photoPreview = this.initialImageUrl;
    }
  }

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
      !!this.description.trim() &&
      !!this.category.trim();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.formSubmit.emit({
        itemName: this.itemName,
        price: this.price,
        description: this.description,
        category: this.category,
        available: this.available,
        quantity: this.quantity,
        photo: this.photoFile
      });
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
}