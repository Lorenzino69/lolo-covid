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



  cardio: 'oui' | '0';
  diabete: 'oui' | '0';
  respiration: 'oui' | '0';
  hypertension: 'oui' | '0';
  cancer: 'oui' | '0';
  registerForm: FormGroup;
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

    this.result = {
      title: 'You should be fine',
      color: 'rgba(14, 233, 203)',
      background: 'rgba(14, 233, 203, 0.14)',
    }
    this.risk = 0;

    this.cardio= '0';
    this.diabete= '0';
    this.respiration= '0';
    this.hypertension= '0';
    this.cancer= '0';
    this.registerForm = this.formBuilder.group({
      age: [false, Validators.required],
      sexe: [false, Validators.required],
      cardio: [false, Validators.required],
      diabete: [false, Validators.required],
      respiration: [false, Validators.required],
      hypertension: [false, Validators.required],
      cancer: [false, Validators.required]
    });
  }

  onSubmit() {
    this.cache = 0;
    this.risk = 0;
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }


    this.age =  parseFloat(this.registerForm.value.age);
    this.sexe =  parseFloat(this.registerForm.value.sexe);


    this.cardioValue =  parseFloat(this.registerForm.value.cardio);
    this.diabeteValue =  parseFloat(this.registerForm.value.diabete);
    this.respirationValue =  parseFloat(this.registerForm.value.respiration);
    this.hypertensionValue =   parseFloat(this.registerForm.value.hypertension);
    this.cancerValue =   parseFloat(this.registerForm.value.cancer);


    this.risk += this.age;
    this.risk += this.sexe;


    this.cache = this.risk;
    // this.risk += ((this.cache * this.sexe) - this.cache);
    if(this.cardioValue > 0) this.risk += ((this.cache * this.cardioValue) - this.cache);
    if(this.diabeteValue > 0) this.risk += ((this.cache * this.diabeteValue) - this.cache);
    if(this.respirationValue > 0) this.risk += ((this.cache * this.respirationValue) - this.cache);
    if(this.hypertensionValue > 0) this.risk += ((this.cache * this.hypertensionValue) - this.cache);
    if(this.cancerValue > 0) this.risk += ((this.cache * this.cancerValue) - this.cache);

    if (this.risk < 0) this.risk = 0;
    if (this.risk > 92 ) this.risk = 92;

    if (this.risk > 0 || !this.risk) this.result = {
      title: 'You should be fine',
      color: 'rgba(14, 233, 203)',
      background: 'rgba(14, 233, 203, 0.14)',
    }
    if (this.risk > 5) this.result = {
      title: 'Take extra precautions',
      color: 'rgba(255, 193, 55)',
      background: 'rgba(255, 193, 55,0.14)',
    }
    if (this.risk > 30) this.result = {
      title: 'You are at risk',
      color: 'rgba(243, 83, 83)',
      background: 'rgba(243, 83, 83, 0.14)',
    }

    const dialogRef =this.dialog.open(DialogCalculatorComponent, {
      width: '250px',
      data: {title: this.result.title,color:this.result.color,background:this.result.background,risk:this.risk.toFixed(2)}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.risk = 0;
      this.cache = 0;
    });
  }

}
