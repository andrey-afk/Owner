import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Car, Owner} from "../models/interface";
import {HttpClient, HttpParams} from "@angular/common/http";

interface ICarOwnersService {
  getOwners(): Observable<Owner[]>;
  getOwnerById(id: string): Observable<Owner>;
  createOwner(owner: Owner): Observable<Owner>;
  editOwner(aOwner: Owner): Observable<Owner>;
  deleteOwner(aOwnerId: string): Observable<Owner[]>;
}
@Injectable( {
  providedIn: 'root'
})
export class CarOwnersService implements ICarOwnersService {

  private ownersUrl = 'api/owner';  // URL to web api

  constructor(private http: HttpClient) { }

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${this.ownersUrl}`)
  }
  getOwnerById(id: string): Observable<Owner> {
    return this.http.get<Owner>(`${this.ownersUrl}/${id}`)
  }
  editOwner(aOwner: Owner ): Observable<Owner> {
    return this.http.put<Owner>(`${this.ownersUrl}/${aOwner.id}`, aOwner)
  }
  deleteOwner(aOwnerId: string): Observable<Owner[]>{
    return this.http.delete<Owner[]>(`${this.ownersUrl}/${aOwnerId}`, {
      params: new HttpParams().set(`id`, aOwnerId)
    })
  }
  createOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(`${this.ownersUrl}`, owner)
  }



}

