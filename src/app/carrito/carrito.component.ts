import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { ObjetosCarritoService } from '../objetos-carrito.service';
import { Objetos } from "../objetos";
import * as $ from "jquery";
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

    message:string;
    comprados:number;
    objetosTotal2: Objetos[] = [];
    currentEmail: string;
    totalCompra: number = 0;

  constructor(private data: DataService, private objetosCarrito: ObjetosCarritoService, private router: Router) { }

  ngOnInit() {
      this.objetosCarrito.currentMessage.subscribe(comprados => this.comprados = comprados);
      this.data.currentMessage.subscribe(message => this.message = message);
      this.currentEmail = this.message;

      $.ajax({
          url: "https://oliver45.000webhostapp.com/obtener_carrito.php",
          method: "POST",
          header: {
              'Access-Control-Allow-Origin':"*",
              'Access-Control-Allow-Methods':"GET,PUT,POST,DELETE",
              'Access-Control-Allow-Headers': 'Content-Type'
           } ,
           dataType: 'json',
          data: {username: this.currentEmail},
          success:(respuesta)=> {

              if(respuesta.msg == "OK"){

                  for(let i=0; i<respuesta.objetos.length;i++){
                      let tempId;
                      let tempNombre;
                      let tempCantidad;
                      let tempImagen;
                      let tempPrecio;
                      let tempSubTotal;

                      tempId = respuesta.objetos[i].id;
                      tempNombre = respuesta.objetos[i].nombre;
                      tempCantidad = respuesta.objetos[i].cantidad;
                      tempImagen = respuesta.objetos[i].imagen;
                      tempPrecio = respuesta.objetos[i].precio;
                      tempSubTotal = respuesta.objetos[i].subtotal;

                      this.totalCompra += parseInt(tempSubTotal, 10);
                      this.objetosTotal2.push(new Objetos(tempId,tempNombre,tempCantidad, tempImagen, tempPrecio, tempSubTotal));

                  }

              }else{
                  alert("Error del servidor");
              }


          }
      });

  }

  cancelar(){
      $.ajax({
          url: "https://oliver45.000webhostapp.com/cancelar_carrito.php",
          method: "POST",
          header: {
              'Access-Control-Allow-Origin':"*",
              'Access-Control-Allow-Methods':"GET,PUT,POST,DELETE",
              'Access-Control-Allow-Headers': 'Content-Type'
           } ,
           dataType: 'json',
          data: {username: this.currentEmail},
          success:(respuesta)=> {

              if(respuesta.msg == "OK"){


              this.comprados = 0;

              }else{
                  alert("Error del servidor");

              }
          }
      });

    }


  pagar(){
      $.ajax({
          url: "https://oliver45.000webhostapp.com/pagar_carrito.php",
          method: "POST",
          header: {
              'Access-Control-Allow-Origin':"*",
              'Access-Control-Allow-Methods':"GET,PUT,POST,DELETE",
              'Access-Control-Allow-Headers': 'Content-Type'
           } ,
           dataType: 'json',
          data: {
              username: this.currentEmail,
              objetos: this.objetosTotal2
          },
          success:(respuesta)=> {

              if(respuesta.msg == "OK"){
                  this.router.navigate(['/main']);
                  this.comprados = 0;

              }else{
                  alert("Error del servidor");

              }
          }
      });

  }

}
