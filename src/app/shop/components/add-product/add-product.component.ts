import { Component, OnInit, Input } from '@angular/core';
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

  @Input() editItemId;
  editItem;
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

    if (this.editItemId) {
      this.editItem.id = this.productForm.controls['pId'].value;
      this.editItem.name = this.productForm.controls['name'].value;
      this.editItem.description = this.productForm.controls['description'].value;
      this.editItem.imgs = this.images;
      this.editItem.video = this.productForm.controls['video'].value;
      this.editItem.colour = this.productForm.controls['colour'].value;
      this.editItem.rating = this.productForm.controls['rating'].value;
      this.editItem.productType = this.productForm.controls['productType'].value;
      this.editItem.price.value = this.productForm.controls['value'].value;
      this.editItem.price.ISO = this.productForm.controls['ISO'].value;
      this.editItem.price.currency = this.productForm.controls['currency'].value;
      this.editItem.price.message = this.productForm.controls['currency'].value;
      this.editItem.stock.status = this.productForm.controls['stockStatus'].value;
      this.editItem.stock.message = this.productForm.controls['stockMessage'].value;

      let index = this.productList.indexOf(this.editItem);
      this.productList[index] = this.editItem;
      this.productService.resetProducts(this.productList);
      this.toastr.success("Product updated successfully");
    } else {
      let product = new ProductModel();
      product.id = this.productForm.controls['pId'].value;
      product.name = this.productForm.controls['name'].value;
      product.description = this.productForm.controls['description'].value;
      product.imgs = this.images;
      product.video = this.productForm.controls['video'].value;
      product.colour = this.productForm.controls['colour'].value;
      product.rating = this.productForm.controls['rating'].value;
      product.productType = this.productForm.controls['productType'].value;
      product.price.value = this.productForm.controls['value'].value;
      product.price.ISO = this.productForm.controls['ISO'].value;
      product.price.currency = this.productForm.controls['currency'].value;
      product.price.message = this.productForm.controls['currency'].value;
      product.stock.status = this.productForm.controls['stockStatus'].value;
      product.stock.message = this.productForm.controls['stockMessage'].value;
      this.productService.saveProduct(product);
      this.toastr.success("Product added successfully");
    }
    this.productForm.reset();
    this.images = [];
    this.img = '';
  }

  selectedImage(image) {
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

  clearImages() {
    this.images = [];
    this.img = '';
  }

  deleteItem(id) {
    let products = this.productList.filter(p => p.id !== id)
    this.productService.resetProducts(products);
    this.productList = products;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => this.productList = res);

    if (this.editItemId) {
      console.log(this.editItemId);
      this.editItem = this.productList.find(item => item.id === this.editItemId)
      console.log(this.editItem);

      this.productForm = this.fb.group({
        pId: [this.editItem.id, Validators.required],
        name: [this.editItem.name, Validators.required],
        description: [this.editItem.description, Validators.required],
        video: [this.editItem.video],
        colour: [this.editItem.colour, Validators.required],
        rating: [this.editItem.rating, Validators.required],
        productType: [this.editItem.productType, Validators.required],
        value: [this.editItem.price.value, Validators.required],
        ISO: [this.editItem.price.ISO, Validators.required],
        currency: [this.editItem.price.currency, Validators.required],
        stockStatus: [this.editItem.stock.status, Validators.required],
        stockMessage: [this.editItem.stock.message, Validators.required],
      });
      this.images = this.editItem.imgs;
      this.img = this.images[0].url;

    } else {
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
    }
    console.log(this.productList);
  }
}
