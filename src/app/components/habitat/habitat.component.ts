import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habitat } from 'src/app/models/habitat';
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
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  constructor(private habitatSrv: HabitatService) {}

  ngOnInit(): void {
    this.fetchHabitats();
  }

  fetchHabitats() {
    this.habitatSrv.getHabitats().subscribe((data) => {
      this.habitats = data;
      console.log(data);
    });
  }
}
