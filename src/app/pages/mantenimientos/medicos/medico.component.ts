import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: []
})
export class MedicoComponent implements OnInit {

  public medicoForm!:UntypedFormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado?:Medico;
  public hospitalSeleccionado?:Hospital ;

  constructor(private fb:UntypedFormBuilder, private hs:HospitalService, private ms:MedicoService, private router:Router, private ar:ActivatedRoute) { }

  ngOnInit(): void {
    this.ar.params.subscribe(({id}) => this.cargarMedico(id));


    this.medicoForm= this.fb.group({
      nombre: ["", Validators.required],
      hospital: ["", Validators.required]
    });
    this.cargarHospitales();


    this.medicoForm.get("hospital")?.valueChanges.subscribe(hospitalID => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalID);
    })
  }

  cargarMedico(id:string){
    if(id ==="nuevo"){
      return;
    }

    this.ms.obtenerMedicoPorId(id)
    .pipe(delay(100))
    .subscribe((resp:any) =>{
      if(!resp.medico){
        return this.router.navigateByUrl(`/dashboard/medicos`);
      }
      const medico = resp.medico;
      const {nombre, hospital:{_id}} = medico;
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({nombre, hospital: _id});
      return;
    })
  }

  guardarMedico(){
    const {nombre} = this.medicoForm.value;

    if(this.medicoSeleccionado){
       const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
       }
       this.ms.actualizarMedico(data).subscribe(resp =>{
        Swal.fire("Actualizado",`Médico "${nombre}" actualizado correctamente`,"success");
       });
    }else{  
      this.ms.crearMedico(this.medicoForm.value).subscribe((resp:any) =>{ 
        Swal.fire("Creado",`Médico "${nombre}" creado correctamente`,"success");
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}}`);
       });
    }
  }

  cargarHospitales(){
    this.hs.cargarHospitales().subscribe( ({hospitales}) =>{ this.hospitales= hospitales;
    })

  }
}