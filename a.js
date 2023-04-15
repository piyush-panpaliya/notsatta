const { PrismaClient } = require('@prisma/client');

const a = new PrismaClient({
  log: ["query", "error", "warn"]
});

// team.forEach(async (item) => {
//   const data = await a.team.create({
//     data: item
//   })
//   console.log(data)
// })

// a.forEach(i=>(console.log({time:i.children[0].children[0].innerText,t1:i.children[0].children[1].children[0].innerText,t2:i.children[0].children[1].children[1].innerText})))



const matches =[
  { time: 'Match 1 | 31 Mar', t1: 'CSK', t2: 'GT' },
  { time: 'Match 2 | 1 Apr', t1: 'PBKS', t2: 'KKR' },
  { time: 'Match 3 | 1 Apr', t1: 'LSG', t2: 'DC' },
  { time: 'Match 4 | 2 Apr', t1: 'RR', t2: 'SRH' },
  { time: 'Match 5 | 2 Apr', t1: 'MI', t2: 'RCB' },
  { time: 'Match 6 | 3 Apr', t1: 'CSK', t2: 'LSG' },
  { time: 'Match 7 | 4 Apr', t1: 'DC', t2: 'GT' },
  { time: 'Match 8 | 5 Apr', t1: 'PBKS', t2: 'RR' },
  { time: 'Match 9 | 6 Apr', t1: 'KKR', t2: 'RCB' },
  { time: 'Match 10 | 7 Apr', t1: 'SRH', t2: 'LSG' },
  { time: 'Match 11 | 8 Apr', t1: 'RR', t2: 'DC' },
  { time: 'Match 12 | 8 Apr', t1: 'MI', t2: 'CSK' },
  { time: 'Match 13 | 9 Apr', t1: 'GT', t2: 'KKR' },
  { time: 'Match 14 | 9 Apr', t1: 'PBKS', t2: 'SRH' },
  { time: 'Match 15 | 10 Apr', t1: 'RCB', t2: 'LSG' },
  { time: 'Match 16 | 11 Apr', t1: 'DC', t2: 'MI' },
  { time: 'Match 17 | 12 Apr', t1: 'RR', t2: 'CSK' },
  { time: 'Match 18 | 13 Apr', t1: 'PBKS', t2: 'GT' },
  { time: 'Match 19 | 14 Apr', t1: 'SRH', t2: 'KKR' },
  { time: 'Match 20 | 15 Apr 03:30 PM', t1: 'RCB', t2: 'DC' },
  { time: 'Match 21 | 15 Apr 07:30 PM', t1: 'LSG', t2: 'PBKS' },
  { time: 'Match 22 | 16 Apr 03:30 PM', t1: 'MI', t2: 'KKR' },
  { time: 'Match 23 | 16 Apr 07:30 PM', t1: 'GT', t2: 'RR' },
  { time: 'Match 24 | 17 Apr 07:30 PM', t1: 'RCB', t2: 'CSK' },
  { time: 'Match 25 | 18 Apr 07:30 PM', t1: 'SRH', t2: 'MI' },
  { time: 'Match 26 | 19 Apr 07:30 PM', t1: 'RR', t2: 'LSG' },
  { time: 'Match 27 | 20 Apr 03:30 PM', t1: 'PBKS', t2: 'RCB' },
  { time: 'Match 28 | 20 Apr 07:30 PM', t1: 'DC', t2: 'KKR' },
  { time: 'Match 29 | 21 Apr 07:30 PM', t1: 'CSK', t2: 'SRH' },
  { time: 'Match 30 | 22 Apr 03:30 PM', t1: 'LSG', t2: 'GT' },
  { time: 'Match 31 | 22 Apr 07:30 PM', t1: 'MI', t2: 'PBKS' },
  { time: 'Match 32 | 23 Apr 03:30 PM', t1: 'RCB', t2: 'RR' },
  { time: 'Match 33 | 23 Apr 07:30 PM', t1: 'KKR', t2: 'CSK' },
  { time: 'Match 34 | 24 Apr 07:30 PM', t1: 'SRH', t2: 'DC' },
  { time: 'Match 35 | 25 Apr 07:30 PM', t1: 'GT', t2: 'MI' },
  { time: 'Match 36 | 26 Apr 07:30 PM', t1: 'RCB', t2: 'KKR' },
  { time: 'Match 37 | 27 Apr 07:30 PM', t1: 'RR', t2: 'CSK' },
  { time: 'Match 38 | 28 Apr 07:30 PM', t1: 'PBKS', t2: 'LSG' },
  { time: 'Match 39 | 29 Apr 03:30 PM', t1: 'KKR', t2: 'GT' },
  { time: 'Match 40 | 29 Apr 07:30 PM', t1: 'DC', t2: 'SRH' },
  { time: 'Match 41 | 30 Apr 03:30 PM', t1: 'CSK', t2: 'PBKS' },
  { time: 'Match 42 | 30 Apr 07:30 PM', t1: 'MI', t2: 'RR' },
  { time: 'Match 43 | 1 May 07:30 PM', t1: 'LSG', t2: 'RCB' },
  { time: 'Match 44 | 2 May 07:30 PM', t1: 'GT', t2: 'DC' },
  { time: 'Match 45 | 3 May 07:30 PM', t1: 'PBKS', t2: 'MI' },
  { time: 'Match 46 | 4 May 03:30 PM', t1: 'LSG', t2: 'CSK' },
  { time: 'Match 47 | 4 May 07:30 PM', t1: 'SRH', t2: 'KKR' },
  { time: 'Match 48 | 5 May 07:30 PM', t1: 'RR', t2: 'GT' },
  { time: 'Match 49 | 6 May 03:30 PM', t1: 'CSK', t2: 'MI' },
  { time: 'Match 50 | 6 May 07:30 PM', t1: 'DC', t2: 'RCB' },
  { time: 'Match 51 | 7 May 03:30 PM', t1: 'GT', t2: 'LSG' },
  { time: 'Match 52 | 7 May 07:30 PM', t1: 'RR', t2: 'SRH' },
  { time: 'Match 53 | 8 May 07:30 PM', t1: 'KKR', t2: 'PBKS' },
  { time: 'Match 54 | 9 May 07:30 PM', t1: 'MI', t2: 'RCB' },
  { time: 'Match 55 | 10 May 07:30 PM', t1: 'CSK', t2: 'DC' },
  { time: 'Match 56 | 11 May 07:30 PM', t1: 'KKR', t2: 'RR' },
  { time: 'Match 57 | 12 May 07:30 PM', t1: 'MI', t2: 'GT' },
  { time: 'Match 58 | 13 May 03:30 PM', t1: 'SRH', t2: 'LSG' },
  { time: 'Match 59 | 13 May 07:30 PM', t1: 'DC', t2: 'PBKS' },
  { time: 'Match 60 | 14 May 03:30 PM', t1: 'RR', t2: 'RCB' },
  { time: 'Match 61 | 14 May 07:30 PM', t1: 'CSK', t2: 'KKR' },
  { time: 'Match 62 | 15 May 07:30 PM', t1: 'GT', t2: 'SRH' },
  { time: 'Match 63 | 16 May 07:30 PM', t1: 'LSG', t2: 'MI' },
  { time: 'Match 64 | 17 May 07:30 PM', t1: 'PBKS', t2: 'DC' },
  { time: 'Match 65 | 18 May 07:30 PM', t1: 'SRH', t2: 'RCB' },
  { time: 'Match 66 | 19 May 07:30 PM', t1: 'PBKS', t2: 'RR' },
  { time: 'Match 67 | 20 May 03:30 PM', t1: 'DC', t2: 'CSK' },
  { time: 'Match 68 | 20 May 07:30 PM', t1: 'KKR', t2: 'LSG' },
  { time: 'Match 69 | 21 May 03:30 PM', t1: 'MI', t2: 'SRH' },
  { time: 'Match 70 | 21 May 07:30 PM', t1: 'RCB', t2: 'GT' }
]

