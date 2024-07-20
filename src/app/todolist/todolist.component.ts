import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: any[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todoService.getTasks().subscribe(tasks => {
      this.taskArray = tasks;
    });
  }

  onSubmit(taskForm: any): void {
    this.todoService.addTask({ taskName: taskForm.value.task, isCompleted: false }).subscribe(task => {
      this.taskArray.push(task);
      taskForm.reset();
    });
  }

  onDelete(index: number): void {
    const task = this.taskArray[index];
    this.todoService.deleteTask(task.id).subscribe(() => {
      this.taskArray.splice(index, 1);
    });
  }

  onEdit(index: number): void {
    this.taskArray[index].isEditable = true;
  }

  onSave(index: number, taskName: string): void {
    const task = this.taskArray[index];
    task.taskName = taskName;
    this.todoService.updateTask(task.id, task).subscribe(() => {
      task.isEditable = false;
    });
  }

  onCheck(index: number): void {
    const task = this.taskArray[index];
    task.isCompleted = !task.isCompleted;
    this.todoService.updateTask(task.id, task).subscribe();
  }
}