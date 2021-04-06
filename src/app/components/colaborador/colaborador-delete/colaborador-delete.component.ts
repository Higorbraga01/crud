import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Colaborador } from '../colaborador.model';
import { ColaboradorService } from '../colaborador.service';

@Component({
  selector: 'app-colaborador-delete',
  templateUrl: './colaborador-delete.component.html',
  styleUrls: ['./colaborador-delete.component.css']
})
export class ColaboradorDeleteComponent implements OnInit {

  colaborador: Colaborador = {
    cpf: "",
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: null,
    setor: null
  }

  constructor(
    private router: Router, 
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.colaboradorService.readById(id).subscribe(colaborador =>{
      this.colaborador = colaborador
    });
  }

  delete(): void {
    this.colaboradorService.delete(this.colaborador.id).subscribe(() => {
      this.colaboradorService.showMessage("Colaborador excluir com sucesso!");
      this.router.navigate(["/colaboradores"]);
    })
  }
  
  cancel(): void {
    this.router.navigate(["/colaboradores"]);
  }

}
