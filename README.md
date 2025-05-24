# Angular University Course (Part IV) - Signals

This project is part IV of an Angular University course focused on the practical application of Angular Signals, Angular's new reactive primitive. It demonstrates how to use Signals in a small but complete app structure, covering both theoretical insights and implementation patterns. 

## 🧠 Key Concepts Covered
### 1. What Are Signals?
#### Conceptually:
Angular Signals are a core primitive in Angular’s reactivity model. They replace the need for manual change detection by enabling reactive, declarative data flow. Signals notify Angular precisely when a component needs to be updated by tracking "reads" and "writes," thus avoiding expensive tree-wide change detection.

#### In the Code:
We declare signals using the signal() API. This project includes writable signals like counter, object signals like course, and array signals like courses. These signals replace mutable variables and support real-time updates in the DOM.

### 2. Computed (Derived) Signals
#### Conceptually:
Computed signals derive values from source signals. They are read-only and automatically recompute when their dependencies (source signals) change. This allows for efficient derivation of new data from existing reactive sources.

#### In the Code:
The derivedCounter is a computed signal that multiplies the counter value by 10. It’s declared using the computed(() => ...) method, which takes a function and returns a reactive value:

```ts
derivedCounter = computed(() => {
  const counter = this.counterService.counter();
  return counter * 10;
});
```

### 3. Effects and Side Effects
#### Conceptually:
Effects enable the execution of side-effects (e.g., console logging, syncing to storage) whenever any signal it reads changes. This replaces lifecycle hooks like ngOnChanges and allows for side-effect handling in a declarative manner.

#### In the Code:
Though commented out in this version, the effect() function is demonstrated in the annotations. It tracks changes in signals like counter and derivedCounter, logging values to the console when they change:

```ts
effect(() => {
  const counterValue = this.counter();
  const derivedCounterValue = this.derivedCounter();
  console.log(`counter: ${counterValue} derived counter: ${derivedCounterValue}`);
});
Advanced usage includes manual cleanup, useful for network connections or timers. Steps include storing a reference to the effect and calling .destroy() when cleanup is triggered.
```

### 4. Signal-Based Services
#### Conceptually:
Using services to manage signals allows decoupling from specific components, centralizing data logic. This also enables sharing reactive state across unrelated components without input/output bindings.

#### In the Code:
The CounterService defines a private signal counterSignal and exposes a read-only version counter:

```ts
private counterSignal = signal(0);
readonly counter = this.counterSignal.asReadonly();
It includes an increment() method, enforcing an upper limit and updating the signal reactively:
```
```ts
increment() {
  if (this.counter() > 10) {
    throw `Maximum value reached!`;
  }
  this.counterSignal.update(currentVal => currentVal + 1);
}
```

### 5. Signals in Templates
#### Conceptually:
Signals can be used directly in HTML templates by invoking them as functions (counter() instead of counter). This makes template updates more predictable and tied directly to reactive data.

#### In the Code:
Inside app.component.html, signal values are invoked and rendered directly:

```html
<div>Counter Value (from Service): {{ counterService.counter() }}</div>
<div>Derived Value: {{ derivedCounter() }}</div>
This reflects the reactive binding without needing ChangeDetectorRef or manual triggering.
```

### 6. Signal Inputs (Advanced - Not Used Here)
#### Conceptually:
Angular now allows @Input properties to be signals themselves using input(). This removes the need for lifecycle hooks like ngOnChanges by leveraging effects instead.

#### In Theory (From Annotations):

```ts
course = input<Course>();
With this setup, a signal input can trigger effects like logging without ngOnChanges.
```

## 🛠 App Structure
-app.component.ts:
Sets up and consumes signals and computed signals. Injects CounterService.

-app.component.html:
Renders signal values and includes buttons to trigger updates.

-counter.service.ts:
Encapsulates a signal as an app-wide state. Demonstrates good separation of concerns and encapsulation.

### 👥 Who Is This For?
This repo is ideal for Angular learners exploring:

- Performance-focused reactivity
- Real-time UI updates
- Alternatives to RxJS for state management
- Clean separation of concerns in Angular

Even if you’re unfamiliar with signals, this project is a compact but complete example of their practical use and theoretical benefits.

🔄 Future Exploration
This example sets the foundation for more complex topics like:

- Using effect() for API sync
- Combining multiple signals
- Signal inputs in child components
- Signal-powered forms and validation

## 📝 Final Thoughts
This code serves as a playground for understanding and experimenting with Angular Signals. It shows how you can move away from traditional change detection and lifecycle methods toward a reactive, declarative model—simplifying your app while improving performance.

# Diagrams

### 1. High-Level Component-Service Interaction

```plaintext
+-------------------+           injects            +---------------------+
|                   | --------------------------> |                     |
| AppComponent      |                              |   CounterService    |
|                   | <--------------------------  |                     |
+-------------------+       exposes signal         +---------------------+
        |                                                 |
        |                                                 |
        | uses                                            | defines
        v                                                 v
+-------------------+                              +----------------------+
| Template (HTML)   | <--------------------------  | counterSignal (private) |
| - {{ counter() }} |       counter() signal       +----------------------+
| - {{ derived() }} |                              | increment() method     |
+-------------------+                              +----------------------+
```

### 2. Signal Lifecycle and Flow
```plaintext
[User Clicks Button]
        |
        v
+-------------------+
| increment()       |
| AppComponent      |
+-------------------+
        |
        v
+-------------------+
| increment()       |
| CounterService    |
+-------------------+
        |
        v
+---------------------------+
| counterSignal.update()    |
+---------------------------+
        |
        v
+----------------------------+
| Signal Notifies Angular   |
| -> DOM updates via        |
|    {{ counter() }}        |
| -> derivedCounter()       |
+----------------------------+
```

### 3. Derived Signal Dependency
```plaintext
+------------------------+
|  counterService.counter()  |
+------------------------+
             |
             v
+------------------------+
|  derivedCounter =      |
|  computed(() =>        |
|    counter * 10)       |
+------------------------+
Note: The arrow indicates that derivedCounter depends on the counter signal. If counter changes, Angular automatically recomputes derivedCounter.
```

### 4. Signal Reactivity in the Template
```plaintext
+--------------------+
| app.component.html |
+--------------------+
        |
        | uses
        v
+--------------------------------+
| {{ counterService.counter() }} |
| {{ derivedCounter() }}         |
+--------------------------------+
        |
        v
+-------------------------+
| DOM Automatically       |
| Updates on Signal Change|
+-------------------------+
```
