import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl

@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipe implements PipeTransform {

  transform(img:string, tipo: "usuarios"| "medicos"| "hospitales"): string {

    if(!img){
      return `${base_url}/upload/${tipo}/no-img`;

  }else if ((img.includes('https'))){
      return img;
  }
  else{
      return `${base_url}/upload/${tipo}/${img}`;
  }
  }

}
