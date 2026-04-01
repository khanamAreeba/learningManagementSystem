import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SubjectsService } from '../../core/services/subjects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private readonly subjects: SubjectsService = inject(SubjectsService);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);
  private readonly router: Router = inject(Router);

  public subjectsData: any[] = [];
  public selectedSubject: any = null;
  public showAddCard: boolean = false;
  public showVideoCard: boolean = false;
  public subjectForm!: FormGroup;
  public videoForm!: FormGroup;
  public editingSubject: any = null;
  public showEditCard: boolean = false;
  public userId: string | null = null;
  public showDeleteCard: boolean = false;
  public deletingSubjectId: string | null = null;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.userId = localStorage.getItem('userId');
    }

    this.subjectForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      image: new FormControl('', [Validators.required]),
    });

    this.videoForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      url: new FormControl('', [Validators.required]),
    });

    this.loadSubjects();
  }

  public loadSubjects() {
    if (!this.userId) return;
    this.subjects.getSubjects(this.userId).subscribe({
      next: (response: any) => {
        this.subjectsData = response;
      },
      error: (error) => {
        console.error('Error loading subjects:', error);
      }
    });
  }

  public openCloseAddCard() {
    this.showAddCard = !this.showAddCard;
  }

  public openCloseAddCardforVideos() {
    this.showVideoCard = !this.showVideoCard;
  }

  public addSubject() {
    if (this.subjectForm.invalid || !this.userId) {
      this.subjectForm.markAllAsTouched();
      return;
    }

    const { name, image } = this.subjectForm.value;

    this.subjects.createSubject(name, image, this.userId).subscribe({
      next: () => {
        this.subjectForm.reset();
        this.loadSubjects();
        this.openCloseAddCard();
      },
      error: (error) => {
        console.error('Create subject error:', error);
      }
    });
  }

  public deleteSubject() {
    if (!this.deletingSubjectId || !this.userId) return;

    this.subjects.deleteSubject(this.deletingSubjectId, this.userId).subscribe({
      next: () => {
        this.loadSubjects();
        this.openCloseDeleteCard(); // close modal
      },
      error: (error) => {
        console.error('Delete subject error:', error);
      }
    });
  }

  public openCloseDeleteCard(subjectId?: string) {
    this.showDeleteCard = !this.showDeleteCard;

    if (subjectId) {
      this.deletingSubjectId = subjectId;
    } else {
      this.deletingSubjectId = null;
    }
  }

  public updateSubject() {
    if (!this.userId || !this.editingSubject) return;

    const updatedData = {
      ...this.editingSubject,
      ...this.subjectForm.value
    };

    this.subjects.updateSubject(updatedData, this.userId).subscribe({
      next: () => {
        this.loadSubjects();
        this.openCloseEditCard();
      },
      error: (err) => console.error(err),
    });
  }

  public openCloseEditCard(subject?: any) {
    this.showEditCard = !this.showEditCard;

    if (subject) {
      this.editingSubject = subject;

      // populate form when opening
      this.subjectForm.patchValue({
        name: subject.name,
        image: subject.image
      });
    } else {
      this.editingSubject = null;
    }
  }

  public loadVideos() {
    if (!this.selectedSubject) return;
    this.subjects.getVideosBySubject(this.selectedSubject.id).subscribe({
      next: (response: any) => {
        this.selectedSubject.videos = response;
      },
      error: (error) => {
        console.error('Load videos error', error);
      }
    });
  }

  public addVideo() {
    if (this.videoForm.invalid || !this.selectedSubject || !this.userId) {
      this.videoForm.markAllAsTouched();
      return;
    }

    const { title, url } = this.videoForm.value;

    this.subjects.addVideo(this.selectedSubject.id, title, url, this.userId).subscribe({
      next: () => {
        this.videoForm.reset();
        this.loadVideos();
        this.openCloseAddCardforVideos();
      },
      error: (error) => {
        console.error('Add video error:', error);
      }
    });
  }

  public deleteVideo(videoId: number) {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }

    this.subjects.deleteVideo(videoId).subscribe({
      next: () => {
        this.loadVideos();
      },
      error: (error) => {
        console.error('Delete video error:', error);
      }
    });
  }

  public selectSubject(subject: any) {
    this.selectedSubject = subject;
    this.loadVideos();
  }

  public goBack() {
    this.selectedSubject = null;
  }

  public getSafeUrl(url: string): SafeResourceUrl {
    let videoId = '';

    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
      videoId = match[1];
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  public getSafeImageUrl(url: string): SafeUrl {
  const finalUrl =
    url?.match(/\.(png|jpg|jpeg|svg|webp)/)
      ? url
      : 'assets/default-icon.png';

  return this.sanitizer.bypassSecurityTrustUrl(finalUrl);
}

  public logout() {
    // // clear storage (adjust based on your auth)
    localStorage.removeItem('userId');
    // // redirect to login
    this.router.navigate(['/app-sign-in'])
  }
}

