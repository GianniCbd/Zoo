import { Component, OnInit } from '@angular/core';
import { Zoo } from 'src/app/models/zoo';
import { ZooService } from 'src/app/service/zoo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  zoos: Zoo[] = [];

  constructor(private zooService: ZooService) {}

  ngOnInit(): void {
    this.zooService.getAllZoos().subscribe((data: Zoo[]) => {
      this.zoos = data;
    });
  }
}
