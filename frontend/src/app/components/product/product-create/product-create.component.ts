import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name:'',
    price: null!
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  createProduct(): void{
    if(this.product.name == '' || this.product.price == null){
      console.log("name: " + this.product.name
      + "\n price: " + this.product.price);
      this.productService.showMessage('Dados invalidos! Produto não cadastrado...');
    }else{

      this.productService.create(this.product).subscribe(
        ()=>{
          this.productService.showMessage('Produto criado!');
          this.router.navigate(['/products']);
        }
      );
    }
  }

  cancel(): void{
    this.router.navigate(['/products']);
  }

}
