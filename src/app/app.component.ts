import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {HttpClient} from '@angular/common/http';

interface ICard {
  id?: number;
  title: string;
}

interface IList {
  id?: number;
  title: string;
  board_cards: ICard[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'draganddrop';
  lists: IList[] = [];

  constructor(private http: HttpClient) {}

  loadDataFromServer(): void {
    this.http.get<IList[]>('http://127.0.0.1:8000/api/lists').subscribe((resp: IList[]) => {
      this.lists = resp;
    });
  }

  ngOnInit(): void {
    this.loadDataFromServer();
  }

  dropList(event: CdkDragDrop<IList[]>): void {
    console.log('dropList', event);
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

  dropCard(event: CdkDragDrop<ICard[]>): void {
    console.log('dropCard', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
