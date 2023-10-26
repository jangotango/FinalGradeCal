import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            examGrade: '',
            capstoneGrade: '',
            passingRequirementsResult: '',
        };
    }

    calculatePassingRequirements = () => {
        const examGrade = parseInt(this.state.examGrade);
        const capstoneGrade = parseInt(this.state.capstoneGrade);

        if (!isNaN(examGrade) && !isNaN(capstoneGrade)) {
            const finalGrade = (examGrade * 0.2) + (capstoneGrade * 0.8);

            if (capstoneGrade >= 88) {
                this.setState({
                    passingRequirementsResult: `Congratulations! You don't need to take the exam to pass. Your final grade is ${finalGrade.toFixed(2)}.`,
                });
            } else if (finalGrade >= 70) {
                this.setState({
                    passingRequirementsResult: `Congratulations! You've passed with a final grade of ${finalGrade.toFixed(2)}.`,
                });
            } else {
                this.setState({
                    passingRequirementsResult: "You've failed to meet the passing criteria.",
                });
            }
        } else if (!isNaN(examGrade) && isNaN(capstoneGrade)) {
            if (examGrade * 0.2 >= 70) {
                this.setState({
                    passingRequirementsResult: `Congratulations! You've passed with the exam score alone. Your final grade is ${examGrade.toFixed(2)}.`,
                });
            } else {
                const requiredCapstoneGrade = Math.max(0, (70 - (examGrade * 0.2)) / 0.8);
                this.setState({
                    passingRequirementsResult: `To achieve a passing final grade with your provided exam grade, you need a capstone grade of at least ${requiredCapstoneGrade.toFixed(2)} (out of 100).`,
                });
            }
        } else if (isNaN(examGrade) && !isNaN(capstoneGrade)) {
            if (capstoneGrade >= 88) {
                const finalGradeWithoutExam = (capstoneGrade * 0.8);
                this.setState({
                    passingRequirementsResult: `Congratulations! You don't need to take the exam to pass. Your final grade is ${finalGradeWithoutExam.toFixed(2)}.`,
                });
            } else if (capstoneGrade < 63) {
                this.setState({
                    passingRequirementsResult: `You've scored below 63 on the capstone. To pass the final grade of 70 or higher, you need to score higher on the capstone.`,
                });
            } else if (capstoneGrade * 0.8 >= 70) {
                this.setState({
                    passingRequirementsResult: `Congratulations! You've passed with the capstone score alone. Your final grade is ${capstoneGrade.toFixed(2)}.`,
                });
            } else {
                const requiredExamGrade = Math.max(0, (70 - (capstoneGrade * 0.8)) / 0.2);
                this.setState({
                    passingRequirementsResult: `To achieve a passing final grade with your provided capstone grade, you need an exam grade of at least ${requiredExamGrade.toFixed(2)} (out of 100).`,
                });
            }
        } else {
            this.setState({
                passingRequirementsResult: "Please enter a grade for either the exam or capstone component.",
            });
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Check Your Grade Calculator</h1>
                <p>Enter the grade for the exam (out of 100):</p>
                <input
                    type="number"
                    placeholder="Enter exam grade (out of 100)"
                    step="1"
                    min="0"
                    max="100"
                    value={this.state.examGrade}
                    onChange={(e) => this.setState({ examGrade: e.target.value })}
                />

                <p>Enter the grade for the capstone (out of 100):</p>
                <input
                    type="number"
                    placeholder="Enter capstone grade (out of 100)"
                    step="1"
                    min="0"
                    max="100"
                    value={this.state.capstoneGrade}
                    onChange={(e) => this.setState({ capstoneGrade: e.target.value })}
                />

                <button onClick={this.calculatePassingRequirements}>Calculate Requirements</button>

                <p id="passingRequirementsResult">{this.state.passingRequirementsResult}</p>
            </div>
        );
    }
}

export default App;
