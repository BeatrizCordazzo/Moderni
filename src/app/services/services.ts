import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Datos } from '../datos';
import { Subscription } from 'rxjs';

interface ProductTypeOption {
  label: string;
  value: string;
  category?: string;
}

@Component({
  selector: 'app-services',
  imports: [Nav, Footer, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements OnInit, OnDestroy {
  isAdmin = false;
  showAddForm = false;
  isSaving = false;
  saveError = '';
  saveSuccess = '';
  addProductForm: FormGroup;
  selectedImageFile: File | null = null;
  imageFileName = '';

  productTypeOptions: ProductTypeOption[] = [
    { label: 'Kitchen (full sets)', value: 'set_kitchen', category: 'Kitchen Sets' },
    { label: 'Bathroom (full sets)', value: 'set_bathroom', category: 'Bathroom Sets' },
    { label: 'Bedroom (full sets)', value: 'set_bedroom', category: 'Bedroom Sets' },
    { label: 'Living room (full sets)', value: 'set_livingroom', category: 'Living Room Sets' },
    { label: 'Individual piece', value: 'individual' }
  ];

  individualCategoryOptions: string[] = [
    'Chairs',
    'Tables',
    'Shelves',
    'Stools',
    'Benches',
    'Organizers',
    'Mirrors'
  ];

  private typeSubscription?: Subscription;

  @ViewChild('imageFileInput') imageFileInput?: ElementRef<HTMLInputElement>;

  constructor(private datosService: Datos, private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      collection: [''],
      type: ['set_kitchen', Validators.required],
      categoryName: ['Kitchen Sets', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      oldPrice: [null],
      stock: [0, [Validators.min(0)]],
      inStock: [true],
      image: [''],
      style: [''],
      includes: [''],
      dimensionsWidth: [''],
      dimensionsHeight: [''],
      dimensionsDepth: [''],
      colors: ['']
    });
  }

  ngOnInit() {
    this.datosService.getLoggedUser().subscribe({
      next: (user) => {
        const role = user && (user.rol || user.role) ? (user.rol || user.role) : null;
        this.isAdmin = !!role && ['admin', 'carpintero', 'superadmin', 'arquitecto'].includes(role);
      },
      error: () => { this.isAdmin = false; }
    });

    this.syncCategoryFromType(this.addProductForm.get('type')?.value);
    this.typeSubscription = this.addProductForm.get('type')?.valueChanges.subscribe((type) => {
      this.syncCategoryFromType(type);
    });
  }

  ngOnDestroy() {
    if (this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }
  }

  get isCategoryLocked(): boolean {
    return this.addProductForm.get('type')?.value !== 'individual';
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.saveError = '';
    if (!this.showAddForm) {
      this.saveSuccess = '';
      this.resetForm();
    }
  }

  submitNewProduct() {
    if (!this.isAdmin || this.isSaving) {
      return;
    }

    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    const raw = this.addProductForm.getRawValue();
    const payload: any = {
      name: raw.name?.trim(),
      description: raw.description?.trim(),
      collection: raw.collection?.trim(),
      type: raw.type,
      categoryName: raw.categoryName,
      price: Number(raw.price),
      oldPrice: raw.oldPrice !== null && raw.oldPrice !== undefined && raw.oldPrice !== '' ? Number(raw.oldPrice) : null,
      stock: raw.stock !== null && raw.stock !== undefined ? Number(raw.stock) : 0,
      inStock: raw.inStock ?? true,
      image: '',
      style: raw.style?.trim(),
      includes: this.parseListEntries(raw.includes),
      colors: this.parseColors(raw.colors)
    };
    const dimensions = this.buildDimensions(raw);
    if (dimensions) {
      payload.dimensions = dimensions;
    }

    this.isSaving = true;
    this.saveError = '';
    this.saveSuccess = '';

    const finalizeCreate = (imageUrl: string) => {
      payload.image = imageUrl?.trim() || (raw.image?.trim() ?? '');
      if (!payload.image) {
        delete payload.image;
      }
      this.datosService.createProduct(payload).subscribe({
        next: () => {
          this.isSaving = false;
          this.saveSuccess = 'Product created successfully.';
          this.resetForm();
        },
        error: (err) => {
          this.isSaving = false;
          this.saveError = err?.error?.error || 'Could not create the product.';
        }
      });
    };

    if (this.selectedImageFile) {
      this.datosService.uploadProductImage(this.selectedImageFile).subscribe({
        next: (res) => {
          if (res?.success && res.url) {
            finalizeCreate(res.url);
          } else {
            this.isSaving = false;
            this.saveError = res?.url === '' ? 'Failed to upload the image.' : (res as any)?.error || 'Failed to upload the image.';
          }
        },
        error: (err) => {
          console.error('Error uploading product image', err);
          this.isSaving = false;
          this.saveError = err?.error?.error || 'Failed to upload the image.';
        }
      });
    } else {
      finalizeCreate(raw.image?.trim() || '');
    }
  }

  private resetForm() {
    this.addProductForm.reset({
      name: '',
      description: '',
      collection: '',
      type: 'set_kitchen',
      categoryName: 'Kitchen Sets',
      price: null,
      oldPrice: null,
      stock: 0,
      inStock: true,
      image: '',
      style: '',
      includes: '',
      dimensionsWidth: '',
      dimensionsHeight: '',
      dimensionsDepth: '',
      colors: ''
    });
    this.syncCategoryFromType('set_kitchen');
    this.clearSelectedImageFile();
  }

  private syncCategoryFromType(type: string | null | undefined) {
    const preset = this.productTypeOptions.find(opt => opt.value === type)?.category;
    if (type && type !== 'individual' && preset) {
      this.addProductForm.patchValue({ categoryName: preset }, { emitEvent: false });
    }
    if (type === 'individual') {
      const current = this.addProductForm.get('categoryName')?.value;
      if (!current || !this.individualCategoryOptions.includes(current)) {
        this.addProductForm.patchValue({ categoryName: this.individualCategoryOptions[0] }, { emitEvent: false });
      }
    }
  }

  private parseListEntries(raw: string | null | undefined): string[] {
    if (!raw) {
      return [];
    }
    return raw
      .split(/[\r\n,]+/)
      .map(entry => entry.trim())
      .filter(entry => entry.length > 0);
  }

  private parseColors(raw: string | null | undefined): Array<{ name: string; code: string }> {
    if (!raw) {
      return [];
    }
    const entries = raw.split(/[\r\n]+/).map(item => item.trim()).filter(item => item.length > 0);
    const colors: Array<{ name: string; code: string }> = [];

    for (const entry of entries) {
      let name = entry;
      let code = '';

      const hexMatch = entry.match(/(#[0-9a-fA-F]{3,8})/);
      if (hexMatch) {
        code = hexMatch[1];
        name = entry.replace(code, '').replace(/[-|:,]/g, ' ').trim();
      } else if (entry.includes('|')) {
        const [n, c] = entry.split('|');
        name = n.trim();
        code = c.trim();
      } else if (entry.includes(',')) {
        const [n, c] = entry.split(',');
        name = n.trim();
        code = c.trim();
      }

      if (!code && name.startsWith('#')) {
        code = name;
        name = name;
      }

      if (code && code[0] !== '#') {
        code = '#' + code.replace('#', '');
      }

      if (code) {
        colors.push({
          name: name || code,
          code: code
        });
      }
    }

    return colors;
  }

  private buildDimensions(raw: any): { width?: string; height?: string; depth?: string } | null {
    const width = raw.dimensionsWidth?.trim();
    const height = raw.dimensionsHeight?.trim();
    const depth = raw.dimensionsDepth?.trim();
    if (!width && !height && !depth) {
      return null;
    }
    return {
      width: width || undefined,
      height: height || undefined,
      depth: depth || undefined
    };
  }

  onImageFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files && input.files.length ? input.files[0] : null;
    if (!file) {
      this.clearSelectedImageFile();
      return;
    }
    this.selectedImageFile = file;
    this.imageFileName = file.name;
  }

  clearSelectedImageFile() {
    this.selectedImageFile = null;
    this.imageFileName = '';
    if (this.imageFileInput?.nativeElement) {
      this.imageFileInput.nativeElement.value = '';
    }
  }
}
