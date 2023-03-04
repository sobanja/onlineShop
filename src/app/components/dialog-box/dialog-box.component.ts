import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    year: new FormControl(''),
    chip: new FormControl(''),
    SSD: new FormControl(''),
    memory: new FormControl(''),
    display: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSumbit() {
    this.data = {
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: "assets/images/macbook.svg",
      configure: {
        chip: this.myForm.value.chip,
        SSD: this.myForm.value.SSD,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,

      },
    };
    // console.log(this.myForm);
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {}
}
