import { ColaboradorService } from './../colaborador.service';
import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../colaborador.model';

@Component({
  selector: 'app-colaborador-read',
  templateUrl: './colaborador-read.component.html',
  styleUrls: ['./colaborador-read.component.css']
})
export class ColaboradorReadComponent implements OnInit {

  colaboradores: Colaborador[];
  displayedColumns = ['id', 'nome', 'cpf', 'setor', 'telefone', 'email', 'dataNascimento', 'idade', 'action'];

  constructor(private colaboradorService: ColaboradorService) { }

  ngOnInit(): void {
    this.colaboradorService.read().subscribe(colaboradores => {
      this.colaboradores = colaboradores
    });
  }

}
