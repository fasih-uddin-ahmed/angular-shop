import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductModel } from "../../../utilities/common/productModel";
import { ProductService } from "../../Service/product.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  img: string;
  imgIndex: number = 0;
  images: Array<any> = [];
  productList;
  label = "New Products";

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  get validations() { return this.productForm.controls; }

  onSubmit() {
    console.log("submitted");
    let product = new ProductModel();
    product.id = this.productForm.controls['pId'].value;
    product.name = this.productForm.controls['name'].value;
    product.description = this.productForm.controls['description'].value;
    product.imgs = this.images;
    product.video = this.productForm.controls['video'].value;
    product.colour = this.productForm.controls['colour'].value;
    product.rating = this.productForm.controls['rating'].value;
    product.price.value = this.productForm.controls['value'].value;
    product.price.ISO = this.productForm.controls['ISO'].value;
    product.price.currency = this.productForm.controls['currency'].value;
    product.price.message = this.productForm.controls['currency'].value;
    product.stock.status = this.productForm.controls['stockStatus'].value;
    product.stock.message = this.productForm.controls['stockMessage'].value;
    // localStorage.setItem("products", JSON.stringify(product));
    this.productService.saveProduct(product);
    this.toastr.success("Product added successfully");
  }

  selectedImage(image) {
    // console.log(image);
    this.img = image.url;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let target: any = event.target;
        this.img = target.result;
        // this.url = JSON.parse(event.target.result);
        this.images[this.imgIndex] = { url: this.img };
        this.imgIndex++;
        // console.log(this.images);
      }
    }
  }

  deleteItem(id) {
    let products = this.productList.filter(p => p.id !== id)
    this.productService.resetProducts(products);
    this.productList = products;
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      pId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      video: [''],
      colour: ['', Validators.required],
      rating: ['', Validators.required],
      productType: ['', Validators.required],
      value: ['', Validators.required],
      ISO: ['', Validators.required],
      currency: ['', Validators.required],
      stockStatus: ['', Validators.required],
      stockMessage: ['', Validators.required],
    });
    this.productService.getProducts().subscribe(res => this.productList = res);
    console.log(this.productList);
  }
}