// const b = matches.map((match) => {

//   return {
//     number: match.time.split('|')[0].split('Match')[1].trim(),
//     date: match.time.split('|')[1].trim(),
//     t1: match.t1,
//     t2: match.t2
//   }
// })
const matches2 =[
  { number: '1', date: '31 Mar', t1: 'CSK', t2: 'GT' }, 
  { number: '2', date: '1 Apr', t1: 'PBKS', t2: 'KKR' },
  { number: '3', date: '1 Apr', t1: 'LSG', t2: 'DC' },  
  { number: '4', date: '2 Apr', t1: 'RR', t2: 'SRH' },
  { number: '5', date: '2 Apr', t1: 'MI', t2: 'RCB' },
  { number: '6', date: '3 Apr', t1: 'CSK', t2: 'LSG' },
  { number: '7', date: '4 Apr', t1: 'DC', t2: 'GT' },
  { number: '8', date: '5 Apr', t1: 'PBKS', t2: 'RR' },
  { number: '9', date: '6 Apr', t1: 'KKR', t2: 'RCB' },
  { number: '10', date: '7 Apr', t1: 'SRH', t2: 'LSG' },
  { number: '11', date: '8 Apr', t1: 'RR', t2: 'DC' },
  { number: '12', date: '8 Apr', t1: 'MI', t2: 'CSK' },
  { number: '13', date: '9 Apr', t1: 'GT', t2: 'KKR' },
  { number: '14', date: '9 Apr', t1: 'PBKS', t2: 'SRH' },
  { number: '15', date: '10 Apr', t1: 'RCB', t2: 'LSG' },
  { number: '16', date: '11 Apr', t1: 'DC', t2: 'MI' },
  { number: '17', date: '12 Apr', t1: 'RR', t2: 'CSK' },
  { number: '18', date: '13 Apr', t1: 'PBKS', t2: 'GT' },
  { number: '19', date: '14 Apr', t1: 'SRH', t2: 'KKR' },
  { number: '20', date: '15 Apr 03:30 PM', t1: 'RCB', t2: 'DC' },
  { number: '21', date: '15 Apr 07:30 PM', t1: 'LSG', t2: 'PBKS' },
  { number: '22', date: '16 Apr 03:30 PM', t1: 'MI', t2: 'KKR' },
  { number: '23', date: '16 Apr 07:30 PM', t1: 'GT', t2: 'RR' },
  { number: '24', date: '17 Apr 07:30 PM', t1: 'RCB', t2: 'CSK' },
  { number: '25', date: '18 Apr 07:30 PM', t1: 'SRH', t2: 'MI' },
  { number: '26', date: '19 Apr 07:30 PM', t1: 'RR', t2: 'LSG' },
  { number: '27', date: '20 Apr 03:30 PM', t1: 'PBKS', t2: 'RCB' },
  { number: '28', date: '20 Apr 07:30 PM', t1: 'DC', t2: 'KKR' },
  { number: '29', date: '21 Apr 07:30 PM', t1: 'CSK', t2: 'SRH' },
  { number: '30', date: '22 Apr 03:30 PM', t1: 'LSG', t2: 'GT' },
  { number: '31', date: '22 Apr 07:30 PM', t1: 'MI', t2: 'PBKS' },
  { number: '32', date: '23 Apr 03:30 PM', t1: 'RCB', t2: 'RR' },
  { number: '33', date: '23 Apr 07:30 PM', t1: 'KKR', t2: 'CSK' },
  { number: '34', date: '24 Apr 07:30 PM', t1: 'SRH', t2: 'DC' },
  { number: '35', date: '25 Apr 07:30 PM', t1: 'GT', t2: 'MI' },
  { number: '36', date: '26 Apr 07:30 PM', t1: 'RCB', t2: 'KKR' },
  { number: '37', date: '27 Apr 07:30 PM', t1: 'RR', t2: 'CSK' },
  { number: '38', date: '28 Apr 07:30 PM', t1: 'PBKS', t2: 'LSG' },
  { number: '39', date: '29 Apr 03:30 PM', t1: 'KKR', t2: 'GT' },
  { number: '40', date: '29 Apr 07:30 PM', t1: 'DC', t2: 'SRH' },
  { number: '41', date: '30 Apr 03:30 PM', t1: 'CSK', t2: 'PBKS' },
  { number: '42', date: '30 Apr 07:30 PM', t1: 'MI', t2: 'RR' },
  { number: '43', date: '1 May 07:30 PM', t1: 'LSG', t2: 'RCB' },
  { number: '44', date: '2 May 07:30 PM', t1: 'GT', t2: 'DC' },
  { number: '45', date: '3 May 07:30 PM', t1: 'PBKS', t2: 'MI' },
  { number: '46', date: '4 May 03:30 PM', t1: 'LSG', t2: 'CSK' },
  { number: '47', date: '4 May 07:30 PM', t1: 'SRH', t2: 'KKR' },
  { number: '48', date: '5 May 07:30 PM', t1: 'RR', t2: 'GT' },
  { number: '49', date: '6 May 03:30 PM', t1: 'CSK', t2: 'MI' },
  { number: '50', date: '6 May 07:30 PM', t1: 'DC', t2: 'RCB' },
  { number: '51', date: '7 May 03:30 PM', t1: 'GT', t2: 'LSG' },
  { number: '52', date: '7 May 07:30 PM', t1: 'RR', t2: 'SRH' },
  { number: '53', date: '8 May 07:30 PM', t1: 'KKR', t2: 'PBKS' },
  { number: '54', date: '9 May 07:30 PM', t1: 'MI', t2: 'RCB' },
  { number: '55', date: '10 May 07:30 PM', t1: 'CSK', t2: 'DC' },
  { number: '56', date: '11 May 07:30 PM', t1: 'KKR', t2: 'RR' },
  { number: '57', date: '12 May 07:30 PM', t1: 'MI', t2: 'GT' },
  { number: '58', date: '13 May 03:30 PM', t1: 'SRH', t2: 'LSG' },
  { number: '59', date: '13 May 07:30 PM', t1: 'DC', t2: 'PBKS' },
  { number: '60', date: '14 May 03:30 PM', t1: 'RR', t2: 'RCB' },
  { number: '61', date: '14 May 07:30 PM', t1: 'CSK', t2: 'KKR' },
  { number: '62', date: '15 May 07:30 PM', t1: 'GT', t2: 'SRH' },
  { number: '63', date: '16 May 07:30 PM', t1: 'LSG', t2: 'MI' },
  { number: '64', date: '17 May 07:30 PM', t1: 'PBKS', t2: 'DC' },
  { number: '65', date: '18 May 07:30 PM', t1: 'SRH', t2: 'RCB' },
  { number: '66', date: '19 May 07:30 PM', t1: 'PBKS', t2: 'RR' },
  { number: '67', date: '20 May 03:30 PM', t1: 'DC', t2: 'CSK' },
  { number: '68', date: '20 May 07:30 PM', t1: 'KKR', t2: 'LSG' },
  { number: '69', date: '21 May 03:30 PM', t1: 'MI', t2: 'SRH' },
  { number: '70', date: '21 May 07:30 PM', t1: 'RCB', t2: 'GT' }
]


