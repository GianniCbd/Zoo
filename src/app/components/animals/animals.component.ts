import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { Animal } from 'src/app/models/animal';
import { Habitat } from 'src/app/models/habitat';
import { Like } from 'src/app/models/like';
import { User } from 'src/app/models/user';
import { AnimalService } from 'src/app/service/animal.service';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { HabitatService } from 'src/app/service/habitat.service';
import { LikeService } from 'src/app/service/like.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
})
export class AnimalsComponent implements OnInit {
  animal: Animal[] = [];
  habitats: any[] = [];

  newAnimal: any = {};
  userId!: string;
  editingAnimal: any = null;
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  currentUser!: User;

  constructor(
    private animalSrv: AnimalService,
    private userService: UserService,
    private authorizationSRV: AuthorizationService,
    private habitatSrv: HabitatService,
    private authSrv: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAnimals();
    this.fetchHabitats();
  }

  viewAnimalDetails(animal: number) {
    this.router.navigate(['/animal', animal]);
  }

  getme() {
    this.authSrv.getMe().subscribe((it) => {
      this.currentUser = it;
    });
  }

  canShowButton(): boolean {
    const allowedRoles: string[] = ['ADMIN', 'MANAGER'];
    return this.authorizationSRV.isAuthorized(allowedRoles);
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

  fetchHabitats() {
    this.habitatSrv.getHabitats().subscribe(
      (data) => {
        this.habitats = data;
        console.log(data);
      },
      (error) => {
        console.error('Error retrieving habitats', error);
      }
    );
  }

  fetchAnimals() {
    this.animalSrv.getAnimals().subscribe(
      (data) => {
        this.animal = data.sort((a, b) =>
          a.habitat.name > b.habitat.name
            ? 1
            : b.habitat.name > a.habitat.name
            ? -1
            : 0
        );
        console.log(data);
      },
      (error) => {
        console.error('Error retrieving animals', error);
      }
    );
  }

  addNewAnimal() {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        const userId = user.id;
        this.animalSrv.newAnimal(this.newAnimal, userId).subscribe(
          (createdAnimal) => {
            this.newAnimal = {};
            this.animal.push(createdAnimal);
            this.showAddModal = true;
          },
          (error) => {
            console.error('Error creating animal:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting current user:', error);
      }
    );
  }
  toggleModalVisibility() {
    this.showAddModal = !this.showAddModal;
  }
  close() {
    this.showAddModal = false;
  }

  editAnimal(animal: any) {
    const selectedAnimalId = animal.id;
    this.editingAnimal = {
      ...animal,
      id: selectedAnimalId,
    };
    this.showEditModal = true;
  }

  saveEditedAnimal() {
    this.animalSrv
      .updateAnimal(this.editingAnimal.id, this.editingAnimal)

      .subscribe(
        (updatedAnimal) => {
          this.cancelEdit();
          this.fetchAnimals();
        },
        (error) => {
          console.error(
            "Errore durante l'aggiornamento della prenotazione:",
            error
          );
        }
      );
  }

  cancelEdit() {
    this.editingAnimal = null;
    this.showEditModal = false;
  }

  deleteAnimal(animalToDelete: Animal) {
    if (animalToDelete && animalToDelete.id) {
      const selectedAnimalId = animalToDelete.id;
      this.animalSrv.deleteAnimal(selectedAnimalId).subscribe(() => {
        const index = this.animal.findIndex(
          (b: Animal) => b.id === selectedAnimalId
        );
        if (index !== -1) {
          this.animal.splice(index, 1);
        }
      });
    } else {
      console.error(
        "Errore: l'oggetto animalToDelete o la sua proprietà 'id' sono undefined."
      );
    }
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];

    if (file && this.editingAnimal) {
      console.log('passato');
      this.animalSrv.uploadAvatar(this.editingAnimal.id, file).subscribe(
        (imageUrl: string) => {
          this.editingAnimal.image = imageUrl;
          console.log(imageUrl);
        },
        (error: any) => {
          console.error("Errore durante l'upload dell'avatar:", error);
        }
      );
    }
  }
}
