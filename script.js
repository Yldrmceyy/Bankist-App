'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE


};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "it-IT",
  
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2022-07-28T23:36:17.929Z",
    "2022-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "de-DE",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan'); 
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};


let sorted=false;
btnSort.addEventListener('click',function(e){
 e.preventDefault();
 displayMovements(currentAccount, !sorted);
 sorted= !sorted;
});
//HAREKETLER DİZİNİ OLUŞTURDUKd
const displayMovements=function(acc,sort=false){
  containerMovements.innerHTML='';

  const movs = sort
  ? acc.movements.slice().sort((a, b) => a - b)
  : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
 
};
//displayMovements(account3.movements); kaldırıyoruz çünkü kullanıcı giriş yaptığında cagırmak ıstıyoruz.


//TOPLAM BAKİYE HESABI EN TEPEDEKİ 
//movements account  olarak değiştiriyoruz.
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
//calcDisplayBalance(account3.movements);


//movements account  olarak değiştiriyoruz.
//sadece hareket değil tüm hesabı akarıyoruz
//Faiz oranlarına erişebilmek için hareketlerden daha fazlasına ihtiyacımız var
//hareketler yerine şimdi tüm heseabı istiyoruz.o zaman hesaptan hareketleri ve faiz oranını alabiliriz. 
const calcDisplaySummary = function(acc){
  //EN ALTTAKİ "in" BÖLÜMÜ İÇİN TOPLAM HESABA GELENLER
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  //EN ALTTAKİ "out" BÖLÜMÜ İÇİn HESABPTAN GİDENLER
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  //EN ALTTAKİ "interest" BÖLÜMÜ İÇİn faiz
  const interest=acc.movements
  .filter(mov=> mov>0 )
  .map(deposit=> (deposit* acc.interestRate) / 100)
  //bank yeni yasa getirdi, faiz oranı en az bir olması gerekiyor yoksa fazi vermem diyor.
  .filter((int,i,arr)=>{
    console.log(arr);
    return int >= 1;
  })
  .reduce((acc,int)=> acc+int , 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};
//calcDisplaySummary(account3.movements);  (bu 3 tanesini sil)

//USERNAME oluşturduk
const createUsernames=function(accs){
  accs.forEach(function(acc){
    acc.username= acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
   // console.log(acc.username);
  });
};
createUsernames(accounts);

//updateUı fonksiyonuna atadık 3 ünü.baska türlü üç işlevi account kullanarak cagıramzsdık.
//bu fonksiyonu herhangi yerde cagırabiliriz bu üç görevi yerine getirecektir.
const updateUI =function(acc){
   //Dİsplay movement
 displayMovements(acc);

 //Display balance burada da tüm hesabı cagıracagız
calcDisplayBalance(acc);

 //Display summary burada tüm hesabı cagıracagız
 calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};



//EVENT HANDLER (LOGİN)
let currentAccount,timer; //çünkü daha sonra current account ile diğer işlevlei yapacahız 

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  //ACCOUNT BULMAMIZ LAZIM, ÇÜNKÜ KULLANICI GİRİŞ YAPTIGINDA TÜM BİLGİLERİNİ VERMELİ
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //current ACCOUNT VARSA (? işareti)
  if(currentAccount?.pin === Number(inputLoginPin.value)){
 //KULLANICI İSİM VE ŞİFRE EŞLEŞTİĞİNDE;;
  //Display UI and Messeage
  labelWelcome.textContent= `Welcome back,
  ${currentAccount.owner.split(' ')[0]
}`;
containerApp.style.opacity=100;

 // Create current date and time
 const now = new Date();
 const options = {
   hour: "numeric",
   minute: "numeric",
   day: "numeric",
   month: "numeric",
   year: "numeric",
   // weekday: 'long',
 };
 // const locale = navigator.language;
 // console.log(locale);

 labelDate.textContent = new Intl.DateTimeFormat(
   currentAccount.locale,
   options
 ).format(now);

 // const day = `${now.getDate()}`.padStart(2, 0);
 // const month = `${now.getMonth() + 1}`.padStart(2, 0);
 // const year = now.getFullYear();
 // const hour = `${now.getHours()}`.padStart(2, 0);
 // const min = `${now.getMinutes()}`.padStart(2, 0);
 // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;



//Giriş yapptıktan sonra labeller boş kalsın user ve pın yazsın.
//Clear input Fields
inputLoginUsername.value= inputLoginPin.value = '';
inputLoginPin.blur();

   // Timer
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();

updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click',function(e){ //varsayılan davranısı engelle, form göndermesin
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc =accounts.find(
    acc=> acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = ''; 

  if (amount >0 && 
    receiverAcc &&
    currentAccount.balance >= amount && 
    receiverAcc?.username !== currentAccount.username
    ){

      //doing the transfers
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

      // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});



btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});


 
btnClose.addEventListener('click',function(e){
  e.preventDefault();


  if(inputCloseUsername.value === currentAccount.username &&
   Number( inputClosePin.value )=== currentAccount.pin
   ){
    const index = accounts.findIndex(
      acc=> acc.username === currentAccount.username
    );
    console.log(index);
    
    //delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity=0;
  }
   
  inputCloseUsername.value = inputClosePin.value = ''; 
});



/////////////////////////////////////////////////
// LECTURES
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUSD=1.1;

const movementsUSD=movements.map(mov=> mov*eurToUSD);
console.log(movements);
console.log(movementsUSD);

const movementsDescriptions = movements.map((mov,i,arr)=>{
  if(mov>0){
   return `Movements ${i+1} : You deposited ${mov}$`;
  }else{
   return `Movements ${i+1} : You withdrew ${Math.abs(mov)}$`;
  }
  // `Movements ${i+1}: You ${mov>0 ? 'deposited' : 'withdrew'} ${math.abs(mov)`
 });
 console.log(movementsDescriptions);

const deposits=movements.filter(mov=> mov>0);
console.log(deposits);


const withdrawals= movements.filter(mov=> mov< 0);
console.log(withdrawals);

//MAXImUM VALUE
const max= movements.reduce((acc,mov) => { if (acc > mov ) return acc;else return mov; },movements[0]);
console.log(max);
console.log(movements);

//PIPELINE
const totalDepositsUSD=movements
.filter(mov=> mov>0)
.map(mov=> mov * eurToUSD)
.reduce((acc,mov)=> acc+ mov , 0);
console.log(totalDepositsUSD);
*/
/*
//some: CONDITION
console.log(movements.some(mov=> mov === -130));

//every 
console.log(movements.every(mov=> mov >0));

//seperate callback
const deposit = mov => mov>0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

*/
// Array Methods Practice
/*
// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// Prefixed ++ oeprator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

<<<<<<< HEAD
///////////////////////////////////////*/
=======
///////////////////////////////////////*/
>>>>>>> b90e7e2abfdcfd9db2b9ab0982e0e526848dc592
