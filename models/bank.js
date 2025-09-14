// In-memory array for accounts
let accounts = [];

function createAccount(name, balance) {
  const newAccount = {
    id: accounts.length + 1,
    name,
    balance
  };
  accounts.push(newAccount);
  return newAccount;
}

function getAllAccounts() {
  return accounts;
}

function deposit(id, amount) {
  id = parseInt(id);
  const account = accounts.find(acc => acc.id === id);
  
  if (!account) {
    return { error: 'Account not found' };
  }
  
  if (amount <= 0) {
    return { error: 'Deposit amount must be positive' };
  }
  
  account.balance += amount;
  return account;
}

function withdraw(id, amount) {
  id = parseInt(id);
  const account = accounts.find(acc => acc.id === id);
  
  if (!account) {
    return { error: 'Account not found' };
  }
  
  if (amount <= 0) {
    return { error: 'Withdrawal amount must be positive' };
  }
  
  if (account.balance < amount) {
    return { error: 'Insufficient balance' };
  }
  
  account.balance -= amount;
  return account;
}

function transfer(fromId, toId, amount) {
  fromId = parseInt(fromId);
  toId = parseInt(toId);
  
  const source = accounts.find(acc => acc.id === fromId);
  const destination = accounts.find(acc => acc.id === toId);
  
  if (!source) {
    return { error: 'Source account not found' };
  }
  
  if (!destination) {
    return { error: 'Destination account not found' };
  }
  
  if (amount <= 0) {
    return { error: 'Transfer amount must be positive' };
  }
  
  if (source.balance < amount) {
    return { error: 'Insufficient balance for transfer' };
  }
  
  source.balance -= amount;
  destination.balance += amount;
  
  return {
    from: source,
    to: destination
  };
}

module.exports = {
  createAccount,
  getAllAccounts,
  deposit,
  withdraw,
  transfer
};