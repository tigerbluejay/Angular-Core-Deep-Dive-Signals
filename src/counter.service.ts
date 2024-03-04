import { Injectable, Input, effect, signal, ɵɵNgOnChangesFeature } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CounterService {

    private counterSignal = signal(0);

    readonly counter = this.counterSignal.asReadonly();

    increment() {
        if (this.counter() > 10) {
            throw `Maximum value reached!`;
        }

        this.counterSignal.update(currentVal => currentVal + 1);

    }
}

/* SIGNAL BASED DATA SERVICES */
// Here we create a data service so we can create a signal which 
// is not dependent on any particular Component.
// We inject the service in the AppComponent constructor and we 
// can invoke the Service in the template.

// The signal is private within the service.
// The service provides an api (increment())
// This keeps our signal code maintainable
// This is when you have a signal you want to share 
// the signal between unrelated components


/* SIGNAL INPUTS */
// So far we've been using the input decorator
// @Input
// course: Counter;

// What's ideal is that inputs are signals themselves.
// Write your whole component in signal reactive style.
// Changing the previous code to 
// course = input<Course>(); // input signal primitive - import the primitive

// This is now an input signal of type course 
// And everywhere on the app we should change course to course() 

/* SIGNAL INPUTS BENEFIT: REDUCE THE RELIANCE ON THE ON CHANGES LIFECYCLE HOOK */
// We can create side effects instead of onChanges 

// Previous code:
// export class CourseCardComponent implements OnChanges {
//     @Input
//     course: Course;

//     ngOnChanges(changes: SimpleChanges) {
//         if (changes['course']){
//             console.log(`New course value: `, this.course);
//         }
//     }
// }

// Refactored code with signals:
// export class CourseCardComponent {
//     course = input<Course>();

//     constructor() {
//         effect(() => {

//             console.log(`New course value: `, this.course());
//         })
//     }
// }

// In this way, we replace OnChanges hook log, with a log as a side
// effect of a signal

/* SIGNAL INPUT OPTIONS */

// We can define an input to be required just as we would a traditional
// input decorated variable. To do so we type
// course = input.required<Course>(); 
// this means that the template (html) must provide an initial value
// <course-card [course] = "course"></course-card>

// We can define an alias to replace the name of the member variable
// when we call the input signal
// We can also transform the original value of the input into something else
// Here null is the predetermined value for the input
// Here tutorial will replace "course" in the template to reference the input
// course = input<Course>(null, { 
//     alias: "tutorial",
//     transform: (val) => {}
// });