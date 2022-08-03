import { Hospital } from "./hospital.model";

interface _MedicoUser{  //(el "_" indica algo privado, en este caso la interfaz hospitalUser es algo privado y que solo se usará en este model)
    _id:string;
    nombre:string,
    img:string;
}

export class Medico{

    constructor(
        public nombre: string,
        public _id?:string,
        public img?: string,
        public usuario?: _MedicoUser,
        public hospital?:  Hospital
    ){
        
    }
}