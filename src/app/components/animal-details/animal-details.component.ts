import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { Habitat } from 'src/app/models/habitat';
import { AnimalService } from 'src/app/service/animal.service';
import { HabitatService } from 'src/app/service/habitat.service';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
})
export class AnimalDetailsComponent implements OnInit {
  animal: Animal | undefined;
  activeTab: string = 'generalInfo';
  tabs = [
    { key: 'generalInfo', label: 'Informazioni generali' },
    { key: 'diet', label: 'Dieta' },
    { key: 'distribution', label: 'Distribuzione' },
    { key: 'reproduction', label: 'Riproduzione' },
  ];

  constructor(
    private route: ActivatedRoute,
    private animalSrv: AnimalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const animalId = params['id'];
      this.fetchAnimal(animalId);
    });
  }

  fetchAnimal(animalId: number) {
    this.animalSrv.findById(animalId).subscribe(
      (data) => {
        this.animal = data;
      },
      (error) => {
        console.error('Error retrieving animal', error);
      }
    );
  }

  changeTab(tabName: string) {
    this.activeTab = tabName;
  }
}
