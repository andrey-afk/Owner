import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarOwnersService} from "../../services/CarOwnersService";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap, takeUntil} from "rxjs/operators";
import {Car, Owner} from "../../models/interface";
import {of, Subject} from "rxjs";

@Component({
  selector: 'app-edit-page',
  templateUrl: './user-info.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public owner: Owner[] = [];
  public id!: string;
  public destroy$ = new Subject<void>();


  constructor(
    private serv: CarOwnersService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(({id}) => {
        this.id = id;
        return id ? this.serv.getOwnerById(id) : of(undefined)
      }),
      takeUntil(this.destroy$)
      )
      .subscribe( (res) => {
        this.initForm(res);
      }
    )
  }

  get carsControl(): FormArray{
    return this.form.controls['aCars'] as FormArray;
  }

  createCarControl(car?: Car): FormGroup {
    return this.fb.group({
      aCarNumber: [car?.aCarNumber, [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{4}[A-Z]{2}/)]],
      aCarBrand: [car?.aCarBrand, Validators.required],
      aCarModel: [car?.aCarModel, Validators.required],
      aCarYear: [car?.aCarYear, [
        Validators.required, Validators.maxLength(4),
        Validators.pattern(/^[0-9]{4}/),
        Validators.min(1990), Validators.max(2021)
      ]]
    })
  }

  initForm(owner?: Owner): void {
    this.form = this.fb.group({
      aLastName: [owner?.aLastName, Validators.required],
      aFirstName: [owner?.aFirstName, Validators.required],
      aMiddleName: [owner?.aMiddleName, Validators.required,],
        aCars: this.fb.array([
      ])
    })
    owner ? owner.aCars.forEach(car => {
      this.carsControl.push(this.createCarControl(car))
    }) : this.carsControl.push(this.createCarControl())
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.serv.editOwner({...this.form.value, id: this.id}).subscribe()
      } else {
        this.serv.createOwner({...this.form.value, id:  `${+new Date()}`}).subscribe()
      }
      this.router.navigate(['/'])
    }
  }

  addNewCar() {
    this.carsControl.push(this.createCarControl())
  }

  onDelete(index: number) {
    this.carsControl.removeAt(index)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