const mlinks=[
  'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-chennai-super-kings-1st-match-31-march-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-kolkata-knight-riders-2nd-match-01-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-delhi-capitals-match-3-01-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-rajasthan-royals-4th-match-02-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-mumbai-indians-match-5-02-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-lucknow-super-giants-6th-match-03-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-gujarat-titans-match-7-04-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-punjab-kings-8th-match-05-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-royal-challengers-bangalore-match-9-06-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-sunrisers-hyderabad-match-10-07-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-delhi-capitals-11th-match-08-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-chennai-super-kings-12th-match-08-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-kolkata-knight-riders-13th-match-09-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-punjab-kings-match-14-09-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-lucknow-super-giants-15th-match-10-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-mumbai-indians-16th-match-11-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-rajasthan-royals-match-17-12-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-gujarat-titans-match-18-13-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-sunrisers-hyderabad-19th-match-14-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-delhi-capitals-20th-match-15-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-punjab-kings-21st-match-15-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-kolkata-knight-riders-match-22-16-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-rajasthan-royals-match-23-16-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-chennai-super-kings-match-24-17-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-mumbai-indians-match-25-18-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-lucknow-super-giants-26th-match-19-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-royal-challengers-bangalore-match-27-20-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-kolkata-knight-riders-match-28-20-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-sunrisers-hyderabad-match-29-21-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-gujarat-titans-30th-match-22-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-punjab-kings-31st-match-22-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-rajasthan-royals-32nd-match-23-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-chennai-super-kings-33rd-match-23-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-delhi-capitals-34th-match-24-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-mumbai-indians-35th-match-25-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-kolkata-knight-riders-36th-match-26-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-chennai-super-kings-37th-match-27-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-lucknow-super-giants-38th-match-28-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-gujarat-titans-39th-match-29-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-sunrisers-hyderabad-40th-match-29-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-punjab-kings-match-41-30-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-rajasthan-royals-42nd-match-30-april-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-royal-challengers-bangalore-43rd-match-01-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-delhi-capitals-44th-match-02-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-mumbai-indians-45th-match-03-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-chennai-super-kings-46th-match-04-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-kolkata-knight-riders-47th-match-04-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-gujarat-titans-48th-match-05-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-mumbai-indians-49th-match-06-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-royal-challengers-bangalore-50th-match-06-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-lucknow-super-giants-51st-match-07-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-sunrisers-hyderabad-52nd-match-07-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-punjab-kings-53rd-match-08-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-royal-challengers-bangalore-54th-match-09-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-delhi-capitals-match-55-10-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-rajasthan-royals-56th-match-11-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-gujarat-titans-57th-match-12-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-lucknow-super-giants-58th-match-13-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-punjab-kings-match-59-13-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-royal-challengers-bangalore-60th-match-14-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-kolkata-knight-riders-61st-match-14-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-sunrisers-hyderabad-match-62-15-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-mumbai-indians-63rd-match-16-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-delhi-capitals-64th-match-17-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-royal-challengers-bangalore-65th-match-18-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-rajasthan-royals-66th-match-19-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-chennai-super-kings-67th-match-20-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-lucknow-super-giants-68th-match-20-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-sunrisers-hyderabad-69th-match-21-may-2023/ajax?lang=en',
  'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-gujarat-titans-70th-match-21-may-2023/ajax?lang=en'
]


