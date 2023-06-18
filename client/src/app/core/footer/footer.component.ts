import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  email = '';
  subscribed = false;
  baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  subscribeToNewsletter() {
    const payload = { email: this.email };

    this.http.post(this.baseUrl + 'Email', payload).subscribe(
      response => {
        console.log(response);
        this.subscribed = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  onClick()
  {
    window.scrollTo(0, 0);
  }
}
