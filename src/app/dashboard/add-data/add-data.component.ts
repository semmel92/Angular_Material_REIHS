import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

declare var $: any; // Falls Sie jQuery für den Toast verwenden

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  public addChildForm?: FormGroup;
  @Input() currentPage!: number;

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', Validators.required],
      kindergardenId: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addChildForm && this.addChildForm.valid) {
      this.backendService.addChildData(this.addChildForm.value, this.currentPage).subscribe({
        next: (_) => {
          // Erfolgsfall
          $('#successToast').toast('show');
          console.log('Kind hinzugefügt');
          this.backendService.getChildren(this.currentPage);  // Korrekter Aufruf
        },
        error: (error) => {
          console.error('Fehler beim Hinzufügen des Kindes:', error);
        }
      });
    } else {
      console.log('Formular ist ungültig');
    }
  }
  
}
