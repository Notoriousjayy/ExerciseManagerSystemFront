import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Exercise } from './exercise';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getExercises(): Observable<Exercise[]>{
    return this.http.get<Exercise[]>(`${this.apiServerUrl}/AllExercises`);
  }

  public addExercise(exercise: Exercise): Observable<Exercise>{
    return this.http.post<Exercise>(`${this.apiServerUrl}/addExercise`, exercise);
  }

  public updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiServerUrl}/updateExercise`, exercise);
  }

  public deleteExercise(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/deleteExercise/${id}`);
  }

}
