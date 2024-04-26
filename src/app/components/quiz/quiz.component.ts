import { Component, OnInit } from '@angular/core';

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
  ];

  currentQuestionIndex = 0;
  answers: string[] = [];
  buttonPressed: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  selectAnswer(answer: string, questionIndex: number) {
    this.answers[questionIndex] = answer;
  }

  submitQuiz() {
    const currentQuestion = this.animalQuestions[this.currentQuestionIndex];
    const userAnswer = this.answers[this.currentQuestionIndex];

    if (userAnswer === currentQuestion.correct_answer) {
      alert('Risposta corretta!');
    } else {
      alert('Risposta errata! Riprova!');
      return;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex === this.animalQuestions.length) {
      // Se tutte le domande sono state risposte, reimposta l'indice e le risposte
      this.currentQuestionIndex = 0;
      this.answers = [];
    }
  }
}