// const fmatch=

const id=[
  "60919",
  "60920",
  "60970",
  "60921",
  "60971",
  "60922",
  "60972",
  "60923",
  "60973",
  "60974",
  "60924",
  "60925",
  "60926",
  "60975",
  "60927",
  "60928",
  "60976",
  "60977",
  "60929",
  "60930",
  "60931",
  "60978",
  "60979",
  "60980",
  "60981",
  "60932",
  "60982",
  "60983",
  "60984",
  "60933",
  "60934",
  "60935",
  "60936",
  "60937",
  "60938",
  "60939",
  "60940",
  "60941",
  "60942",
  "60943",
  "60985",
  "60944",
  "60945",
  "60946",
  "60947",
  "60948",
  "60949",
  "60950",
  "60951",
  "60952",
  "60953",
  "60954",
  "60955",
  "60956",
  "60986",
  "60957",
  "60958",
  "60959",
  "60987",
  "60960",
  "60961",
  "60988",
  "60962",
  "60963",
  "60964",
  "60965",
  "60966",
  "60967",
  "60968",
  "60969"
]

const time=[
  "2023-03-31T14:00:00+00:00",
  "2023-04-01T10:00:00+00:00",
  "2023-04-01T14:00:00+00:00",
  "2023-04-02T10:00:00+00:00",
  "2023-04-02T14:00:00+00:00",
  "2023-04-03T14:00:00+00:00",
  "2023-04-04T14:00:00+00:00",
  "2023-04-05T14:00:00+00:00",
  "2023-04-06T14:00:00+00:00",
  "2023-04-07T14:00:00+00:00",
  "2023-04-08T10:00:00+00:00",
  "2023-04-08T14:00:00+00:00",
  "2023-04-09T10:00:00+00:00",
  "2023-04-09T14:00:00+00:00",
  "2023-04-10T14:00:00+00:00",
  "2023-04-11T14:00:00+00:00",
  "2023-04-12T14:00:00+00:00",
  "2023-04-13T14:00:00+00:00",
  "2023-04-14T14:00:00+00:00",
  "2023-04-15T10:00:00+00:00",
  "2023-04-15T14:00:00+00:00",
  "2023-04-16T10:00:00+00:00",
  "2023-04-16T14:00:00+00:00",
  "2023-04-17T14:00:00+00:00",
  "2023-04-18T14:00:00+00:00",
  "2023-04-19T14:00:00+00:00",
  "2023-04-20T10:00:00+00:00",
  "2023-04-20T14:00:00+00:00",
  "2023-04-21T14:00:00+00:00",
  "2023-04-22T10:00:00+00:00",
  "2023-04-22T14:00:00+00:00",
  "2023-04-23T10:00:00+00:00",
  "2023-04-23T14:00:00+00:00",
  "2023-04-24T14:00:00+00:00",
  "2023-04-25T14:00:00+00:00",
  "2023-04-26T14:00:00+00:00",
  "2023-04-27T14:00:00+00:00",
  "2023-04-28T14:00:00+00:00",
  "2023-04-29T10:00:00+00:00",
  "2023-04-29T14:00:00+00:00",
  "2023-04-30T10:00:00+00:00",
  "2023-04-30T14:00:00+00:00",
  "2023-05-01T14:00:00+00:00",
  "2023-05-02T14:00:00+00:00",
  "2023-05-03T14:00:00+00:00",
  "2023-05-04T10:00:00+00:00",
  "2023-05-04T14:00:00+00:00",
  "2023-05-05T14:00:00+00:00",
  "2023-05-06T10:00:00+00:00",
  "2023-05-06T14:00:00+00:00",
  "2023-05-07T10:00:00+00:00",
  "2023-05-07T14:00:00+00:00",
  "2023-05-08T14:00:00+00:00",
  "2023-05-09T14:00:00+00:00",
  "2023-05-10T14:00:00+00:00",
  "2023-05-11T14:00:00+00:00",
  "2023-05-12T14:00:00+00:00",
  "2023-05-13T10:00:00+00:00",
  "2023-05-13T14:00:00+00:00",
  "2023-05-14T10:00:00+00:00",
  "2023-05-14T14:00:00+00:00",
  "2023-05-15T14:00:00+00:00",
  "2023-05-16T14:00:00+00:00",
  "2023-05-17T14:00:00+00:00",
  "2023-05-18T14:00:00+00:00",
  "2023-05-19T14:00:00+00:00",
  "2023-05-20T10:00:00+00:00",
  "2023-05-20T14:00:00+00:00",
  "2023-05-21T10:00:00+00:00",
  "2023-05-21T14:00:00+00:00"
]

