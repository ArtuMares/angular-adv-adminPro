import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';


import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {

  @ViewChild('txtTermino') txtTermino?:ElementRef;
  
  public hospitales?: Hospital[];
  public cargando: boolean = true;
  private imgSubs?: Subscription;
  private timeout:any;


  constructor(private hs:HospitalService, private mi:ModalImagenService, private bs: BusquedasService, private ar:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.mi.nuevaImagen.pipe(delay(100)).subscribe(img =>{
      this.cargarHospitales();
    });
  }

  ngAfterViewInit(): void {
    this.ar.params.subscribe(({hospital}) =>{
      if(hospital){ 
        this.buscar(hospital);
        this.txtTermino!.nativeElement.value = hospital;
        }
    });
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  
  cargarHospitales(){
    this.cargando=true;

    this.hs.cargarHospitales().subscribe(({hospitales})=> {
      this.cargando =false;
      this.hospitales = hospitales;
    })
  }

  guardarCambios(hospital:Hospital){
    this.hs.actualizarHospital(hospital._id!, hospital.nombre).subscribe(resp=>{

      Swal.fire("Actualizado","El hospital ha sido actualizado satisfactoriamente", "success");

    });
  }
  borrarHospital(hospital:Hospital){
      this.hs.eliminarHospital(hospital._id!).subscribe(resp=>{
      this.cargarHospitales()
      Swal.fire("Borrado","El hospital ha sido Eliminado satisfactoriamente", "success");

    });
  }

  async abrirSwal(){
    const valor = await Swal.fire({
      input: 'text',
      title: "Crear hospital",
      inputLabel: 'Ingrese el nombre del nuevo hospital',
      showCancelButton: true,
      inputPlaceholder: 'Hospital regional...'
    })
    
    if (valor.isConfirmed ) {
      if(valor.value.trim().length > 0){
        this.hs.crearHospital(valor.value).pipe(delay(100)).subscribe((resp:any)=>{
          this.hospitales?.push(resp.hospital);
          Swal.fire(`Hospital creado`, `El hospital: "${valor.value}" ha sido creado'`, "success");    
        });
      }else{
         Swal.fire("Eror", "Ingrese un nombre válido", "error");    
      }
    }
  }

  abrirModal(hospital:Hospital){
      this.mi.abrirModal("hospitales", hospital._id!, hospital.img);
  }

  buscar(termino: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.cargando =true;
      if (termino.trim().length < 1) {
        return this.cargarHospitales();
      }
      this.bs.buscar("hospitales", termino.trim())
      .subscribe(resultados => {
        this.hospitales = resultados!;
        this.cargando =false;
      });
      return;
    }, 500);
  }
}
