import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CarOwnersService} from "../../services/CarOwnersService";
import {Owner} from "../../models/interface";


@Component({
  selector: 'app-main-page',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit{
  owners: Owner[] = [];


  constructor(private serv: CarOwnersService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getOwners()
  }

  onDelete(id: string) {
      this.serv.deleteOwner(id).subscribe(result => {
        this.getOwners()
      })
  }

  getOwners() {
    this.serv.getOwners().subscribe(res => {
      this.owners = res
      this.cdRef.markForCheck()
    })
  }
}
