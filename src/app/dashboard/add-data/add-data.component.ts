import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';  

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
    public backendService: BackendService,
    private snackBar: MatSnackBar 
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
          // Snackbar anstelle von jQuery verwenden
          this.snackBar.open('Das Kind wurde erfolgreich angemeldet!', 'Schließen', {
            duration: 3000
          });
          console.log('Kind hinzugefügt');
          this.backendService.getChildren(this.currentPage);
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
