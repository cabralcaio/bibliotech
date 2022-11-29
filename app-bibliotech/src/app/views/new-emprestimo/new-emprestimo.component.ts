import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';
import { emprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Livro } from 'src/app/models/livro';

@Component({
  selector: 'app-new-emprestimo',
  templateUrl: './new-emprestimo.component.html',
  styleUrls: ['./new-emprestimo.component.css']
})
export class NewemprestimoComponent implements OnInit {
  @Output() emissorEvento = new EventEmitter<any>();
  // public emprestimo: Emprestimo
  public novoLivro: Livro = { //tentativa de comunicação
    titulo: "",
    autor: "",
    isbn: "",
    categoria: ""};

  public dataSource: Livro[] = [] // tentativa de comunicação


  public formemprestimo: FormGroup;

  public isLoadUpload: boolean = false;
  private fotoUrl: string = "";


  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private emprestimoService: emprestimoService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.formemprestimo = fb.group({
      leitor: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      status: ["", [Validators.required]],
      livro: [""]
    });
  }

  selected = 'option0';
  selected2 = "option0"
  ngOnInit(): void {
      // const emprestimo: emprestimo = ();
      // this.emprestimoService.createemprestimo(emprestimo).subscribe(response => {
      //   this.notification.showMessage("Cadastrado com sucesso.")
      //   })
  }

  public createemprestimo(): void {
    if(true) { //this.formemprestimo.valid
      console.log("entrou")
      const emprestimo: Emprestimo = this.formemprestimo.value; 
      let today = new Date(Date.now())
      emprestimo.dataEmprestimo = today
      this.emprestimoService.createemprestimo(emprestimo).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
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

  criarLivro() { //tentativa de comunicação
    this.emissorEvento.emit({
      novoLivro: this.novoLivro
    })
  }

  // recebeLivro(dataSource: { titulo: string}) {
  //   this.dataSource.push({
  //     titulo: this.novoLivro.titulo
  //   })
  // }

}
