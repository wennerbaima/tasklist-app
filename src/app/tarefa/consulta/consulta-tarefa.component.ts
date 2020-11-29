import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../tarefa';
import { DialogService } from 'primeng/dynamicdialog/';
import toastr from 'toastr';
import { CadastroTarefaComponent } from '../cadastro/cadastro-tarefa.component';

@Component({
    selector: 'app-consulta-tarefa',
    templateUrl: './consulta-tarefa.component.html',
    styleUrls:["./consulta-tarefa.component.css"],
    providers: [DialogService]
  })
  export class ConsultaTarefaComponent implements OnInit {
 
    public tarefas: Tarefa[] = new Array();
    public title: string;
 
    constructor(private tarefaService: TarefaService,
                private dialogService: DialogService,
                private router: Router){}
 
    /**INICIALIZA O COMPONENTE */
    ngOnInit() {

      this.title = "TAREFAS CADASTRADAS";

      this.listar();
    }

    /**CHAMA O SERVIÇO PARA RETORNAR TODAS AS TAREFAS CADASTRADAS */
    listar() {

      this.tarefaService.findAll().subscribe(
        (result) => this.tarefas = result),
        (error) => toastr.error("Ocorreu um erro durante a listagem!")
    }

    /**CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
    excluir(id: number, index: number):void {

      if(confirm("Deseja realmente excluir esse registro?")){
        this.tarefaService.delete(id).subscribe(
          (result) => {
            this.tarefas.splice(index, 1);
            toastr.success("Solicitação efetuada com sucesso!");
          },
          (error) => toastr.error("Ocorreu um erro durante a exclusão!")
        )
      }
    }

    /**CARREGA O COMPONENTE PARA CADASTRO/ALTERAÇÃO */
    dialogCadastroTarefa(id?) {

      let ref = this.dialogService.open(CadastroTarefaComponent, {
        
        data: {
          id: id
        }
      });
  
      ref.onClose.subscribe((reload) => {
  
        if (reload) {
          this.listar();
          toastr.success("Solicitação efetuada com sucesso!");
        }
      });
    }
  }