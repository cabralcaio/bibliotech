import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';
import { emprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-new-emprestimo',
  templateUrl: './new-emprestimo.component.html',
  styleUrls: ['./new-emprestimo.component.css']
})
export class NewemprestimoComponent implements OnInit {

  public dataSource: Livro[] = [] // tentativa de comunicação


  public formemprestimo: FormGroup;

  public isLoadUpload: boolean = false;
  private fotoUrl: string = "";


  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private emprestimoService: emprestimoService,
    private router: Router,
    private uploadService: UploadService,
    private livroService: LivroService,
  ) {
    this.formemprestimo = fb.group({
      leitor: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      status: ["", [Validators.required]],
      livro: ["",[Validators.required]]
    });
  }

  selected = 'option0';
  selected2 = "option0"
  ngOnInit(): void {
      // const emprestimo: emprestimo = ();
      // this.emprestimoService.createemprestimo(emprestimo).subscribe(response => {
      //   this.notification.showMessage("Cadastrado com sucesso.")
      //   })
      this.initializeLivro()
  }

  private initializeLivro(): void {
    this.livroService.findAll().subscribe(livros => {
      this.dataSource = livros;
      console.log(this.dataSource)
    });
  }

  public createemprestimo(): void {
    if(true) { //this.formemprestimo.valid
      const emprestimo: Emprestimo = this.formemprestimo.value;
      let today = new Date(Date.now())
      emprestimo.dataEmprestimo = today
      console.log(emprestimo.livro.fotoUrl)
      emprestimo.fotoUrl = emprestimo.livro.fotoUrl
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


  // recebeLivro(dataSource: { titulo: string}) {
  //   this.dataSource.push({
  //     titulo: this.novoLivro.titulo
  //   })
  // }

}
