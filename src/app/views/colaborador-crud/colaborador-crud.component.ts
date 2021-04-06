import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-colaborador-crud',
  templateUrl: './colaborador-crud.component.html',
  styleUrls: ['./colaborador-crud.component.css']
})
export class ColaboradorCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Colaboradores',
      icon: 'emoji_people',
      routerUrl: '/colaboradores'
    }
   }

  ngOnInit(): void {
  }

  navigateToColaboradorCreate(): void {
    this.router.navigate(['/colaboradores/create'])
  }

}
