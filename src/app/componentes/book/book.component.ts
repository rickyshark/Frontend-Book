import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/servicio/service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  listaLibro: any [] =  [ ]
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  buscar:string;

  constructor(private fb: FormBuilder, private _serviceBook: ServiceService) {
    this.form = this.fb.group({
      nombre: ['',Validators.required],
      autor: ['',Validators.required],
      editorial: ['',Validators.required]

    });
   }

  ngOnInit(): void {
    this.obtenerLibro();
    this.accion;
  }

  obtenerLibro()
  {
    this._serviceBook.getListLibros().subscribe(data =>{
      this.listaLibro = data;
    },error =>{
      console.log(error);
    })
  }

  guardarLibro(){
    const libro: any ={
      nombre: this.form.get('nombre')?.value,
      autor: this.form.get('autor')?.value,
      editorial: this.form.get('editorial')?.value
    }

    if (this.id == undefined) {
      this._serviceBook.saveLibro(libro).subscribe(data => {
        this.obtenerLibro();
        this.form.reset();
      }, error => {
        console.log(error);
      })
    }else
    {
      libro.bookId = this.id;
      this._serviceBook.updateTLibro(this.id,libro).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerLibro();
      })
    }

    
    
  }

  eliminarLibro(id: number) {
    this._serviceBook.deleteLibro(id).subscribe(data => {
      this.obtenerLibro();
    }, error => {
      console.log(error);
    })
    //sds
  }

  editarLibro(libro: any) {
    this.accion = 'Editar';
    this.id = libro.bookId;

    this.form.patchValue({
      nombre: libro.nombre,
      autor: libro.autor,
      editorial: libro.editorial,

    })
  }

  buscarLibro() 
  {
    this.listaLibro = this.listaLibro.filter(data =>{
      return data.bookId.toString().trim() === this.buscar;
    })
    
  }



}
