import { Injectable }                       from '@angular/core';
import { HttpClient }                       from '@angular/common/http';
import { Character, allCharacterInterface } from '../interface/character.interface';
import { Episode }                          from '../interface/episode.interface';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyserviceService {

  allCharacters   : Character [] = [];
  searchCharacters: Character [] = [];
  allEpisode      : Episode   [] = [];
  total           : number | undefined;
  pages           : number | undefined;
  contPages       : number = 2;
  cargando                 = false;

  constructor(private http: HttpClient) {
    this.getAllCharacter().then();
    this.episodes();
  }

  private getAllCharacter() {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<allCharacterInterface>('https://rickandmortyapi.com/api/character').subscribe((resp: allCharacterInterface) => {
        this.allCharacters = resp.results;
        this.total = resp.info.count;
        this.pages = resp.info.pages;
        resolve(true)
      },error=>{
       reject(true);
      });
     })
  }

  private  getByName(termino: string) {
     return new Promise<boolean> ((resolve, reject) => {
       this.http.get<allCharacterInterface>(`https://rickandmortyapi.com/api/character/?name=${termino}`).subscribe((resp: allCharacterInterface) => {
         this.allCharacters = resp.results;
         this.total = resp.info.count;
         this.pages = resp.info.pages;
         resolve(true)
       },error=>{
        this.total = 0;
        reject(false);
       });
      })
  }

  busquedaPorNombre (termino: string){
    this.contPages=2;
    if(termino!=''){
      return this.getByName(termino);
    }else{
      return this.getAllCharacter();
    }
  }

  moreCharacters (termino : string) {
    if(this.contPages<=this.pages && this.pages>=2){
      return this.getNextPageCharacter(termino);
    }
    this.cargando=false;
      return new Promise<boolean>((resolve, rejects) => {
        resolve(false);
        rejects(false);
      }).then();
    
    
  }

  private getNextPageCharacter(termino : string) : Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<allCharacterInterface>(`https://rickandmortyapi.com/api/character/?page=${this.contPages}&name=${termino}`).subscribe((resp:allCharacterInterface)=>{
        this.allCharacters.push(...resp.results);
        this.contPages++;
        this.cargando=false;
        resolve(true);
      },error=>{
        reject(false);
      })
    })
  }

  private getEpisode() {
    return new Promise<void>((resolve, rejects) => {
      this.http.get<Episode[]>('https://rickandmortyapi.com/api/episode').subscribe((resp: Episode[]) => {
        this.allEpisode = resp;
      });
      resolve();
    })
  }

  episodes() {
    if (this.allEpisode.length < 1) {
      this.getEpisode().then((resp) => {
      });
    }
  }
}
