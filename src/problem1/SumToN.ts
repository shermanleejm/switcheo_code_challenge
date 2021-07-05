var sum_to_n_a = function (n: number): number {
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n: number): number {
  return n > 1 ? n + sum_to_n_b(n - 1) : 1;
};

var sum_to_n_c = function (n: number): number {
  n = Math.floor(n);
  let res = 0;
  for (let i = 1; i < n + 1; i++) {
    res += i;
  }
  return res;
};

// Testing
var testcase = [5, 10];
var answer = [15, 55];

for (let i = 0; i < testcase.length; i++) {
  console.log(sum_to_n_a(testcase[i]) === answer[i]);
  console.log(sum_to_n_b(testcase[i]) === answer[i]);
  console.log(sum_to_n_c(testcase[i]) === answer[i]);
}
