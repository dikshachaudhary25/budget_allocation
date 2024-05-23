import React, { useState } from 'react';
import './BudgetAllocation.css';

const BudgetAllocation = () => {
  const [budget, setBudget] = useState(1000);
  const [remainingBudget, setRemainingBudget] = useState(20000 - budget);
  const [currency, setCurrency] = useState('$');
  const [allocations, setAllocations] = useState([
    { department: 'Marketing', amount: 0 },
    { department: 'Finance', amount: 0 },
    { department: 'Sales', amount: 0 },
    { department: 'Human Resource', amount: 0 },
    { department: 'IT', amount: 0 },
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [allocationType, setAllocationType] = useState('add');
  const [allocationAmount, setAllocationAmount] = useState(0);

  const handleBudgetChange = (e) => {
    const newBudget = parseInt(e.target.value);
    if (!isNaN(newBudget) && newBudget <= 20000 && newBudget >= 0) {
      setBudget(newBudget);
      setRemainingBudget(20000 - newBudget);
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const changeAllocation = (department, amount) => {
    setAllocations((prevAllocations) =>
      prevAllocations.map((alloc) =>
        alloc.department === department
          ? { ...alloc, amount: Math.max(0, alloc.amount + amount) }
          : alloc
      )
    );
    setRemainingBudget((prevRemaining) => Math.max(0, prevRemaining - amount));
  };

  const handleChangeAllocation = () => {
    const amount = allocationType === 'add' ? allocationAmount : -allocationAmount;
    const department = allocations.find((alloc) => alloc.department === selectedDepartment);
    if (department) {
      if (allocationType === 'add' && allocationAmount > remainingBudget) {
        alert('Allocation exceeds the remaining budget.');
      } else if (allocationType === 'minus' && allocationAmount > department.amount) {
        alert('Cannot reduce allocation below zero.');
      } else {
        changeAllocation(department.department, amount);
      }
    }
  };

  

  const totalAllocated = allocations.reduce((sum, alloc) => sum + alloc.amount, 0);

  return (
    <div className="budget-allocation">
      <h1>Diksha Insurance Budget Allocation</h1>
      <div className="top-container">
        <div className="top-item">
          <label>Budget:</label>
          <span>{currency} {budget}</span>
        </div>
        <div className="top-item">
          <label>Remaining Budget:</label>
          <span>{currency} {remainingBudget}</span>
        </div>
        <div className="top-item">
          <label>Spent So Far:</label>
          <span>{currency} {totalAllocated}</span>
        </div>
        <div className="currency-container">
          <label htmlFor="currency">Currency:</label>
          <select id="currency" value={currency} onChange={handleCurrencyChange}>
            <option value="$">$ Dollar</option>
            <option value="€">€ Euro</option>
            <option value="£">£ Pound</option>
            <option value="¥">¥ Yen</option>
          </select>
        </div>
      </div>
      <div className="budget-container">
        <label htmlFor="budget">Budget:</label>
        <div className="budget-input-container">
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={handleBudgetChange}
            min={0}
            max={20000}
          />
        </div>
      </div>
      <div className="allocation-table">
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Allocated Budget</th>
              <th>Increase by 10</th>
              <th>Decrease by 10</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((alloc) => (
              <tr key={alloc.department}>
                <td>{alloc.department}</td>
                <td>{currency} {alloc.amount}</td>
                <td>
                  <button onClick={() => changeAllocation(alloc.department, 10)} disabled={remainingBudget < 10}>
                    +
                  </button>
                </td>
                <td>
                  <button onClick={() => changeAllocation(alloc.department, -10)} disabled={alloc.amount < 10}>
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="change-allocation">
        <h2>Change Allocation</h2>
        <div className="change-allocation-container">
          <div className="change-item">
            <label htmlFor="department-select">Department:</label>
            <select
              id="department-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select a department</option>
              {allocations.map((alloc) => (
                <option key={alloc.department} value={alloc.department}>
                  {alloc.department}
                </option>
              ))}
            </select>
          </div>
          <div className="change-item">
            <label htmlFor="allocation-type">Change Type:</label>
            <select
              id="allocation-type"
              value={allocationType}
              onChange={(e) => setAllocationType(e.target.value)}
            >
              <option value="add">Add</option>
              <option value="minus">Minus</option>
            </select>
          </div>
          <div className="change-item">
            <label htmlFor="allocation-amount">Amount:</label>
            <input
              type="number"
              id="allocation-amount"
              value={allocationAmount}
              onChange={(e) => setAllocationAmount(parseInt(e.target.value))}
              min={0}
            />
            <span>{currency}</span>
          </div>
          <button onClick={handleChangeAllocation}>Change Allocation</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetAllocation;
