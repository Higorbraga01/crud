import { SetorService } from "./../../setor/setor.service";
import { Colaborador } from "./../colaborador.model";
import { ColaboradorService } from "./../colaborador.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Setor } from "../../setor/setor.model";
import { CustomErrorStateMatcher } from "src/app/validators/CustomErrorStateMatcher";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { DateValidator } from "src/app/validators/DateValidator";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-colaborador-update",
  templateUrl: "./colaborador-update.component.html",
  styleUrls: ["./colaborador-update.component.css"],
})
export class ColaboradorUpdateComponent implements OnInit {
  matcher = new CustomErrorStateMatcher();

  colaborador: Colaborador = {
    id: null,
    cpf: "",
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: null,
    setor: null,
  };

  formGroup: FormGroup;

  setores: Setor[];

  constructor(
    private router: Router,
    private colaboradorService: ColaboradorService,
    private setorService: SetorService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [""],
      setor: ["", [Validators.required]],
      nome: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      cpf: [
        "",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
        ],
      ],
      telefone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      dataNascimento: ["", [Validators.required, DateValidator.date]],
    });

    const id = this.route.snapshot.paramMap.get("id");
    this.colaboradorService.readById(id).subscribe((colaborador) => {
      this.colaborador = colaborador;
      this.setValues(this.colaborador);
    });
    this.setorService.read().subscribe((setores) => {
      this.setores = setores;
    });
  }

  update(): void {
    this.colaboradorService.update(this.formGroup.value).subscribe(() => {
      this.colaboradorService.showMessage("Dados atualizado com sucesso!");
      this.router.navigate(["/colaboradores"]);
    });
  }

  setValues(colaborador: Colaborador) {
    this.formGroup.setValue({
      id: colaborador.id,
      setor: colaborador.setor,
      nome: colaborador.nome,
      cpf: colaborador.cpf,
      telefone: colaborador.telefone,
      email: colaborador.email,
      dataNascimento: colaborador.dataNascimento,
    });
  }

  cancel(): void {
    this.router.navigate(["/colaboradores"]);
  }
}
