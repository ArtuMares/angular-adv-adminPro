import { environment } from '../../environments/environment';

const base_url= environment.baseUrl;

export class Usuario{
    constructor(
    public nombre:string,
    public email:string,
    public password?:string,
    public img?:string,
    public google?:string,
    public role?:string,
    public uid?:string
    ){ }

    get imagenUrl(){
        if(this.google){
            return this.img;
        }
        if(this.img){
            return`${base_url}/upload/usuarios/${this.img}`;
        }
        return `${base_url}/upload/usuarios/no-img`;
    }

}