// console.log(mlinks.map((link,n) =>({link,...matches2[n],id:id[n],startTime:time[n]})))


const finalmatches=[
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-chennai-super-kings-1st-match-31-march-2023/ajax?lang=en',
    number: '1',
    date: '31 Mar',
    t1: 'CSK',
    t2: 'GT',
    id: '60919',
    startTime: '2023-03-31T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-kolkata-knight-riders-2nd-match-01-april-2023/ajax?lang=en',
    number: '2',
    date: '1 Apr',
    t1: 'PBKS',
    t2: 'KKR',
    id: '60920',
    startTime: '2023-04-01T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-delhi-capitals-match-3-01-april-2023/ajax?lang=en',
    number: '3',
    date: '1 Apr',
    t1: 'LSG',
    t2: 'DC',
    id: '60970',
    startTime: '2023-04-01T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-rajasthan-royals-4th-match-02-april-2023/ajax?lang=en',
    number: '4',
    date: '2 Apr',
    t1: 'RR',
    t2: 'SRH',
    id: '60921',
    startTime: '2023-04-02T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-mumbai-indians-match-5-02-april-2023/ajax?lang=en',
    number: '5',
    date: '2 Apr',
    t1: 'MI',
    t2: 'RCB',
    id: '60971',
    startTime: '2023-04-02T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-lucknow-super-giants-6th-match-03-april-2023/ajax?lang=en',
    number: '6',
    date: '3 Apr',
    t1: 'CSK',
    t2: 'LSG',
    id: '60922',
    startTime: '2023-04-03T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-gujarat-titans-match-7-04-april-2023/ajax?lang=en', 
    number: '7',
    date: '4 Apr',
    t1: 'DC',
    t2: 'GT',
    id: '60972',
    startTime: '2023-04-04T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-punjab-kings-8th-match-05-april-2023/ajax?lang=en',
    number: '8',
    date: '5 Apr',
    t1: 'PBKS',
    t2: 'RR',
    id: '60923',
    startTime: '2023-04-05T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-royal-challengers-bangalore-match-9-06-april-2023/ajax?lang=en',
    number: '9',
    date: '6 Apr',
    t1: 'KKR',
    t2: 'RCB',
    id: '60973',
    startTime: '2023-04-06T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-sunrisers-hyderabad-match-10-07-april-2023/ajax?lang=en',
    number: '10',
    date: '7 Apr',
    t1: 'SRH',
    t2: 'LSG',
    id: '60974',
    startTime: '2023-04-07T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-delhi-capitals-11th-match-08-april-2023/ajax?lang=en',
    number: '11',
    date: '8 Apr',
    t1: 'RR',
    t2: 'DC',
    id: '60924',
    startTime: '2023-04-08T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-chennai-super-kings-12th-match-08-april-2023/ajax?lang=en',
    number: '12',
    date: '8 Apr',
    t1: 'MI',
    t2: 'CSK',
    id: '60925',
    startTime: '2023-04-08T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-kolkata-knight-riders-13th-match-09-april-2023/ajax?lang=en',
    number: '13',
    date: '9 Apr',
    t1: 'GT',
    t2: 'KKR',
    id: '60926',
    startTime: '2023-04-09T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-punjab-kings-match-14-09-april-2023/ajax?lang=en',
    number: '14',
    date: '9 Apr',
    t1: 'PBKS',
    t2: 'SRH',
    id: '60975',
    startTime: '2023-04-09T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-lucknow-super-giants-15th-match-10-april-2023/ajax?lang=en',
    number: '15',
    date: '10 Apr',
    t1: 'RCB',
    t2: 'LSG',
    id: '60927',
    startTime: '2023-04-10T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-mumbai-indians-16th-match-11-april-2023/ajax?lang=en',
    number: '16',
    date: '11 Apr',
    t1: 'DC',
    t2: 'MI',
    id: '60928',
    startTime: '2023-04-11T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-rajasthan-royals-match-17-12-april-2023/ajax?lang=en',
    number: '17',
    date: '12 Apr',
    t1: 'RR',
    t2: 'CSK',
    id: '60976',
    startTime: '2023-04-12T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-gujarat-titans-match-18-13-april-2023/ajax?lang=en',  
    number: '18',
    date: '13 Apr',
    t1: 'PBKS',
    t2: 'GT',
    id: '60977',
    startTime: '2023-04-13T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-sunrisers-hyderabad-19th-match-14-april-2023/ajax?lang=en',
    number: '19',
    date: '14 Apr',
    t1: 'SRH',
    t2: 'KKR',
    id: '60929',
    startTime: '2023-04-14T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-delhi-capitals-20th-match-15-april-2023/ajax?lang=en',
    number: '20',
    date: '15 Apr 03:30 PM',
    t1: 'RCB',
    t2: 'DC',
    id: '60930',
    startTime: '2023-04-15T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-punjab-kings-21st-match-15-april-2023/ajax?lang=en',
    number: '21',
    date: '15 Apr 07:30 PM',
    t1: 'LSG',
    t2: 'PBKS',
    id: '60931',
    startTime: '2023-04-15T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-kolkata-knight-riders-match-22-16-april-2023/ajax?lang=en',
    number: '22',
    date: '16 Apr 03:30 PM',
    t1: 'MI',
    t2: 'KKR',
    id: '60978',
    startTime: '2023-04-16T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-rajasthan-royals-match-23-16-april-2023/ajax?lang=en',
    number: '23',
    date: '16 Apr 07:30 PM',
    t1: 'GT',
    t2: 'RR',
    id: '60979',
    startTime: '2023-04-16T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-chennai-super-kings-match-24-17-april-2023/ajax?lang=en',
    number: '24',
    date: '17 Apr 07:30 PM',
    t1: 'RCB',
    t2: 'CSK',
    id: '60980',
    startTime: '2023-04-17T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-mumbai-indians-match-25-18-april-2023/ajax?lang=en',
    number: '25',
    date: '18 Apr 07:30 PM',
    t1: 'SRH',
    t2: 'MI',
    id: '60981',
    startTime: '2023-04-18T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-lucknow-super-giants-26th-match-19-april-2023/ajax?lang=en',
    number: '26',
    date: '19 Apr 07:30 PM',
    t1: 'RR',
    t2: 'LSG',
    id: '60932',
    startTime: '2023-04-19T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-royal-challengers-bangalore-match-27-20-april-2023/ajax?lang=en',
    number: '27',
    date: '20 Apr 03:30 PM',
    t1: 'PBKS',
    t2: 'RCB',
    id: '60982',
    startTime: '2023-04-20T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-kolkata-knight-riders-match-28-20-april-2023/ajax?lang=en',
    number: '28',
    date: '20 Apr 07:30 PM',
    t1: 'DC',
    t2: 'KKR',
    id: '60983',
    startTime: '2023-04-20T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-sunrisers-hyderabad-match-29-21-april-2023/ajax?lang=en',
    number: '29',
    date: '21 Apr 07:30 PM',
    t1: 'CSK',
    t2: 'SRH',
    id: '60984',
    startTime: '2023-04-21T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-gujarat-titans-30th-match-22-april-2023/ajax?lang=en',
    number: '30',
    date: '22 Apr 03:30 PM',
    t1: 'LSG',
    t2: 'GT',
    id: '60933',
    startTime: '2023-04-22T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-punjab-kings-31st-match-22-april-2023/ajax?lang=en',    number: '31',
    date: '22 Apr 07:30 PM',
    t1: 'MI',
    t2: 'PBKS',
    id: '60934',
    startTime: '2023-04-22T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-rajasthan-royals-32nd-match-23-april-2023/ajax?lang=en',
    number: '32',
    date: '23 Apr 03:30 PM',
    t1: 'RCB',
    t2: 'RR',
    id: '60935',
    startTime: '2023-04-23T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-chennai-super-kings-33rd-match-23-april-2023/ajax?lang=en',
    number: '33',
    date: '23 Apr 07:30 PM',
    t1: 'KKR',
    t2: 'CSK',
    id: '60936',
    startTime: '2023-04-23T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-delhi-capitals-34th-match-24-april-2023/ajax?lang=en',
    number: '34',
    date: '24 Apr 07:30 PM',
    t1: 'SRH',
    t2: 'DC',
    id: '60937',
    startTime: '2023-04-24T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-mumbai-indians-35th-match-25-april-2023/ajax?lang=en',
    number: '35',
    date: '25 Apr 07:30 PM',
    t1: 'GT',
    t2: 'MI',
    id: '60938',
    startTime: '2023-04-25T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-kolkata-knight-riders-36th-match-26-april-2023/ajax?lang=en',
    number: '36',
    date: '26 Apr 07:30 PM',
    t1: 'RCB',
    t2: 'KKR',
    id: '60939',
    startTime: '2023-04-26T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-chennai-super-kings-37th-match-27-april-2023/ajax?lang=en',
    number: '37',
    date: '27 Apr 07:30 PM',
    t1: 'RR',
    t2: 'CSK',
    id: '60940',
    startTime: '2023-04-27T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-lucknow-super-giants-38th-match-28-april-2023/ajax?lang=en',
    number: '38',
    date: '28 Apr 07:30 PM',
    t1: 'PBKS',
    t2: 'LSG',
    id: '60941',
    startTime: '2023-04-28T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-gujarat-titans-39th-match-29-april-2023/ajax?lang=en',
    number: '39',
    date: '29 Apr 03:30 PM',
    t1: 'KKR',
    t2: 'GT',
    id: '60942',
    startTime: '2023-04-29T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-sunrisers-hyderabad-40th-match-29-april-2023/ajax?lang=en',
    number: '40',
    date: '29 Apr 07:30 PM',
    t1: 'DC',
    t2: 'SRH',
    id: '60943',
    startTime: '2023-04-29T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-punjab-kings-match-41-30-april-2023/ajax?lang=en',
    number: '41',
    date: '30 Apr 03:30 PM',
    t1: 'CSK',
    t2: 'PBKS',
    id: '60985',
    startTime: '2023-04-30T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-rajasthan-royals-42nd-match-30-april-2023/ajax?lang=en',
    number: '42',
    date: '30 Apr 07:30 PM',
    t1: 'MI',
    t2: 'RR',
    id: '60944',
    startTime: '2023-04-30T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-royal-challengers-bangalore-43rd-match-01-may-2023/ajax?lang=en',
    number: '43',
    date: '1 May 07:30 PM',
    t1: 'LSG',
    t2: 'RCB',
    id: '60945',
    startTime: '2023-05-01T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-delhi-capitals-44th-match-02-may-2023/ajax?lang=en',    number: '44',
    date: '2 May 07:30 PM',
    t1: 'GT',
    t2: 'DC',
    id: '60946',
    startTime: '2023-05-02T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-mumbai-indians-45th-match-03-may-2023/ajax?lang=en',  
    number: '45',
    date: '3 May 07:30 PM',
    t1: 'PBKS',
    t2: 'MI',
    id: '60947',
    startTime: '2023-05-03T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-chennai-super-kings-46th-match-04-may-2023/ajax?lang=en',
    number: '46',
    date: '4 May 03:30 PM',
    t1: 'LSG',
    t2: 'CSK',
    id: '60948',
    startTime: '2023-05-04T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-kolkata-knight-riders-47th-match-04-may-2023/ajax?lang=en',
    number: '47',
    date: '4 May 07:30 PM',
    t1: 'SRH',
    t2: 'KKR',
    id: '60949',
    startTime: '2023-05-04T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-gujarat-titans-48th-match-05-may-2023/ajax?lang=en',
    number: '48',
    date: '5 May 07:30 PM',
    t1: 'RR',
    t2: 'GT',
    id: '60950',
    startTime: '2023-05-05T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-mumbai-indians-49th-match-06-may-2023/ajax?lang=en',
    number: '49',
    date: '6 May 03:30 PM',
    t1: 'CSK',
    t2: 'MI',
    id: '60951',
    startTime: '2023-05-06T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-royal-challengers-bangalore-50th-match-06-may-2023/ajax?lang=en',
    number: '50',
    date: '6 May 07:30 PM',
    t1: 'DC',
    t2: 'RCB',
    id: '60952',
    startTime: '2023-05-06T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-lucknow-super-giants-51st-match-07-may-2023/ajax?lang=en',
    number: '51',
    date: '7 May 03:30 PM',
    t1: 'GT',
    t2: 'LSG',
    id: '60953',
    startTime: '2023-05-07T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-sunrisers-hyderabad-52nd-match-07-may-2023/ajax?lang=en',
    number: '52',
    date: '7 May 07:30 PM',
    t1: 'RR',
    t2: 'SRH',
    id: '60954',
    startTime: '2023-05-07T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-punjab-kings-53rd-match-08-may-2023/ajax?lang=en',
    number: '53',
    date: '8 May 07:30 PM',
    t1: 'KKR',
    t2: 'PBKS',
    id: '60955',
    startTime: '2023-05-08T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-royal-challengers-bangalore-54th-match-09-may-2023/ajax?lang=en',
    number: '54',
    date: '9 May 07:30 PM',
    t1: 'MI',
    t2: 'RCB',
    id: '60956',
    startTime: '2023-05-09T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-delhi-capitals-match-55-10-may-2023/ajax?lang=en',
    number: '55',
    date: '10 May 07:30 PM',
    t1: 'CSK',
    t2: 'DC',
    id: '60986',
    startTime: '2023-05-10T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-rajasthan-royals-56th-match-11-may-2023/ajax?lang=en',
    number: '56',
    date: '11 May 07:30 PM',
    t1: 'KKR',
    t2: 'RR',
    id: '60957',
    startTime: '2023-05-11T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-gujarat-titans-57th-match-12-may-2023/ajax?lang=en',    number: '57',
    date: '12 May 07:30 PM',
    t1: 'MI',
    t2: 'GT',
    id: '60958',
    startTime: '2023-05-12T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-lucknow-super-giants-58th-match-13-may-2023/ajax?lang=en',
    number: '58',
    date: '13 May 03:30 PM',
    t1: 'SRH',
    t2: 'LSG',
    id: '60959',
    startTime: '2023-05-13T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-punjab-kings-match-59-13-may-2023/ajax?lang=en',    
    number: '59',
    date: '13 May 07:30 PM',
    t1: 'DC',
    t2: 'PBKS',
    id: '60987',
    startTime: '2023-05-13T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/rajasthan-royals-vs-royal-challengers-bangalore-60th-match-14-may-2023/ajax?lang=en',
    number: '60',
    date: '14 May 03:30 PM',
    t1: 'RR',
    t2: 'RCB',
    id: '60960',
    startTime: '2023-05-14T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/chennai-super-kings-vs-kolkata-knight-riders-61st-match-14-may-2023/ajax?lang=en',
    number: '61',
    date: '14 May 07:30 PM',
    t1: 'CSK',
    t2: 'KKR',
    id: '60961',
    startTime: '2023-05-14T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/gujarat-titans-vs-sunrisers-hyderabad-match-62-15-may-2023/ajax?lang=en',
    number: '62',
    date: '15 May 07:30 PM',
    t1: 'GT',
    t2: 'SRH',
    id: '60988',
    startTime: '2023-05-15T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/lucknow-super-giants-vs-mumbai-indians-63rd-match-16-may-2023/ajax?lang=en',
    number: '63',
    date: '16 May 07:30 PM',
    t1: 'LSG',
    t2: 'MI',
    id: '60962',
    startTime: '2023-05-16T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-delhi-capitals-64th-match-17-may-2023/ajax?lang=en',  
    number: '64',
    date: '17 May 07:30 PM',
    t1: 'PBKS',
    t2: 'DC',
    id: '60963',
    startTime: '2023-05-17T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/sunrisers-hyderabad-vs-royal-challengers-bangalore-65th-match-18-may-2023/ajax?lang=en',
    number: '65',
    date: '18 May 07:30 PM',
    t1: 'SRH',
    t2: 'RCB',
    id: '60964',
    startTime: '2023-05-18T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/punjab-kings-vs-rajasthan-royals-66th-match-19-may-2023/ajax?lang=en',    number: '66',
    date: '19 May 07:30 PM',
    t1: 'PBKS',
    t2: 'RR',
    id: '60965',
    startTime: '2023-05-19T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/delhi-capitals-vs-chennai-super-kings-67th-match-20-may-2023/ajax?lang=en',
    number: '67',
    date: '20 May 03:30 PM',
    t1: 'DC',
    t2: 'CSK',
    id: '60966',
    startTime: '2023-05-20T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/kolkata-knight-riders-vs-lucknow-super-giants-68th-match-20-may-2023/ajax?lang=en',
    number: '68',
    date: '20 May 07:30 PM',
    t1: 'KKR',
    t2: 'LSG',
    id: '60967',
    startTime: '2023-05-20T14:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/mumbai-indians-vs-sunrisers-hyderabad-69th-match-21-may-2023/ajax?lang=en',
    number: '69',
    date: '21 May 03:30 PM',
    t1: 'MI',
    t2: 'SRH',
    id: '60968',
    startTime: '2023-05-21T10:00:00+00:00'
  },
  {
    link: 'https://cmc2.sportskeeda.com/live-cricket-score/royal-challengers-bangalore-vs-gujarat-titans-70th-match-21-may-2023/ajax?lang=en',
    number: '70',
    date: '21 May 07:30 PM',
    t1: 'RCB',
    t2: 'GT',
    id: '60969',
    startTime: '2023-05-21T14:00:00+00:00'
  }
]

