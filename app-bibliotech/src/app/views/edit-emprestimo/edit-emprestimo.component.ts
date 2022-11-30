import { UploadService } from '../../services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { emprestimoService } from '../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-emprestimo',
  templateUrl: './edit-emprestimo.component.html',
  styleUrls: ['./edit-emprestimo.component.css']
})
export class EditemprestimoComponent implements OnInit {

  public emprestimo: Emprestimo = {
    leitor: "",
    email: "",
    telefone:"",
    status: "",
    titulolivro: "",
    livro: {
      titulo: "",
      autor: "",
      isbn: "",
      categoria: "",
    }
  };

  public isLoadUpload: boolean = false;

  constructor(
    private notification: NotificationService,
    private EmprestimoService: emprestimoService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.initilizeFields();
  }

  selected = "option0"
  selected2 = "option0"
  private initilizeFields(): void {
    const id = this.route.snapshot.params["id"];
    this.EmprestimoService.findById(id).subscribe(emprestimo => {
      this.emprestimo = emprestimo;
    });
  }

  public updateemprestimo(form: NgForm): void {
    if(form.valid) {
      console.log("chegou no update")
      this.EmprestimoService.updateemprestimo(this.emprestimo).subscribe(response => {
        this.notification.showMessage("Atualizado com sucesso.");
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
        this.emprestimo.fotoUrl = fotoUrl;
      })
    });
  }
}
