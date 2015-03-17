/* function to function
var work = function() {
  console.log("working");
}

var doWork = function(f) {
  console.log("Start");
  try { 
    f();    
  }
  catch(ex) {
    console.log(ex);
  }
  console.log("End");
}
 
doWork(work);*/

/* object to function*/
/* IIFE - Immediately invoked function expression also known as "iffy"
(function() {
  var createWorker = function() {

    var workCount = 0;

    var task1 = function() {
      workCount += 1;
      console.log("task1 " + workCount);
    }
    var task2 = function() {
      workCount += 1;
      console.log("task2 " + workCount);
    }

    return {
      job1: task1,
      job2: task2
    };
  }

  var worker = createWorker();
  worker.job1();
  worker.job2();
  worker.job1();
  worker.job2();
}());
*/