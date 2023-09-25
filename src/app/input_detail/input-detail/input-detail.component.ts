import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  FormControl,
} from '@angular/forms';

interface IForm {
  filing: string;
  month: string;
  year: number;
  value: number;
  surcharge: number;
  Penalty: number;
  taxAmount: number;
  totalAmountPayable: number;
}

@Component({
  selector: 'input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.css'],
})
export class InputDetailComponent {
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: number[] = [];
  selectedMonth: any;
  selectedYear: any;
  currentMonth: number;
  currentYear: number;
  review: boolean = false;
  selectFiling: string = 'Ordinary Filing';

  formData = this.fb.group<IForm | {}>({
    filing: ['Ordinary Filing'],
    month: ['', Validators.required],
    year: ['', Validators.required],
    value: [0],
    vat: [0],
    surcharge: [0],
    penalty: [0],
    taxAmount: [0],
    totalAmountPayable: [0],
  });

  constructor(private fb: FormBuilder) {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();

    for (let year = 2020; year <= this.currentYear; year++) {
      this.years.push(year);
    }

    this.formData.patchValue({
      penalty: 200.0,
    });
  }

  selectedFiling(val: string) {
    this.formData.patchValue({
      filing: val,
    });
    this.selectFiling = val;
  }

  calVat() {
    let value = this.formData.get('value')?.value || 0;
    let penalty = this.formData.get('penalty')?.value || 0;
    let vat = value * 0.07;
    let surcharge = vat * 0.1;
    let taxAmount = vat + surcharge + penalty;

    if (this.selectFiling === 'Ordinary Filing') {
      this.formData.patchValue({
        totalAmountPayable: value + vat,
      });
    } else if (this.selectFiling === 'Additional Filing') {
      this.formData.patchValue({
        totalAmountPayable: value + taxAmount,
      });
    }
    this.formData.patchValue({
      value: value.toFixed(2),
      vat: vat.toFixed(2),
      surcharge: surcharge.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
    });
  }

  nextReview() {
    this.review = true;
    console.warn(this.formData.getRawValue());
  }

  sendData() {
    alert(JSON.stringify(this.formData.getRawValue()));
  }
}
