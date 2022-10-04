import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, delay, forkJoin, Observable, tap } from 'rxjs';
import { AnimalOption } from './models/animal.model';
import { SpacecraftOption } from './models/spacecraft.model';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  animalURL: string = 'https://zoo-animal-api.herokuapp.com/animals/rand/10';
  spacecraftURL: string = 'https://isro.vercel.app/api/spacecrafts';
  
  group!: FormGroup;
  
  animalOptions$!: Observable<AnimalOption[]>;
  spacecraftOptions$!: Observable<SpacecraftOption[]>;

  animalLoading: boolean = false;
  spacecraftLoading: boolean  = false;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
  ) {}
  
  ngOnInit(): void {
    this.group = this.createForm();
    this.getFieldsAsync();
  }

  get favoriteAnimal(): AbstractControl {
    return this.group.get('favoriteAnimal')!;
  }

  get favoriteSpacescraft(): AbstractControl {
    return this.group.get('favoriteSpacescraft')!;
  }

  get loading(): boolean {
    return this.animalLoading || this.spacecraftLoading;
  }

  reset(): void {
    this.group.reset();
    this.getFieldsAsync();
  }

  getFieldsAsync(): void {
    this.error = false;

    this.animalLoading = true;
    this.favoriteAnimal.disable();
    this.animalOptions$ = this.formService.getAnimalOptions(this.animalURL).pipe(
      tap(() => {
        this.animalLoading = false;
        this.favoriteAnimal.enable();
      })
    );
    this.animalOptions$.subscribe(() => {}, error => {
      this.error = true;
      this.animalLoading = false;
    });
    
    this.spacecraftLoading = true;
    this.favoriteSpacescraft.disable();
    this.spacecraftOptions$ = this.formService.getSpacecraftOptions(this.spacecraftURL).pipe(
      tap(() => {
        this.spacecraftLoading = false;
        this.favoriteSpacescraft.enable();
      }),
    );
    this.spacecraftOptions$.subscribe(() => {}, error => {
      this.error = true;
      this.spacecraftLoading = false;
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      favoriteAnimal: [],
      favoriteSpacescraft: [],
    });
  }
}
