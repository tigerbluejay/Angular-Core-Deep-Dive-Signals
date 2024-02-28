import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  // this is a mutable js variable
  // well change it to a signal
  // counter: number = 0;

  // a signal is a wrapper for a value
  // counter is a writable signal of type number
  counter = signal(0);

  // this is an object signal
  course = signal({
    id: 1,
    title: "Angular for Beginners"
  });

  // this is an array signal
  courses = signal([
    "Angular for Beginners",
    "Reactive Angular Course"
  ]);

  // this is a derived signal with the computer method of the signal API
  // derived signals are read only, there is no set or update methods
  derivedCounter = computed(() => {
    const counter = this.counter();
    return counter * 10;
  });

  constructor() {

    // readOnlySignal is a read only signal,
    // so we cannot use update and set
    const readOnlySignal = this.counter.asReadonly();

  }

  increment() {
    // this is how you mutate the js variable
    // this.counter++;

    // this is how you increment the signal with the
    // set method of the signal API
    // this.counter.set(this.counter() + 1);

    // the update method of the signal API is an alternative to set
    this.counter.update(currVal => currVal + 1);

    // never do this to mutate an object signal property:
    // this.course().title = "Hello World";
    // never do this to mutate an array signal item:
    // this.courses().push("Angular Core Deep Dive");
    // when we do this this way, we bypass the signal reactivity
    // mechanism

    // instead do this:
    this.course.set({
      id: 1,
      title: "Hello World"
    });    

    this.courses.update(courses => [...courses, "Angular Core Deep Dive"]);
    

  }
}


// ANGULAR SIGNALS - INTRODUCTION
/* Normally we rely on the Default Change Detection Mechanism.
But when you build pages that have lots of components and a lot of template
expressions, you might run into some performance issues,
because default change detection will check all the value of all the
expressions of every component in the component tree and 
template expression, which can add up.
This is an expensive calculation in terms of CPU and browser resources.

"A Signal is a reactive angular primitive which allows us to build
applications in a declarative style"

Angular will no longer have to scan the whole component tree with signals.

The main advantage of putting all your data in a signal, is that Angular
is notified when the component needs to be updated. Thus avoiding the
brute force check of every component of the component tree with every
change. In other words, whenever a change is made, the change is propagated
to all the "consumers" of the signal.

Any data you use in a template (html) you should put it in a signal.
*/
