import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
// export class AppComponent {


  // this is a mutable js variable
  // well change it to a signal
  // counter: number = 0;

  // a signal is a wrapper for a value
  // counter is a writable signal of type number
  // counter = signal(0);

  // this is an object signal
  // course = signal({
  //   id: 1,
  //   title: "Angular for Beginners"
  // });

  // this is an array signal
  // courses = signal([
  //   "Angular for Beginners",
  //   "Reactive Angular Course"
  // ]);

  // this is a derived signal with the computer method of the signal API
  // derived signals are read only, there is no set or update methods
  // derivedCounter = computed(() => {
  //   const counter = this.counter();
  //   return counter * 10;
  // });

  // we should never initialize a source signal inside a
  // derived signal inside an if block, always outside
  // multiplier: number = 0;
  
  // derivedCounter = computed(() => {
     
  //   const counter = this.counter();
    
  //   if (this.multiplier >= 10) {
  //   // do not do this here -> const counter = this.counter();
  //     return counter * 10;
  //   } else {
  //     return 0;
  //   }
  //  });




  // constructor() {

    // readOnlySignal is a read only signal,
    // so we cannot use update and set
    // const readOnlySignal = this.counter.asReadonly();

    // the effect method the first time its called (in this constructor)
    // will allow Angular to make note of the signals its using
    // and it will be called subsequently reactively (that is without needing
    // invokation) every time all the signals referenced within change.
    // And thus log to the console (which would be the side effect proper)
  //   effect(() => {
      
  //     const counterValue = this.counter();
  //     const derivedCounterValue = this.derivedCounter();

  //     console.log(`counter: ${counterValue} derived counter: ${derivedCounterValue}`);

  //   });

  // }

  // increment() {
    // this is how you mutate the js variable
    // this.counter++;

    // this is how you increment the signal with the
    // set method of the signal API
    // this.counter.set(this.counter() + 1);

    // the update method of the signal API is an alternative to set
    // this.counter.update(currVal => currVal + 1);

    // never do this to mutate an object signal property:
    // this.course().title = "Hello World";
    // never do this to mutate an array signal item:
    // this.courses().push("Angular Core Deep Dive");
    // when we do this this way, we bypass the signal reactivity
    // mechanism

    // instead do this:
//     this.course.set({
//       id: 1,
//       title: "Hello World"
//     });    

//     this.courses.update(courses => [...courses, "Angular Core Deep Dive"]);
    

//   }

//   incrementMultiplier() {
//     this.multiplier++;
//   }
// }


/* ANGULAR SIGNALS - INTRODUCTION */
/* Normally we rely on the Default Change Detection Mechanism.
But when you build pages that have lots of components and a lot of template
expressions, you might run into some performance issues,
because default change detection will check all the value of all the expressions of 
every component in the component tree and template expression, which can add up.
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


/* SIGNALS - HOW SIGNALS COMMUNICATE (source and derived signals) */

/* Whenever we call a derived or computed signal, Angular makes note that the source 
signal is being used in the derived signal and keeps it in mind.
Precisely when the source signal is invoked in the derived signal,
Angular makes this note. For this reason, it is not a good idea to reference a source 
signal in a derived signal inside an if block.
This is because if the if block is not called the first time the derived signal is 
executed - and thus the source signal is not invoked - then Angular does not know 
that the derived signal depends on the source signal.
To avoid this problem we can initialize the source signal inside the derived signal 
outside of if blocks.

The dependency between signals are dynamic, they depend on the last execution of the 
derived or computer signals as new values are emitted.
*/

/* SIGNALS - SIDE EFFECTS*/
/* Whenever we want a side effect to occur every time one or more signals change we use 
the effects method of the signals API.
The effects method can be called for instance in the constructor such that Angular can 
make note (similar to the computed signals) or which signals it should track.
A side effect can include logging values of a signal, or export the value of the 
signal(s) to local storage or a cookie, or save the value to the database 
(although using the update API should not happen in the effects method).
If inside the effect() we have two signals, the effect method will wait for changes to 
occur in both signals before it executes.
*/ 

/* SIGNALS - SIDE EFFECTS CLEAN UP*/
/* Usually side effects get cleaned up automatically when the component it is in is 
destoryed.
But we could also opt to clean up manually:
This usually happens when you want to cancel a timer interval, or time out,
close a network connection, release a resource an application is using.
Manual Clean up takes a couple of steps.

Step 1. Define the effect configuration to manual cleanup.

effect(() => {
      
      const counterValue = this.counter();
      const derivedCounterValue = this.derivedCounter();

      console.log(`counter: ${counterValue} derived counter: ${derivedCounterValue}`);

    },
      {
        manualCleanup: true;
      });


Step 2. Add a cleanup button on the html page to tigger the cleanup

<button (click)="onCleanup">Cleanup</button>


Step 3. Add reference to the effect

effectRef: effectRef;

// and assign it to the effect

this.effectRef =  effect(() => {
      
      const counterValue = this.counter();
      const derivedCounterValue = this.derivedCounter();
...


Step 4. Fill up onCleanup()

onCleanup() {
  this.effectRef.destroy();
}


Step 5. Add the callback function on the effect.

this.effectRef =  effect((onCleanup) => {

      onCleanup(() => { console.log(`cleanup occured`);});
      
      const counterValue = this.counter();
      const derivedCounterValue = this.derivedCounter();
...
*/
export class AppComponent {

  derivedCounter = computed(() => {
    const counter =  this.counterService.counter();

    return counter * 10;
  });

  constructor(
    public counterService: CounterService) {

    }

  increment() {
    this.counterService.increment();
  }
}


