import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogCalculatorComponent} from '../dialog-calculator/dialog-calculator.component';


export interface DialogData {
  title: string;
  color: string;
  background: string;
  risk: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  selectedStep1Option:any;
  selectedStep2Option:any;
  cardio: 'oui' | '0';
  diabete: 'oui' | '0';
  respiration: 'oui' | '0';
  hypertension: 'oui' | '0';
  cancer: 'oui' | '0';
  ageForm: FormGroup;
  sexeForm: FormGroup;
  maladieForm: FormGroup;
  submitted = false;
  private i: number;
  risk: number;
  private sexe: number;
  private age: number;
  private cardioValue: number;
  private diabeteValue: number;
  private respirationValue: number;
  private hypertensionValue: number;
  private cancerValue: number;
  title: string;
  color: string
  background:string;
  private result: { color: string; background: string; title: string };
  private cache: number;
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedStep1Option = false
    this.selectedStep2Option = false

    this.result = {
      title: 'OK',
      color: 'rgba(14, 233, 203)',
      background: 'rgba(14, 233, 203, 0.14)',
    }
    this.risk = 0;

    this.cardio= '0';
    this.diabete= '0';
    this.respiration= '0';
    this.hypertension= '0';
    this.cancer= '0';

    this.ageForm = this.formBuilder.group({
      age: [false, Validators.required]
    });

    this.sexeForm = this.formBuilder.group({
      sexe: [false, Validators.required]
    });

    this.maladieForm = this.formBuilder.group({
      cardio: [false, Validators.required],
      diabete: [false, Validators.required],
      respiration: [false, Validators.required],
      hypertension: [false, Validators.required],
      cancer: [false, Validators.required]
    });
  }

  onSubmit() {
    this.cardioValue = 0;
    this.diabeteValue = 0;
    this.respirationValue =  0;
    this.hypertensionValue =   0;
    this.cancerValue =    0;

    this.cache = 0;
    this.risk = 0;
    this.submitted = true;

    // stop here if form is invalid
    if (this.ageForm.invalid || this.sexeForm.invalid || this.maladieForm.invalid) {
      return;
    }


    this.age =  parseFloat(this.ageForm.value.age);
    this.sexe =  parseFloat(this.sexeForm.value.sexe);


    if(this.maladieForm.value.cardio == true) {
      this.cardioValue =  10.5;
    }
    if(this.maladieForm.value.diabete == true) {
      this.diabeteValue =  7.3;
    }
    if(this.maladieForm.value.respiration == true) {
      this.respirationValue =  6.3;
    }
    if(this.maladieForm.value.hypertension == true) {
      this.hypertensionValue =  6;
    }
    if(this.maladieForm.value.cancer == true) {
      this.cancerValue = 5.6;
    }

    this.risk += this.age;
    this.risk += this.sexe;
    this.cache = this.risk;

    if(this.cardioValue > 0) this.risk += ((this.cache * this.cardioValue) - this.cache);
    if(this.diabeteValue > 0) this.risk += ((this.cache * this.diabeteValue) - this.cache);
    if(this.respirationValue > 0) this.risk += ((this.cache * this.respirationValue) - this.cache);
    if(this.hypertensionValue > 0) this.risk += ((this.cache * this.hypertensionValue) - this.cache);
    if(this.cancerValue > 0) this.risk += ((this.cache * this.cancerValue) - this.cache);

    if (this.risk < 0) this.risk = 0;
    if (this.risk > 92 ) this.risk = 92;

    if (this.risk > 0 || !this.risk) this.result = {
      title: 'Tu devrais aller bien',
      color: 'rgba(14, 233, 203)',
      background: 'rgba(14, 233, 203, 0.75)',
    }
    if (this.risk > 5) this.result = {
      title: 'Prenez des précautions',
      color: 'rgba(255, 193, 55)',
      background: 'rgba(255, 193, 55,0.75)',
    }
    if (this.risk > 30) this.result = {
      title: 'vous courez un risque',
      color: 'rgba(243, 83, 83)',
      background: 'rgba(243, 83, 83, 0.75)',
    }

    const dialogRef =this.dialog.open(DialogCalculatorComponent, {
      width: 'auto',
      data: {title: this.result.title,color:this.result.color,background:this.result.background,risk:this.risk.toFixed(2)}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.risk = 0;
      this.cache = 0;
    });
  }

  SelectionAge(){
    this.selectedStep1Option=true;
  }
  SelectionSexe(){
    this.selectedStep2Option=true;
  }


}
