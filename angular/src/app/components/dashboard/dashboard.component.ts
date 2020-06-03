import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  elementos = "123456789";
  producto: any = {};
  kardex: any = {};
  productos: any = [];
  operaciones: any =[{id:1,operacion:'Compra'},{id:2,operacion:'Venta'}];
  kardexList: any =[];
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerTablaKardex();
  }
  obtenerProductos(){
   this.productos =[];
   const url = 'http://localhost:8000/products/productList';
   let that = this;
   $.ajax({
           url: url,
           type: 'GET',
           async: false,
           headers: {
             Accept : "application/json"
           },
           success: function (result) {

               for(var i=0;i<result.productList.length;i++){
                 console.log(result.productList[i].productCode);
                 console.log(result.productList[i].product);
                 that.productos.push({code:result.productList[i].productCode,product:result.productList[i].product})
               }
           },
           error: function (e) {
                // log error in browser
               console.log(e);
           }
    });
  }
  obtenerTablaKardex(){
    this.kardexList =[];
    const url = 'http://localhost:8000/products/kardexList';
    let that = this;
    $.ajax({
            url: url,
            type: 'GET',
            async: false,
            headers: {
              Accept : "application/json"
            },
            success: function (result) {
                // process result
                console.log(result);
                for(var i=0;i<result.klist.length;i++){
                  that.kardexList.push({producto:result.klist[i].productCode,stockInicial:result.klist[i].initialStock,operacion:result.klist[i].operation,cantidad:result.klist[i].quantity,stockFinal:result.klist[i].finalStock})
                }

            },
            error: function (e) {
                 // log error in browser
                console.log(e);
            }
     });
  }
  openModalProducto(content,i) {
    console.log('content : ', content)
     const modalRef = this.modalService.open(content, {backdrop: 'static', size: 'lg'});

     modalRef.result.then(value => {
       console.log('component.abrirDialogoCrearCuenta.modalRef.result.then', value);

     }).catch(reason => {
         console.log('component.abrirDialogoCrearCuenta.modalRef.result.catch', reason);
     });
  }
  openModalKardex(content,i) {
    console.log('content : ', content)
     const modalRef = this.modalService.open(content, {backdrop: 'static', size: 'lg'});

     modalRef.result.then(value => {
       console.log('component.abrirDialogoCrearCuenta.modalRef.result.then', value);

     }).catch(reason => {
         console.log('component.abrirDialogoCrearCuenta.modalRef.result.catch', reason);
     });
  }
  crearProducto() {
   console.log(this.producto);
   var prodCode = this.getRandomAlfaNumeric()+"-"+this.getRandom();
   console.log(prodCode);
   console.log(this.producto.product);
   const url = 'http://localhost:8000/products/productAdd';
   let that = this;
   $.ajax({
           url: url,
           type: 'POST',
           data:JSON.stringify({"productCode":prodCode,"product":this.producto.product}),
           async: false,
           contentType: 'application/json',
           headers: {
             Accept : "application/json"
           },
           success: function (result) {
               // process result
               console.log(result);
               that.productos.push({code:prodCode,product:that.producto.product});
               that.producto = {};
           },
           error: function (e) {
                // log error in browser
               console.log(e);
           }
    });
  }
  crearKardex() {
  if(this.kardex.cantidad>0){
    var stockInicial = 0;
    var stockFinal = 0;
    var lastStock;
    var id = this.kardexList.length+1;
    let that = this;
    var prodCode = this.kardex.codigoProducto;
    console.log(prodCode);
    var url = 'http://localhost:8000/products/kList?prodCode='+prodCode;
    $.ajax({
            url: url,
            type: 'GET',
            async: false,
            headers: {
              Accept : "application/json"
            },
            success: function (result) {
                // process result
                console.log(result);
                if(result.length==0){
                  lastStock = [];
                }else{
                  lastStock = result[result.length - 1];
                }
            },
            error: function (e) {
                 // log error in browser
                console.log(e);
            }
    });
    console.log(this.kardex);
    console.log(lastStock);
    console.log(this.kardex.operacion);
    console.log("id = " +id);
    if(lastStock.length == 0){
         stockInicial = 0;
    }else{
         stockInicial = lastStock.finalStock;
    }
    console.log("stockInicial = "+stockInicial);
    //Operación kardex (Compra = 1, Venta = 2)
    if(this.kardex.operacion == 2){
        if(this.kardex.cantidad>stockInicial){
          swal({
                 title: 'Mensaje',
                 text: 'La cantidad vendida no puede ser mayor a la existente en el stock del producto.',
                 type: 'warning'
                }).catch(swal.noop);
        }else{
           stockFinal = stockInicial - this.kardex.cantidad;
           url = 'http://localhost:8000/products/kardexAdd';

           $.ajax({
                   url: url,
                   type: 'POST',
                   data:JSON.stringify({"id":id,"productCode":prodCode,"initialStock":stockInicial,"operation":"Venta","quantity":this.kardex.cantidad,"finalStock":stockFinal}),
                   async: false,
                   contentType: 'application/json',
                   headers: {
                     Accept : "application/json"
                   },
                   success: function (result) {
                       // process result
                       that.kardexList.push({producto:prodCode,stockInicial:stockInicial,operacion:'Venta',cantidad:that.kardex.cantidad,stockFinal:stockFinal});
                   },
                   error: function (e) {
                        // log error in browser
                       console.log(e);
                   }
            });
        }
    }else{
          stockFinal = stockInicial + this.kardex.cantidad;
          url = 'http://localhost:8000/products/kardexAdd';

          $.ajax({
                  url: url,
                  type: 'POST',
                  data:JSON.stringify({"id":id,"productCode":prodCode,"initialStock":stockInicial,"operation":"Compra","quantity":this.kardex.cantidad,"finalStock":stockFinal}),
                  async: false,
                  contentType: 'application/json',
                  headers: {
                    Accept : "application/json"
                  },
                  success: function (result) {
                      // process result
                      that.kardexList.push({producto:prodCode,stockInicial:stockInicial,operacion:'Compra',cantidad:that.kardex.cantidad,stockFinal:stockFinal});
                  },
                  error: function (e) {
                       // log error in browser
                      console.log(e);
                  }
           });
     }
   }else{
     swal({
            title: 'Mensaje',
            text: 'La cantidad debe ser mayor de 0',
            type: 'warning'
           }).catch(swal.noop);
   }
   this.kardex = {};
  }
  eliminarProducto(index){
    var code = this.productos[index].code;
    const resultado = this.kardexList.find( l => l.producto === code );
    if(resultado === undefined){

     let that = this;
     const url = 'http://localhost:8000/products/productDelete';
     $.ajax({
             url: url,
             type: 'POST',
             data:JSON.stringify({"productCode":code}),
             async: false,
             contentType: 'application/json',
             headers: {
               Accept : "application/json"
             },
             success: function (result) {
                 // process result
                 console.log(result);
                 that.productos.splice(index,1);
             },
             error: function (e) {
                  // log error in browser
                 console.log(e);
             }
      });
    }else{
      swal({
         title: 'Mensaje',
         text: 'No se puede eliminar el producto porque ya hay uno o varios registros de kardex asociados.',
         type: 'warning'
      }).catch(swal.noop);
    }
    console.log(resultado);
  }
  getRandom(){
    return Math.floor(Math.random() * (100 - 2)) + 1;
  }
  getRandomAlfaNumeric(){
    var str = '';
    var ref = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i=0; i<4; i++)
    {
       str += ref.charAt(Math.floor(Math.random()*ref.length));
    }
    return str;
  }
}
