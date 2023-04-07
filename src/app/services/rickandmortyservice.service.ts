import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character, allCharacterInterface } from '../interface/character.interface';
import { Episode } from '../interface/episode.interface';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyserviceService {

  allCharacters: Character[] = [];
  searchCharacters: Character[] = [];
  total: number | undefined;
  pages : number | undefined;
  allEpisode: Episode[] = [];
  flat = false;
  cont : number =2;
  constructor(private http: HttpClient) {
    this.getAllCharacter();
    this.episodes();
  }

  private getAllCharacter() {
    return new Promise<void>((resolve, reject) => {
      this.http.get<allCharacterInterface>('https://rickandmortyapi.com/api/character').subscribe((resp: allCharacterInterface) => {
        this.allCharacters = resp.results;
        this.total = resp.info.count;
        this.pages = resp.info.pages;
      });
      resolve();
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

  private  getByName(termino: string) {
     return new Promise<boolean> ((resolve, reject) => {
       this.http.get<allCharacterInterface>(`https://rickandmortyapi.com/api/character/?name=${termino}`).subscribe((resp: allCharacterInterface) => {
         this.allCharacters = resp.results;
         this.total = resp.info.count;
         this.pages = resp.info.pages;
         resolve(true)
       },error=>{
        reject(false);
       });
      })
  }

  busquedaPorNombre (termino: string){
    if(termino!=''){
      this.cont=2;
      return this.getByName(termino);
    }else{
      this.cont=2;
      this.getAllCharacter().then();
    }
  }

  episodes() {
    if (this.allEpisode.length < 1) {
      this.getEpisode().then((resp) => {
      });
    }
  }

  moreCharacters(termino : string){
    if(this.cont<=this.pages && this.pages>=2){
      this.getNextPageCharacter(termino).then();
    }
  }

  private getNextPageCharacter(termino : string){
    return new Promise<void>((resolve, reject) => {
      this.http.get<allCharacterInterface>(`https://rickandmortyapi.com/api/character/?page=${this.cont}&name=${termino}`).subscribe((resp:allCharacterInterface)=>{
        this.allCharacters.push(...resp.results);
        this.cont++;
      });
      resolve();
    })
  }
}
