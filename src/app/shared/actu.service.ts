import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class ActuService {


    language: string;

    constructor(private http: HttpClient) {

    }

    getActu(): Observable<any> {

        return this.http.get(`https://covid-19-news.p.rapidapi.com/v1/covid?lang=fr&sort_by=date&media=true&country=fr&q=covid`,{
            headers: {'x-rapidapi-host':'covid-19-news.p.rapidapi.com','x-rapidapi-key':'efb754d3b0msh13a99daa43c274dp198475jsn51ab24c8eff5'}
        });

    }




}
