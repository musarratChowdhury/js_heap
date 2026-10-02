import { Heap } from './Heap.js';
import { PriorityQueue } from './Priority_Queue.js';
import { Car } from './Car.js';

console.log('hello');

const minHeap = new Heap<number>([1, 1, 2, 2, 3, 4, 5], (a, b) => a - b);
const maxHeap = new Heap<number>([1, 1, 2, 2, 3, 4, 5], (a, b) => b - a);

let c1 = new Car("red", 20);
let c2 = new Car("blue", 30);
let c3 = new Car("orange", 40);
let c4 = new Car("orange", 10);
let c6 = new Car("orange", 80);
let c8 = new Car("black", 40);

let pq = new PriorityQueue<Car>((a: Car, b: Car) => a.speed - b.speed);
pq.enqueue(c1);
pq.enqueue(c2);
pq.enqueue(c3);
pq.enqueue(c4);
pq.enqueue(c6);
pq.enqueue(c8);

console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());


minHeap.printArr();
maxHeap.printArr();
