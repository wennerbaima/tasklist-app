import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaTarefaComponent } from './tarefa/consulta/consulta-tarefa.component';
import { CadastroTarefaComponent } from './tarefa/cadastro/cadastro-tarefa.component';

const routes: Routes = [
  { path: '', component: ConsultaTarefaComponent },
  { path: 'cadastro', component: CadastroTarefaComponent },
  { path: 'cadastro/:id', component: CadastroTarefaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
