import { environment } from '../../environments/environment';

const base_url= environment.baseUrl;

export class Usuario{
    constructor(
    public nombre:string,
    public email:string,
    public password?:string,
    public img?:string,
    public google?:string,
    public role?:"USER_ROLE" | "ADMIN_ROLE",
    public uid?:string
    ){ }

    get imagenUrl(){

        if(!this.img){
            return `${base_url}/upload/usuarios/no-img`;

        }else if ((this.img.includes('https'))){
            return this.img;
        }
        else{
            return `${base_url}/upload/usuarios/${this.img}`;
        }
    }

}