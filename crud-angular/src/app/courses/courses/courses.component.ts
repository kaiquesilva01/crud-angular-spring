import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
    courses$: Observable<Course[]>;
    displayedColumns = ['name', 'category']

    //coursesService: CoursesService

    constructor(
      private coursesService: CoursesService,
      public dialog: MatDialog
    ) {
      //this.coursesService = new CoursesService();
      this.courses$ = this.coursesService.list()
        .pipe(
          catchError(error => {
            this.onError('Erro ao carregar cursos.')
            return of([])})
        )
    }

    onError(errorMsg: string) {
      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      });
    }
}
