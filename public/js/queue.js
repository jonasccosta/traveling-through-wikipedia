/**
 * Basic Queue Data Structure 
 * 
 * @author Jonas Costa
 * */ 

class Queue {

  /**
   * Initiates the queue
   */
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }

  /**
   * Adds element to the queue
   * @param {*} element 
   */
  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  /**
   * Removes the first element from the queue
   * @returns element removed
   */
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  /**
   * @returns the first element in the queue without removing it
   */
  peek() {
    return this.elements[this.head];
  }

  /**
   * @returns {Number} the length of the queue
   */
  get length() {
    return this.tail - this.head;
  }

  /**
   * @returns {Boolean} whether the queue is empty
   */
  get isEmpty() {
    return this.length === 0;
  }
}

module.exports = { Queue };
