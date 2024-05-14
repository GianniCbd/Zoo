import { Component, OnInit } from '@angular/core';
import { Subscription, map, take, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  animalQuestions = [
    {
      question: "Qual è l'animale più grande del mondo?",
      correct_answer: 'Balena Blu',
      answers: ['Elefante', 'Tigre', 'Balena Blu', 'Giraffa'],
    },
    {
      question: "Quale animale è conosciuto come il 're della giungla'?",
      correct_answer: 'Leone',
      answers: ['Leone', 'Orso', 'Lupo', 'Ippopotamo'],
    },
    {
      question:
        "Quale animale cambia colore per mimetizzarsi con l'ambiente circostante?",
      correct_answer: 'Cammaleonte',
      answers: ['Coccodrillo', 'Cammaleonte', 'Pavone', 'Foca'],
    },
    {
      question: "Qual è l'unico mammifero in grado di volare?",
      correct_answer: 'Pipistrello',
      answers: ['Pipistrello', 'Civetta', 'Scoiattolo', 'Pappagallo'],
    },
    {
      question: "Qual è l'animale nazionale dell'Australia?",
      correct_answer: 'Canguro',
      answers: ['Canguro', 'Koala', 'Dingo', 'Wombat'],
    },
    {
      question:
        'Quale animale è noto per la sua capacità di correre a velocità elevate?',
      correct_answer: 'Ghepardo',
      answers: ['Ghepardo', 'Leopardo', 'Tigre', 'Leone'],
    },
    {
      question: 'Quale uccello è famoso per la sua lunga migrazione?',
      correct_answer: 'Rondine',
      answers: ['Rondine', 'Falco', 'Pinguino', 'Gufo'],
    },
  ];

  currentQuestionIndex = 0;
  answers: string[] = [];
  buttonPressed: boolean = false;

  showSpinner: boolean = true;

  correctCount = 0;
  incorrectCount = 0;

  remainingTime = 20;
  subscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    timer(5000).subscribe(() => {
      this.showSpinner = false;
      this.startTimer();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isSelected(answer: string): boolean {
    return this.answers[this.currentQuestionIndex] === answer;
  }

  startTimer() {
    this.remainingTime = 20;
    this.subscription = timer(0, 1000)
      .pipe(takeWhile(() => this.remainingTime > 0))
      .subscribe(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          alert('Tempo scaduto! Passiamo alla prossima domanda.');
          this.moveToNextQuestion();
        }
      });
  }

  resetTimer() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.startTimer();
  }

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.answers = [];
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.startTimer();
    window.location.reload();
  }

  selectAnswer(answer: string, questionIndex: number) {
    this.answers[questionIndex] = answer;
  }

  submitQuiz() {
    const currentQuestion = this.animalQuestions[this.currentQuestionIndex];
    const userAnswer = this.answers[this.currentQuestionIndex];

    if (userAnswer === currentQuestion.correct_answer) {
      this.correctCount++;
      alert('Risposta corretta!');
      this.moveToNextQuestion();
    } else {
      this.incorrectCount++;
      alert('Risposta errata! Riprova!');
      this.moveToNextQuestion();
    }
  }

  displayResults() {
    alert(
      `Hai completato il quiz! Risposte corrette: ${this.correctCount}, Risposte sbagliate: ${this.incorrectCount}`
    );
    this.resetQuiz();
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.animalQuestions.length) {
      this.resetTimer();
    } else {
      this.displayResults();
    }
  }
}
