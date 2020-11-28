import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TarefaService } from '../tarefa.service';
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
    public titulo: string;
 
    constructor(private tarefaService: TarefaService,
                private dialogService: DialogService,
                private router: Router){}
 
    ngOnInit() {

      /*TÍTULO DA TELA*/
      this.titulo = "TAREFAS CADASTRADAS";

      this.listar();
    }
 
    listar() {

      /*CHAMA O SERVIÇO QUE RETORNA TODAS AS TAREFAS CADASTRADAS */
      this.tarefaService.findAll().subscribe(
        (result) => this.tarefas = result),
        (error) => toastr.error("Ocorreu um erro durante a listagem!")
    }

    /*editar(id: number):void{
      this.router.navigate(['/cadastro', id]);
    }*/

    excluir(id: number, index: number):void {

      if(confirm("Deseja realmente excluir esse registro?")){
 
        /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
        this.tarefaService.delete(id).subscribe(
          (result) => {
            this.tarefas.splice(index, 1);
            toastr.success("Tarefa excluída com sucesso!");
          },
          (error) => toastr.error("Ocorreu um erro durante a exclusão!")
        )
      }
    }

    dialogCadastroTarefa(id?) {

      let ref = this.dialogService.open(CadastroTarefaComponent, {
        
        data: {
          id: id
        }
      });
  
      ref.onClose.subscribe((reload) => {
  
        if (reload)
          location.reload();
      });
    }
  }