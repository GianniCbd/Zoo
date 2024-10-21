import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { Habitat } from 'src/app/models/habitat';
import { User } from 'src/app/models/user';
import { AnimalService } from 'src/app/service/animal.service';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { HabitatService } from 'src/app/service/habitat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-habitat',
  templateUrl: './habitat.component.html',
  styleUrls: ['./habitat.component.scss'],
})
export class HabitatComponent implements OnInit {
  habitats: Habitat[] = [];

  newHabitat: any = {};

  editingHabitat: any = null;

  currentUser!: User;

  showAddModal: boolean = false;
  showEditModal: boolean = false;

  constructor(
    private habitatSrv: HabitatService,
    private AnimalSrv: AnimalService,
    private authorizationSRV: AuthorizationService,
    private userService: UserService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchHabitats();
  }

  openAddModal() {
    this.showAddModal = true;
  }
  openEditModal() {
    this.showEditModal = true;
  }
  closeAddModal() {
    this.showAddModal = false;
  }
  closeEditModal() {
    this.showEditModal = false;
  }

  getme() {
    this.authSrv.getMe().subscribe((it) => {
      this.currentUser = it;
    });
  }

  fetchHabitats() {
    this.habitatSrv.getHabitats().subscribe((data) => {
      this.habitats = data;
      console.log(data);
    });
  }

  addNewHabitat(): void {
    const habitatWithUser = {
      ...this.newHabitat,
      user: this.currentUser,
    };
    this.habitatSrv.saveHabitats(habitatWithUser).subscribe(
      (response: Habitat) => {
        console.log('Habitat created successfully', response);
        this.habitats.push(response);
        this.newHabitat = {};
        this.showAddModal = true;
      },
      (error) => {
        console.error('Error creating building', error);
      }
    );
  }

  toggleModalVisibility() {
    this.showAddModal = !this.showAddModal;
  }
  close() {
    this.showAddModal = false;
  }

  canShowButton(): boolean {
    const allowedRoles: string[] = ['ADMIN', 'MANAGER'];
    return this.authorizationSRV.isAuthorized(allowedRoles);
  }
}
