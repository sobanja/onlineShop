import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})

export class DialogBoxComponent {
  constructor(
    // inject(внедрять) matdialogref from DI
    // инжектим сервис для дальнейшей работы с текущ открытым диалогом 
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // search of dependency by token 
    // через декоратор inject по токену MDD мы вытаскиваем данные из DI 
    // и заносим их в свойство data чтобы использовать в контексте класса 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) this.isNew = false;
  }
  // create form 
  // formcontrol need for primitive types. here we initialize them for after work
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    year: new FormControl(this.data?.year ?? ''),
    chip: new FormControl(this.data?.chip ?? ''),
    SSD: new FormControl(this.data?.SSD ?? ''),
    memory: new FormControl(this.data?.memory ?? ''),
    display: new FormControl(this.data?.display ?? ''),
  });

  isNew: boolean = true;

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSumbit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: 'assets/images/macbook.svg',
      configure: {
        chip: this.myForm.value.chip,
        SSD: this.myForm.value.SSD,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      },
    };
    // console.log(this.myForm);
    // after created obj with values we close dialog window and send data 
    this.dialogRef.close(this.data);
  }
}
