import { Injectable } from '@angular/core';
import Show from './models/show';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


// const artist : Artist[]=[];

// _id: number;
// artist: Artist;
// title: string;
// price: number;
// date: Date;
// location: string;
// time: string;
// description: string;
// eventType: string;
// aboutHost: string; 
// map: string;
// ticketQuantity: number;

// const shows: Show[] = [
//   {_id: 1, artist: new Artist(), title: 'The best show is town', price:60, date: new Date,location:'Tel-aviv',time: '21:00', description: 'intimate evenning in a unique spot in the city', eventType:'House Concert' , aboutHost:'Maor Peretz',  map: 'url map', ticketQuantity: 50},
//   {_id: 2, artist: new Artist() , title: 'Magical evening of acoustic sounds', price:60, date: new Date,location:'Tel-aviv',time: '21:00', description: 'intimate evenning in a unique spot in the city',  eventType:'House Concert' , aboutHost:'Avi Gueta',  map: 'url map', ticketQuantity: 50},
//   {_id: 3, artist: new Artist(), title: 'Piano show with Anat Melamed', price:60, date: new Date,location:'Tel-aviv', time: '21:00', description: 'intimate evenning in a unique spot in the city',  eventType:'House Concert' , aboutHost:'Meny Berger',  map: 'url map', ticketQuantity: 80},
//   {_id: 4, artist: new Artist(), title: 'The best show is town', price:60, date: new Date,location:'Tel-aviv', time: '21:00', description: 'intimate evenning in a unique spot in the city',  eventType:'House Concert' , aboutHost:'Maor Peretz',  map: 'url map', ticketQuantity: 50}
 



@Injectable()
export class ShowsService {

  constructor(private http: HttpClient) {
   }


  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>('/api/shows');
  }
  getShowById(id): Observable<Show[]> {
    return this.http.get<Show[]>('/api/show/'+id);
  }
}
