import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import {AbstractRxComponent} from "../AbstractRxComponent";
import {MeteorDataTable} from "../../meteor-datatable/MeteorDataTable";
import {Observable} from "rxjs";
import {MongoObservable} from "meteor-rxjs";
import {ToastsManager} from "ng2-toastr";

@Component({
             selector   : 'angular-meteor-datatable',
             templateUrl: 'angular-meteor-datatable.html'
           })
export class AngularMeteorDataTableComponent extends AbstractRxComponent implements OnInit {
  @Input('collectionObservable') private collectionObservable: Observable<MongoObservable.Collection<any>>;
  @Input('tableConfig') private tableConfig: any;
  
  @ViewChild('dataTable') dataTable: ElementRef;
  
  meteorDataTable: MeteorDataTable;
  
  constructor(protected toast: ToastsManager) {
    super();
  }
  
  ngOnInit() {
    this._initTable()
  }
  
  private _initTable() {
    this.meteorDataTable            = new MeteorDataTable(jQuery(this.dataTable.nativeElement), this.tableConfig, this.collectionObservable);
    this._subscription['dataTable'] = this.meteorDataTable.meteorDataTableSubscription;
  }
  
}
