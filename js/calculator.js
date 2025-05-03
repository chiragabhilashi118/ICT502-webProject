document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const calculators = document.querySelectorAll('.calculator');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and calculators
            tabButtons.forEach(btn => btn.classList.remove('active'));
            calculators.forEach(calc => calc.classList.remove('active'));

            // Add active class to clicked button and corresponding calculator
            this.classList.add('active');
            const targetId = this.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Retirement Calculator
    const retirementForm = document.querySelector('#retirement .calculator-form');
    const retirementResult = document.querySelector('#retirement .calculator-result');
    const retirementChart = document.getElementById('retirement-chart');

    retirementForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateRetirement();
    });

    function calculateRetirement() {
        const currentAge = parseInt(document.getElementById('current-age').value);
        const retirementAge = parseInt(document.getElementById('retirement-age').value);
        const currentSavings = parseFloat(document.getElementById('current-savings').value);
        const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);
        const annualReturn = parseFloat(document.getElementById('annual-return').value) / 100;

        const yearsToRetirement = retirementAge - currentAge;
        const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;

        let totalSavings = currentSavings;
        const monthlyData = [];

        for (let i = 0; i < yearsToRetirement * 12; i++) {
            totalSavings = (totalSavings * (1 + monthlyReturn)) + monthlyContribution;
            if (i % 12 === 0) {
                monthlyData.push(totalSavings);
            }
        }

        const monthlyIncome = totalSavings * 0.04 / 12;

        document.getElementById('total-savings').textContent = formatCurrency(totalSavings);
        document.getElementById('monthly-income').textContent = formatCurrency(monthlyIncome);

        updateRetirementChart(monthlyData, yearsToRetirement);
    }

    function updateRetirementChart(data, years) {
        const labels = Array.from({length: years}, (_, i) => `Year ${i + 1}`);
        
        if (retirementChart.chart) {
            retirementChart.chart.destroy();
        }

        retirementChart.chart = new Chart(retirementChart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Projected Savings',
                    data: data,
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Mortgage Calculator
    const mortgageForm = document.querySelector('#mortgage .calculator-form');
    const mortgageResult = document.querySelector('#mortgage .calculator-result');
    const mortgageChart = document.getElementById('mortgage-chart');

    mortgageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateMortgage();
    });

    function calculateMortgage() {
        const homePrice = parseFloat(document.getElementById('home-price').value);
        const downPayment = parseFloat(document.getElementById('down-payment').value);
        const loanTerm = parseInt(document.getElementById('loan-term').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;

        const loanAmount = homePrice - downPayment;
        const monthlyRate = interestRate / 12;
        const numberOfPayments = loanTerm * 12;

        const monthlyPayment = loanAmount * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;

        document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
        document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
        document.getElementById('total-cost').textContent = formatCurrency(totalPayment);

        updateMortgageChart(loanAmount, totalInterest);
    }

    function updateMortgageChart(principal, interest) {
        if (mortgageChart.chart) {
            mortgageChart.chart.destroy();
        }

        mortgageChart.chart = new Chart(mortgageChart, {
            type: 'doughnut',
            data: {
                labels: ['Principal', 'Interest'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ['#007bff', '#28a745']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Investment Calculator
    const investmentForm = document.querySelector('#investment .calculator-form');
    const investmentResult = document.querySelector('#investment .calculator-result');
    const investmentChart = document.getElementById('investment-chart');

    investmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateInvestment();
    });

    function calculateInvestment() {
        const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
        const monthlyContribution = parseFloat(document.getElementById('monthly-contribution-investment').value);
        const investmentPeriod = parseInt(document.getElementById('investment-period').value);
        const expectedReturn = parseFloat(document.getElementById('expected-return').value) / 100;

        const monthlyReturn = Math.pow(1 + expectedReturn, 1/12) - 1;
        let totalInvestment = initialInvestment;
        const monthlyData = [];

        for (let i = 0; i < investmentPeriod * 12; i++) {
            totalInvestment = (totalInvestment * (1 + monthlyReturn)) + monthlyContribution;
            if (i % 12 === 0) {
                monthlyData.push(totalInvestment);
            }
        }

        const totalContributions = initialInvestment + (monthlyContribution * investmentPeriod * 12);
        const totalReturn = totalInvestment - totalContributions;

        document.getElementById('total-investment').textContent = formatCurrency(totalContributions);
        document.getElementById('total-return').textContent = formatCurrency(totalReturn);
        document.getElementById('final-balance').textContent = formatCurrency(totalInvestment);

        updateInvestmentChart(monthlyData, investmentPeriod);
    }

    function updateInvestmentChart(data, years) {
        const labels = Array.from({length: years}, (_, i) => `Year ${i + 1}`);
        
        if (investmentChart.chart) {
            investmentChart.chart.destroy();
        }

        investmentChart.chart = new Chart(investmentChart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Investment Growth',
                    data: data,
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Loan Calculator
    const loanForm = document.querySelector('#loan .calculator-form');
    const loanResult = document.querySelector('#loan .calculator-result');
    const loanChart = document.getElementById('loan-chart');

    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateLoan();
    });

    function calculateLoan() {
        const loanAmount = parseFloat(document.getElementById('loan-amount').value);
        const loanTerm = parseInt(document.getElementById('loan-term-years').value);
        const interestRate = parseFloat(document.getElementById('loan-interest-rate').value) / 100;

        const monthlyRate = interestRate / 12;
        const numberOfPayments = loanTerm * 12;

        const monthlyPayment = loanAmount * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;

        document.getElementById('loan-monthly-payment').textContent = formatCurrency(monthlyPayment);
        document.getElementById('loan-total-interest').textContent = formatCurrency(totalInterest);
        document.getElementById('loan-total-payment').textContent = formatCurrency(totalPayment);

        updateLoanChart(loanAmount, totalInterest);
    }

    function updateLoanChart(principal, interest) {
        if (loanChart.chart) {
            loanChart.chart.destroy();
        }

        loanChart.chart = new Chart(loanChart, {
            type: 'doughnut',
            data: {
                labels: ['Principal', 'Interest'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ['#007bff', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Helper function to format currency
    function formatCurrency(amount) {
        return '$' + amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Add event listeners to calculate buttons
    const calculateButtons = document.querySelectorAll('.calculate-btn');
    calculateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('.calculator-form');
            form.dispatchEvent(new Event('submit'));
        });
    });
}); 