import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from "../data.service";




@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],

})
export class LoginFormComponent implements OnInit {

    mensajeEmail = "No compartiremos sus datos con nadie";
    mensajePass:string = "Su contraseña esta protegida";
    estilo: string = "white";


    constructor(private router: Router, private data: DataService) {

    }

    ngOnInit(): void {

   }



  submitLogin(form){

        $.ajax({
            url: "https://oliver45.000webhostapp.com/check_login.php",
            method: "POST",
            header: {
                'Access-Control-Allow-Origin':"*",
                'Access-Control-Allow-Methods':"GET,PUT,POST,DELETE",
                'Access-Control-Allow-Headers': 'Content-Type'
             } ,
            data: {username: form.email, password: form.password},
            dataType: 'json',
            success:(respuesta)=> {
                if(respuesta.msg = "OK"){
                    this.router.navigate(['/main']);
                     this.data.changeMessage(form.email);
                }
            },
            error:(respuesta)=>{
                
                this.estilo = "red";
                this.mensajePass = "Contraseña o correo invalidos";

            }
        });


      }


      incorrecto(){
         return {color:" "+this.estilo};
    }

  }
