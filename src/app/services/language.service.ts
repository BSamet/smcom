import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import languageJSONen from '../../assets/languages/en.json'
import languageJSONfr from '../../assets/languages/fr.json'
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  getTextFromKey(key:string):any {
    let dictString = "";
    if (this.storage.getLanguage() =="en") {
      // @ts-ignore
      dictString = languageJSONen[key as keyof any];
    }
    if (this.storage.getLanguage() =="fr") {
      // @ts-ignore
      dictString = languageJSONfr[key as keyof any];
    }
    return dictString;
  }

  constructor(private storage: TokenStorageService) { }
}
