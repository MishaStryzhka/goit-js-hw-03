// Напиши скрипт управления личным кабинетом интернет банка. Есть объект account в котором необходимо реализовать методы для работы с 
// балансом и историей транзакций.

/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    let result = {
        type: type,
        amount: amount,  
    };
    return result;
  },


  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    let id = {id: this.transactions.length + 1,};
    this.balance += amount;
    let result = {...id, ...this.createTransaction(amount, Transaction.DEPOSIT)};
    this.transactions.push(result);
    return `Операция удачная! Вы пополнили счет на ${amount}.`;
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (amount > this.balance) {
        return 'Недостаточно средств!';
    } else {
        let id = {id: this.transactions.length + 1,}
        this.balance -= amount;
        let result = {...id, ...this.createTransaction(amount, Transaction.WITHDRAW)};
        this.transactions.push(result);
        return `Операция удачная! Вы сняли со счета ${amount}.`;
    }
    
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return `Ваш баланс ${this.balance}`;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    for (const object of this.transactions) {
        
        const keys = Object.keys(object);
        for (const key of keys) {
            
            if (object[key] === id) {
                
                return object;
            }            
        }
    }
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let result = 0;
    for (const object of this.transactions) {
        
        const keys = Object.keys(object);
        for (const key of keys) {
            
            if (object[key] === type) {
                
                result += object.amount;
            }            
        }
    }
    return result;
  },

};

console.log(account.deposit(100));
console.log(account.deposit(500));
console.log(account.deposit(1000));

console.log(account.withdraw(300));

console.log(account.withdraw(3300));

console.log(account.getBalance());

console.log(account.getTransactionDetails(2));

console.log(account.getTransactionTotal(Transaction.WITHDRAW));
