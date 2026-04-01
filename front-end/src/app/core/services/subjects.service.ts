import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = API_URL;

  getSubjects(userId: string) {
    return this.http.get(`${this.apiUrl.baseUrl}/subjects?user_id=${userId}`);
  }

  createSubject(name: string, image: string, userId: string) {
    console.log('data from service', name, image, userId);
    return this.http.post(`${this.apiUrl.baseUrl}/subjects`, { name, image, user_id: userId });
  }

  deleteSubject(subjectId: string, userId: string) {
    return this.http.delete(`${this.apiUrl.baseUrl}/subjects/${subjectId}?user_id=${userId}`);
  }

  updateSubject(subject: any, userId: string) {
    return this.http.put(`${this.apiUrl.baseUrl}/subjects/${subject.id}`, { ...subject, user_id: userId });
  }

  addVideo(subjectId: number, title: string, url: string, userId: string) {
    return this.http.post(`${this.apiUrl.baseUrl}/videos`, { title, url, subject_id: subjectId, user_id: userId });
  }

  getVideosByUserId(userId: string, subjectId: string) {
    return this.http.get(`${this.apiUrl.baseUrl}/videos/user/${userId}/subject/${subjectId}`);
  }

  getVideosBySubject(subjectId: string) {
    return this.http.get(`${this.apiUrl.baseUrl}/videos/subject/${subjectId}`);
  }

  deleteVideo(videoId: number) {
    return this.http.delete(`${this.apiUrl.baseUrl}/videos/${videoId}`);
  }
}
