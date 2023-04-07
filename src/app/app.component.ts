import { Component, HostListener } from '@angular/core';
import { RickandmortyserviceService } from './services/rickandmortyservice.service';
import { Character  } from './interface/character.interface';
import { Episode } from './interface/episode.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rick-and-morthy';

  nameSearch = '';
  allCharacters : Character[]=[];
  allEpisode : Episode []=[];
  total:number | undefined;
  constructor(public serviceRYM : RickandmortyserviceService){
  }

  ngOnInit(): void {
    this.total= this.serviceRYM.total;
    this.allCharacters=this.serviceRYM.allCharacters;
    this.allEpisode=this.serviceRYM.allEpisode;
  }

  buscarProducto (termino : string){
    this.serviceRYM.busquedaPorNombre(termino).then(resp=>{
      console.log(resp);
    },error=>{
      console.log(error);
    });
  }


  mas(event : Event){
    const ele =event.target as HTMLElement;
    console.log(this.nameSearch);
    if((ele.scrollHeight-Math.round(ele.scrollTop) === ele.clientHeight)){
      this.serviceRYM.moreCharacters(this.nameSearch);
    }
    
  }  
}
