import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaTarefaComponent } from './tarefa/consulta/consulta-tarefa.component';
import { TarefaService } from './tarefa/tarefa.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ConfigService } from './services/config.service';
import { CadastroTarefaComponent } from './tarefa/cadastro/cadastro-tarefa.component';
import { MenuTarefaComponent } from './tarefa/menu/menu-tarefa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaTarefaComponent,
    CadastroTarefaComponent,
    MenuTarefaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [ConfigService, TarefaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
