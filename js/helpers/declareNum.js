export function declarePare(n, arr) {
   return `${n} ${
      arr[
      ((n%10 >= 2 && n%10 <= 4) && (n%100 <10 || n%100 > 20))
      ? 0
      : n%10 === 1 && n%100 != 11
      ? 1
      : 2
   ]}`
}