const lastmatch= finalmatches.map(m=>({...m,id:parseInt(m.id),number:parseInt(m.number)}))


lastmatch.forEach(async (item,n) => {
  const team1 = await a.team.findUnique({
    where: {
      shortName: item.t1
    }
  })
  const team2 = await a.team.findUnique({
    where: {
      shortName: item.t2
    }
  })
  const data = await a.match.create({
    data: {
      id:parseInt(item.id),
      link:item.link,
      startTime:new Date(item.startTime),
      teams:{
        connect:[{id:team1.id},{id:team2.id}]
      },
      number:parseInt(item.number),
    }
  })
  console.log(data)
})


const teams=[
  {
    id: '123214',
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    flag: 'https://static.sportskeeda.com/cricket_widget/lucknow-super-giants.png',
    slug: 'lucknow-super-giants'
  },
  {
    id: '123216',
    name: 'Gujarat Titans',
    shortName: 'GT',
    flag: 'https://static.sportskeeda.com/cricket_widget/gujarat-titans.png',
    slug: 'gujarat-titans'
  },
  {
    id: '591',
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    flag: 'https://static.sportskeeda.com/cricket_widget/kolkata-knight-riders.png',
    slug: 'kolkata-knight-riders'
  },
  {
    id: '593',
    name: 'Mumbai Indians',
    shortName: 'MI',
    flag: 'https://static.sportskeeda.com/cricket_widget/mumbai-indians.png',
    slug: 'mumbai-indians'
  },
  {
    id: '610',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    flag: 'https://static.sportskeeda.com/cricket_widget/chennai-super-kings.png',
    slug: 'chennai-super-kings'
  },
  {
    id: '612',
    name: 'Delhi Capitals',
    shortName: 'DC',
    flag: 'https://static.sportskeeda.com/cricket_widget/delhi-daredevils.png',
    slug: 'delhi-daredevils'
  },
  {
    id: '627',
    name: 'Punjab Kings',
    shortName: 'PBKS',
    flag: 'https://static.sportskeeda.com/cricket_widget/kings-xi-punjab.png',
    slug: 'kings-xi-punjab'
  },
  {
    id: '629',
    name: 'Rajasthan Royals',
    shortName: 'RR',
    flag: 'https://static.sportskeeda.com/cricket_widget/rajasthan-royals.png',
    slug: 'rajasthan-royals'
  },
  {
    id: '646',
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    flag: 'https://static.sportskeeda.com/cricket_widget/royal-challengers-bangalore.png',
    slug: 'royal-challengers-bangalore'
  },
  {
    id: '658',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    flag: 'https://static.sportskeeda.com/cricket_widget/sunrisers-hyderabad.png',
    slug: 'sunrisers-hyderabad'
  }
]


