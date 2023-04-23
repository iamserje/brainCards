export function shumblePairs(data) {
   console.log('do', data);
   let shuffledPairs = data.sort(() => Math.random() - 0.5);
   console.log('posle', shuffledPairs);
   return shuffledPairs;
}