import { Component }                  from '@angular/core';
import { RickandmortyserviceService } from './services/rickandmortyservice.service';
import { Character  }                 from './interface/character.interface';
import { Episode }                    from './interface/episode.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  nameSearch    = '';
  notfound      = true;
  allCharacters : Character []=[];
  allEpisode    : Episode   []=[];
  total         : number | undefined;

  constructor(public serviceRYM : RickandmortyserviceService){
  }

  ngOnInit(): void {
    this.total        = this.serviceRYM.total;
    this.allCharacters=this.serviceRYM.allCharacters;
    this.allEpisode   =this.serviceRYM.allEpisode;
  }

  buscarProducto (termino : string){
    this.serviceRYM.cargando=false;
    this.serviceRYM.busquedaPorNombre(termino).then(resp=>{
      this.notfound=resp;
    },error=>{
      this.notfound=error;
    });
  }

  mas(event : Event){
    const ele =event.target as HTMLElement;
    if((ele.scrollHeight-Math.round(ele.scrollTop) === ele.clientHeight)){
      this.serviceRYM.cargando=true;
      if(this.notfound){
        this.serviceRYM.moreCharacters(this.nameSearch).then();
      }
    }
  }  
}
