import React, { useState } from 'react'
import "../components/LoanCalculator.css"
import loanIcon from '../loanIcon.png'
import loanIcon2 from "../loanIcon2.png"
function LoanCalculator() {
    // every single value that is dynamic it must be a state ( using UseState hook)
    const [loanAmount, setLoanAmount] = useState('')
    const [interests, setInterest] = useState('')
    const [monthlyPayment, setMonthlyPayment] = useState(null)
    const [yearsToRepay, setYearsToRepay] = useState('')
    const [monthlySalery, setMonthlySalery] = useState('')
    const [totalPayment, setTotalPayment] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)

    const calculateTotalResults = () => {
        const p = parseFloat(loanAmount)
        const annualInterest = parseFloat(interests)
        const n = parseFloat(yearsToRepay) * 12
        const r = (annualInterest / 100) / 12
        const MonthlyP = ((p * r * (Math.pow((1 + r), n))) / ((Math.pow((1 + r), n)) - 1))

        if (isNaN(p) || isNaN(annualInterest) || isNaN(n) || r === 0) {
            alert("Please enter valid numbers for all fields.");
            return;
        }
        setMonthlyPayment(MonthlyP.toFixed(2))

        //total Payment

        /*
        the error is here
        const totalP = monthlyPayment * (yearsToRepay * 12)
        in monthlyPayment it's an empty string (m3andha hata 9ima w hna st3mlnaha)
        so instead of monthlyPayment we will use MonthlyP that we calculate before
        */
        const totalP = MonthlyP * n;
        setTotalPayment(totalP.toFixed(2));

        //totalInterests

        /* same for this line too totalPayment is an empty string here it has no value but totalP si it has */
        const totalInt = totalP - loanAmount
        setTotalInterest(totalInt.toFixed(2))
    }

    const canAffordIt = () => {
        const Affordability = parseFloat(monthlySalery) - parseFloat(monthlyPayment)
        if (Affordability > 0) {
            return "Yes";
        }
        else
            return "No"

    }

    return (


        <div className='TestDiv'>
            <div className='InformationsContainer'>
                <div className='InformationsBeforeCalculate'>
                    <div style={{ display: 'flex', paddingBottom:"10px",paddingTop:"10px" }}>
                        <img src={loanIcon} style={{ width: '50px' }} />
                        <p style={{ fontFamily: "Poppins-BoldItalic", textAlign: "center", paddingTop: '10px' }}>
                            Loan Calculator</p>
                    </div>

                    <input type='number' placeholder='Loan Amount ($)' name='LoanAmount' value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                    <input type='number' placeholder='Interests (%)' name='interests' value={interests} onChange={(e) => setInterest(e.target.value)} />
                    <input type='number' placeholder='Monthly Salery ($)' name='salery' value={monthlySalery} onChange={(e) => setMonthlySalery(e.target.value)} />
                    <input type='text' placeholder='Years To Repay' name='years' value={yearsToRepay} onChange={(e) => setYearsToRepay(e.target.value)} />
                    <br />
                    <button onClick={calculateTotalResults}>Calculate</button>
                </div>
                <hr />
                <div className='InformationsAfterCalculate' style={{ paddingLeft: '70px', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', paddingLeft: "15px", paddingBottom: "20px" }}>
                        <img src={loanIcon2} style={{ width: '50px' }} />
                        <p style={{ fontFamily: "Poppins-Bold", paddingTop: '15px' }}>Results</p>
                    </div>

                    <div className='Result'>
                        Monthly Payment
                        <div className='calculationResult'>
                            {monthlyPayment} $
                        </div>
                    </div>
                    <div className='Result'>
                        Total Payment
                        <div className='calculationResult'>
                            {totalPayment} $
                        </div>
                    </div>
                    <div className='Result'>
                        Total Interests
                        <div className='calculationResult'>
                            {totalInterest} $
                        </div>
                    </div>
                    <div className='Result'>
                        Can u Afford it ?
                        <div className='calculationResult'>
                            {canAffordIt()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanCalculator
