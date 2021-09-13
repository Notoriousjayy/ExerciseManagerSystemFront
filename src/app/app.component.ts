import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Exercise } from './exercise';
import { ExerciseService } from './exercise.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public exercises: Exercise[];
  public editExercise: Exercise;
  public deleteExercise: Exercise;
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private exerciseService: ExerciseService) {}


  ngOnInit(){
    this.getExercises();
  }

  public getExercises(): void {
    this.exerciseService.getExercises().subscribe(
      (response: Exercise[]) => {
        this.exercises = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddExercise(addForm:NgForm): void {
    document.getElementById('add-exercise-form').click();

    // Makes calls to Back-end so we need to subscribe()
    this.exerciseService.addExercise(addForm.value).subscribe(
      (response: Exercise) => {
        console.log(response);
        this.getExercises();

        // clears the form if successful
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

        // Clears the form if not sussessful
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(exercise: Exercise): void {
    this.exerciseService.updateExercise(exercise).subscribe(
      (response: Exercise) => {
        console.log(response);
        this.getExercises();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(exerciseId: number): void {
    this.exerciseService.deleteExercise(exerciseId).subscribe(
      (response: void) => {
        console.log(response);
        this.getExercises();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchExercises(key: string): void {
    console.log(key);
    const results: Exercise[] = [];
    for (const exercise of this.exercises){
      if (exercise.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || exercise.area.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || exercise.instructions.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(exercise);
      }
    }
    this.exercises = results;
    if (results.length === 0 || !key){
      this.getExercises();
    }
  }

  // Programmatically adds button to page
  public onOpenModal(exercise: Exercise, mode: string): void {

    // Gives access to div by id
    const container = document.getElementById('main-container');

    // Creates button
    const button = document.createElement('button');

    // Changes type of button from defaut "sumbit" to button
    button.type = 'button';

    // Hides the button
    button.style.display = 'none';


    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'add') {

      button.setAttribute('data-bs-target', '#addExerciseModal');

    }
    if (mode === 'edit') {
      this.editExercise = exercise;

      button.setAttribute('data-bs-target', '#updateExerciseModal');

    }
    if (mode === 'delete') {
      this.deleteExercise = exercise;

      button.setAttribute('data-bs-target', '#deleteExerciseModal');

    }

    //  Adds button to the container
    container.appendChild(button);
    button.click();
  }

}
