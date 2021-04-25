import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Owner} from "../models/interface";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
   let owner: Owner[] = [{
     aLastName: 'Степанович', id: '1', aMiddleName: 'Степан', aFirstName: 'Степанов', aCars: [{
       aCarYear: 1992, aCarNumber: 'AX2222AX', aCarModel: 'E-34', aCarBrand: 'BMW'}]
   }, {
     aLastName: 'Андреевич', id: '2', aMiddleName: 'Андрей', aFirstName: 'Андреев', aCars: [{
       aCarYear: 1994, aCarNumber: 'AX1331AE', aCarModel: '11', aCarBrand: 'Lada' }]
   },
     {
       aLastName: 'Григорьевич', id: '3', aMiddleName: 'Григор', aFirstName: 'Григоров', aCars: [{
         aCarYear: 1994, aCarNumber: 'AX1431AE', aCarModel: '1', aCarBrand: 'Lada' }]
   }]
    return {owner}
  }
}
