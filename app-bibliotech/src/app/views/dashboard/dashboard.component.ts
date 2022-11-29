import { DetailsComponent } from './../../components/details/details.component';
import { NotificationService } from './../../services/notification.service';
import { emprestimoService } from './../../services/emprestimo.service';
import { Emprestimo } from '../../models/emprestimo';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['leitor', 'livro', 'data', 'status', 'excluir', 'editar', 'detalhes','foto'];
  dataSource: Emprestimo[] = [];

  constructor(
    private EmprestimoService: emprestimoService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.EmprestimoService.findAll().subscribe(emprestimos => {
      this.dataSource = emprestimos;
    });
  }

  public deleteemprestimo(id: string): void {
    this.EmprestimoService.deleteemprestimo(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
      this.initializeTable();
    });
  }

  public openDetails(emprestimo: Emprestimo): void {
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: emprestimo
    });
  }
}
