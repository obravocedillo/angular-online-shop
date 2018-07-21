import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from "../data.service";
import { ObjetosCarritoService } from '../objetos-carrito.service';
import { Objetos } from "../objetos";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],

})

export class MainPageComponent implements OnInit {

    message:string;
    message2: number;
    objetosTotal: Objetos[] = [];
    comprados:number;
    currentId: number;
    currentPrecio: number;
    currentProducto: string;
    currentImagen: string;


  constructor(private data: DataService, private objetosCarrito: ObjetosCarritoService, private router: Router ) { }

  ngOnInit() {
      this.objetosCarrito.currentMessage.subscribe(message2 => this.message2 = message2);
      this.data.currentMessage.subscribe(message => this.message = message);

      $.ajax({
          url: "https://oliver45.000webhostapp.com/obtener_tienda.php",
          method: "POST",
          header: {
              'Access-Control-Allow-Origin':"*",
              'Access-Control-Allow-Methods':"GET,PUT,POST,DELETE",
              'Access-Control-Allow-Headers': 'Content-Type'
           } ,
           dataType: 'json',
          data: {username: this.message},
          success:(respuesta)=> {

              if(respuesta.msg == "OK"){

                  for(let i=0; i<respuesta.objetos.length;i++){
                      let tempId;
                      let tempNombre;
                      let tempCantidad;
                      let tempImagen;
                      let tempPrecio;

                      tempId = respuesta.objetos[i].id;
                      tempNombre = respuesta.objetos[i].nombre;
                      tempCantidad = respuesta.objetos[i].cantidad;
                      tempImagen = respuesta.objetos[i].imagen;
                      tempPrecio = respuesta.objetos[i].precio;


                      this.objetosTotal.push(new Objetos(tempId,tempNombre,tempCantidad, tempImagen, tempPrecio,0));
                  }
                  this.comprados = 0;


              }else{
                  alert("Error del servidor");
              }


          }
      });

  }

    agregarCantidad(form, objeto){

        this.objetosCarrito.changeMessage(form.comprados);
        this.comprados = form.comprados;
        this.currentId = objeto.id;
        this.currentPrecio = objeto.precio;
        this.currentProducto = objeto.name;
        this.currentImagen = objeto.imagen;
        $.ajax({
            url: "https://oliver45.000webhostapp.com/agregar_carrito.php",
            method: "POST",
            header: {
                'Access-Control-Allow-Origin':"*",
                'Access-Control-Allow-Methods':"GET,PUT,POST,DELETE",
                'Access-Control-Allow-Headers': 'Content-Type'
             } ,
             dataType: 'json',
            data: {
                username: this.message,
                id: this.currentId,
                precio: this.currentPrecio,
                cantidad: this.comprados,
                nombre: this.currentProducto,
                imagen: this.currentImagen
            },
            success:(respuesta)=> {


            }

        });
    }

    busqueda(evento){

        console.log(evento.target.value);
        $.ajax({
            url: "https://oliver45.000webhostapp.com/busqueda.php",
            method: "POST",
            header: {
                'Access-Control-Allow-Origin':"*",
                'Access-Control-Allow-Methods':"GET,PUT,POST,DELETE",
                'Access-Control-Allow-Headers': 'Content-Type'
             } ,
             dataType: 'json',
            data: {
                busqueda:evento.target.value
            },
            success:(respuesta)=> {
                this.objetosTotal = [];
                console.log(respuesta);
                console.log(this.objetosTotal);
                
                for(let i=0; i<respuesta.objetos.length;i++){
                    let tempId;
                    let tempNombre;
                    let tempCantidad;
                    let tempImagen;
                    let tempPrecio;

                    tempId = respuesta.objetos[i].id;
                    tempNombre = respuesta.objetos[i].nombre;
                    tempCantidad = respuesta.objetos[i].cantidad;
                    tempImagen = respuesta.objetos[i].imagen;
                    tempPrecio = respuesta.objetos[i].precio;


                    this.objetosTotal.push(new Objetos(tempId,tempNombre,tempCantidad, tempImagen, tempPrecio,0));
                }

            }

        });
    }





}
