import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ActuService {


    language: string;

    constructor(private http: HttpClient,private translate: TranslateService) {
        this.language = this.translate.currentLang;
        this.translate.onLangChange.subscribe((lang) => {
            this.language = this.translate.currentLang;
        });

    }

    getActu(): Observable<any> {
        if(this.language=='en'){
            this.language ='us'
        }
        return this.http.get(`https://covid-19-news.p.rapidapi.com/v1/covid?sort_by=relevancy&page_size=50&media=True&country=${this.language}&q=covid&`,{
            headers: {'x-rapidapi-host':'covid-19-news.p.rapidapi.com','x-rapidapi-key':'efb754d3b0msh13a99daa43c274dp198475jsn51ab24c8eff5'}
        });

    }




}
