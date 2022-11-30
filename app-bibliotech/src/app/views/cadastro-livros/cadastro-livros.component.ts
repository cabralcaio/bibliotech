import { DetailsComponent } from './../../components/details/details.component';
import { NotificationService } from './../../services/notification.service';
import { LivroService } from './../../services/livro.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Livro } from 'src/app/models/livro';

import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-livros',
  templateUrl: './cadastro-livros.component.html',
  styleUrls: ['./cadastro-livros.component.css']
})
export class CadastroLivrosComponent implements OnInit {

  public formlivro: FormGroup;

  public isLoadUpload: boolean = false;
  private fotoUrl: string = "";

  displayedColumns = ["titulo","autor","isbn","categoria","excluir"];
  dataSource: Livro[] = [];

  constructor(
    private notification: NotificationService,
    private dialog: MatDialog,
    fb: FormBuilder,
    private livroService: LivroService,
    private router: Router,
    private uploadService: UploadService
  ) { 
    this.formlivro = fb.group({
      titulo: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      isbn: ["", [Validators.required]],
      capa: ["",[Validators.required]]
    });
  }

  selected = 'option0';
  selected2 = "option0"
  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.livroService.findAll().subscribe(livros => {
      this.dataSource = livros;
    });
  }

  public deletelivro(id: string): void {
    this.livroService.deletelivro(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }

  public openDetails(livro: Livro): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: livro
    });
  }

  public createlivro(): void {
    if(true) { //this.formlivro.valid
      console.log("entrou")
      console.log()
      const livro: Livro = this.formlivro.value; 
      livro.fotoUrl = this.fotoUrl
      console.log(livro.fotoUrl)
      this.livroService.createlivro(livro).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
        window.location.reload();
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    console.log("chegou no uploadTS")
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.uploadService.uploadFoto(file).subscribe(uploadResult  => {
      this.isLoadUpload = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
        this.fotoUrl = fotoUrl;
      })
    });
  }
}
