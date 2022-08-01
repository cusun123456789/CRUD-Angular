import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-detail-page-product',
  templateUrl: './detail-page-product.component.html',
  styleUrls: ['./detail-page-product.component.scss']

})
export class DetailPageProductComponent implements OnInit {
  public productListDeatil : any ;

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.api.getProductDetail()
      .subscribe(res=>{
        this.productListDeatil = res;
      })
  }
}
