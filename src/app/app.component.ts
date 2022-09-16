import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, Observable, tap } from 'rxjs';
import { AnimalOption } from './models/animal.model';
import { FavoriteFoodOption } from './models/favorite-food.model';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  group!: FormGroup;
  
  animalOptions$!: Observable<AnimalOption[]>;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
  ) {}
  
  ngOnInit(): void {
    this.group = this.createForm();

    this.favoriteAnimal.disable();
    this.animalOptions$ = this.formService.getAnimalOptions().pipe(
      delay(3000),
      tap(() => {
        this.favoriteAnimal.enable();
      })
    );
  }

  get favoriteAnimal(): AbstractControl {
    return this.group.get('favoriteAnimal')!;
  }

  get isReady(): boolean {
    return !this.favoriteAnimal.disabled;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      favoriteAnimal: [],
    });
  }
}
