import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  actionBtn: string = 'save'
  productForm !: FormGroup;


  isclick:boolean = false;
  using(){
    this.isclick = true;
  }
  noUsing(){
    this.isclick = false;
  }
  constructor(
    private FormBuilder: FormBuilder,
    private api: ApiService,
    private notifier: NotifierService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,

  ) { }

  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: [''],
      nameUser:['no User'],
      date: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', [Validators.required]],
      img:['']
    });
    // console.log(this.editData);

    // lấy data vào lại form trong phần update
    if (this.editData) {
      this.actionBtn = 'Update'
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['nameUser'].setValue(this.editData.nameUser);
      this.productForm.controls['img'].setValue(this.editData.img);
    }
  }
  get productName() {
    return this.productForm.get('productName')
  } get category() {
    return this.productForm.get('category')
  } get freshness() {
    return this.productForm.get('freshness')
  } get date() {
    return this.productForm.get('date')
  } get price() {
    return this.productForm.get('price')
  } get comment() {
    return this.productForm.get('comment')
  } get nameUser() {
    return this.productForm.get('nameUser')
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next:(res) => {
              this.notifier.showSnackBar('Product Added', 'oke', 'success')
              this.productForm.reset();
              this.dialogRef.close('save');
              // this.getAllProduct()
            },
            error: () => {
              // alert("There was an error")
              this.notifier.showSnackBar('There was an error', 'oke', 'error')
            }
          })
      }
    }
    else {
      this.updateProduct()
    }
  }


  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.notifier.showSnackBar('Product Added', 'oke', 'success')
          this.productForm.reset();
          this.dialogRef.close('update');
          // this.getAllProduct()
        },
        error: () => {
          this.notifier.showSnackBar('There was an error', 'oke', 'error')
        }
      })
  }

  open(DialogComponent: DialogComponent, param2: {width: string}) {

  }
}
