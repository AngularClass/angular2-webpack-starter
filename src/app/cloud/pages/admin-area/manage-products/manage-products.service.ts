import {Injectable} from '@angular/core';
import {MeteorObservable} from "meteor-rxjs";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Injectable()
export class ManageProductsService {
  viewState: any = {
    headerText: ""
  };
  viewData: any  = {};

  constructor(protected toast: ToastsManager,
              protected router: Router) { }

  createProduct(product: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("product.create_product", product).subscribe((res) => {
          this.router.navigate(['cloud/products']);
          this.toast.success("Create Product Successful");
          resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

  editProduct(product: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("product.edit_product", product).subscribe((res) => {
        this.router.navigate(['cloud/products/' + product._id]);
        this.toast.success("Edit Product Successful");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

  createVersion(data: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("version.create_product_version", data).subscribe((res) => {
        this.router.navigate(['cloud/products/' + data._id]);
        this.toast.success("Create Version Successful");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }
}
