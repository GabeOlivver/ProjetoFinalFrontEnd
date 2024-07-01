import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from './contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url = "http://localhost:3000/contatos";


  constructor(private http: HttpClient) { }

  getContatos(): Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url);
  }

  save(contato: Contato): Observable<Contato>{
    return this.http.post<Contato>(this.url, contato);
  }

  delete(contato:Contato): Observable<void>{
    return this.http.delete<void>(`${this.url}/${contato.id}`);
  }

  update(contato: Contato): Observable<Contato>{
    return this.http.put<Contato>(`${this.url}/${contato.id}`, contato);
  }
}
