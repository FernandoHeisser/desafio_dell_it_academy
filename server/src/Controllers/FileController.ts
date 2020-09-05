import { Request, Response } from 'express'
import readline from 'readline';
import fs from 'fs';

interface subject {
    name: string,
    average: number
}

interface test {
    subjectName: string,
    testNumber: number,
    grade: number
}

const grades = ['a', 'b', 'c', 'd', 'f'];

const subjects = [
    { name: 'logica matematica', credits: 4 },
    { name: 'engenharia de software', credits: 6 },
    { name: 'teoria da computacao', credits: 3 },
    { name: 'banco de dados', credits: 6 },
    { name: 'arquitetura de software', credits: 4 }
]

var studentAverages = <subject[]>[];
var studentTests = <test[]>[];
var studentAveragesTests = <subject[]>[];

function gradeLetterToNumber(grade: string | undefined) {
    
    switch (grade){

        case grades[0]:

            return (9+10)/2;

        case grades[1]:

            return (7+8.9)/2;

        case grades[2]:

            return (5+6.9)/2;

        case grades[3]:

            return (3+4.9)/2;

        case grades[4]:

            return (0+2.9)/2;
    }
}

function removeAccents (line: string) {       
    line = line.toLowerCase();                                                         
    
    line = line.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    line = line.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    line = line.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    line = line.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    line = line.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    line = line.replace(new RegExp('[Ç]','gi'), 'c');
    
    return line;                 
}

function mediaLine(line: string) {
    let lineArray = line.split(' ');
    
    const gradeLetter = lineArray.pop();
    const gradeNumber = gradeLetterToNumber(gradeLetter);

    lineArray.pop();
    line = lineArray.join(' ');
    line = line.trim();

    const subjectNames = subjects.map(subject=>{
        return subject.name;
    });

    if(subjectNames.includes(line)) {

        if(gradeNumber !== undefined) {
            const subject: subject = {
                name: line,
                average: gradeNumber
            }
            studentAverages.push(subject);
            line = '';
        }
    } else {

        line = 'Nem ideia do que isto significa!';

    }
    return line;
}

function alreadyHasTest(studentTest: test) {
    const studentTestsWithoutGrade = studentTests.map(test=>{
        return {
            subjectName: test.subjectName,
            testNumber: test.testNumber
        };
    });
    
    if(studentTestsWithoutGrade.includes({
        subjectName: studentTest.subjectName,
        testNumber: studentTest.testNumber
    })) {

        return true;

    } else {

        return false;

    }
}

function alreadyHasTest1(subjectName: string) {
    const studentTestsWithoutGrade = studentTests.map(test=>{
        return {
            subjectName: test.subjectName,
            testNumber: test.testNumber
        };
    });
    
    let includes = studentTestsWithoutGrade.map(test=>{

        if(test.subjectName === subjectName) {

            if(test.testNumber === 1) {

                return true;

            } else {

                return false;

            }
        } else {

            return false;

        }
    })
    return includes;
}

function test1Line(line: string) {
    let lineArray = line.split(' ');
    
    const gradeLetter = lineArray.pop();
    const gradeNumber = gradeLetterToNumber(gradeLetter);

    lineArray.pop();
    line = lineArray.join(' ');
    line = line.trim();

    const subjectNames = subjects.map(subject=>{
        return subject.name;
    });

    if(subjectNames.includes(line)) {

        if(gradeNumber !== undefined) {

            const test: test = {
                subjectName: line,
                testNumber: 1,
                grade: gradeNumber
            }

            if(alreadyHasTest(test)) {

                line = 'Nem ideia do que isto significa!';
                
            } else {
                
                studentTests.push(test);
                line = '';
                
            }
        }
    } else {

        line = 'Nem ideia do que isto significa!';

    }
    return line;
}

function test2Line(line: string) {
    let lineArray = line.split(' ');
    
    const gradeLetter = lineArray.pop();
    const gradeNumber = gradeLetterToNumber(gradeLetter);

    lineArray.pop();
    line = lineArray.join(' ');
    line = line.trim();

    const subjectNames = subjects.map(subject=>{
        return subject.name;
    });

    if(subjectNames.includes(line)) {

        if(gradeNumber !== undefined) {

            const test: test = {
                subjectName: line,
                testNumber: 2,
                grade: gradeNumber
            }

            if(alreadyHasTest(test)) {

                line = 'Nem ideia do que isto significa!';
                
            } else {
                
                if(alreadyHasTest1(test.subjectName)) {

                    studentTests.push(test);
                    line = '';

                } else {

                    line = 'Nem ideia do que isto significa!';

                }
                
            }
        }
    } else {

        line = 'Nem ideia do que isto significa!';

    }
    return line;
}

function testLine(line: string) {
    let lineArray = line.split(' ');
    
    if(lineArray[lineArray.length-2] === 'prova1') {

        line = test1Line(line);

    } else if(lineArray[lineArray.length-2] === 'prova2') {

        line = test2Line(line);
        
    } else {

        line = 'Nem ideia do que isto significa!';

    }
    
    return line;
}

function classifyNonQuestion(line: string) {
    let lineArray = line.split(' ');

    if(lineArray[lineArray.length-2] === 'media') {

        line = mediaLine(line);

    } else if(lineArray[lineArray.length-2] === 'prova1') {

        line = testLine(line);

    } else if(lineArray[lineArray.length-2] === 'prova2') {

        line = testLine(line);

    } else {

        line = 'Nem ideia do que isto significa!';

    }
    return line;
}

function getAverage(subjectName: string) {
    let line = 'Nem ideia do que isto significa!';
    
    const subjectNames = studentAverages.map(subject=>{
        return subject.name;
    });

    const testSubjectNames = studentTests.map(test=>{
        return test.subjectName;
    });
    
    if(subjectNames.includes(subjectName)) {

        const subject = studentAverages.filter(subject=>{

            if(subject.name === subjectName) {

                return subject;
            }
        });

        const subjectNameCapitalized = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

        line = `A media em ${subjectNameCapitalized} é ${subject[0].average}`;

    }

    else if(testSubjectNames.includes(subjectName)) {

        const tests = studentTests.filter(test=>{

            if(test.subjectName===subjectName){
                return test;
            }
        });

        const subjectNameCapitalized = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

        const average = (tests[0].grade + tests[1].grade) / 2;

        studentAveragesTests.push({
            name: subjectName,
            average: average
        })

        line = `A media em ${subjectNameCapitalized} é ${average}`;

    }
    return line;
}

function getAverage2(subjectName: string) {
    let line = 'Nem ideia do que isto significa!';
    
    const testSubjectNames = studentTests.map(test=>{
        return test.subjectName;
    });

    subjectName = subjectName.trim();

    if(testSubjectNames.includes(subjectName)) {

        const tests = studentTests.filter(test=>{
            if(test.subjectName===subjectName){
                return test;
            }
        });

        const subjectNameCapitalized = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

        const average = (tests[0].grade + tests[1].grade) / 2;

        studentAveragesTests.push({
            name: subjectName,
            average: average
        })

        line = `${subjectNameCapitalized} media ${average}`;

    }
    
    return line;
}

function whichAverageLine(line: string) {

    let lineArray = line.split(' ');
    lineArray.shift();
    lineArray.shift();
    lineArray.shift();

    const firstWord = lineArray.shift();

    if(firstWord === 'em') {

        const subjectNames = studentAverages.map(subject=>{
            return subject.name;
        })
        const testSubjectNames = studentTests.map(test=>{
            return test.subjectName;
        })

        let testSubjectName = lineArray;

        let testSubjectNameString = testSubjectName.join(' ');
        testSubjectNameString = testSubjectNameString.trim();

        if(lineArray[0] === 'pontuacao' && lineArray[1] === 'brasileira') {

            if(lineArray[2] === 'em' || lineArray[2] === 'de') {

                lineArray.shift();
                lineArray.shift();
                lineArray.shift();

                line = lineArray.join(' ');
                line = line.trim();

                if(subjectNames.includes(line)) {
                    line = getAverage(line);
                }

            } else {

                line = 'Nem ideia do que isto significa!';
        
            }
        } else if(  subjectNames.includes(testSubjectNameString) || 
                    testSubjectNames.includes(testSubjectNameString)) {

            line = lineArray.join(' ');
            line = line.trim();

            line = getAverage(line);

        } else {

            line = 'Nem ideia do que isto significa!';

        }

    } else if(firstWord === 'da') {

        const secondWord = lineArray.shift();
        const thirdWord = lineArray.shift();

        if(secondWord === 'disciplina' && thirdWord === 'de') {

            line = lineArray.join(' ');
            line = line.trim();

            line = getAverage2(line);

        } else {

            line = 'Nem ideia do que isto significa!';

        }
    } else {

        line = 'Nem ideia do que isto significa!';

    }

    return line;
}

function getAnotherTestGrade(subjectName: string, testNumber: number) {
    let line = 'Nem ideia do que isto significa!';
 
    const subjectNames = studentAverages.map(subject=>{
        return subject.name;
    });
    
    if(subjectNames.includes(subjectName)) {

        const subject = studentAverages.filter(subject=>{

            if(subject.name === subjectName) {

                return subject;
            }
        });

        const average = subject[0].average;

        const testSubjectNames = studentTests.map(test=>{
            return test.subjectName;
        });

        if(testNumber === 1) {

            if(testSubjectNames.includes(subjectName)) {

                const tests = studentTests.filter(test=>{
                    if(test.subjectName===subjectName && test.testNumber === 1){
                        return test;
                    }
                });
               
                const grade1 = tests[0].grade;
                const grade2 = (average*2) - grade1;

                const subjectNameCapitalized = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

                line = `A nota da Prova2 em ${subjectNameCapitalized} foi ${grade2}`;
            }

        } else if(testNumber === 2) {
    
            if(testSubjectNames.includes(subjectName)) {

                const tests = studentTests.filter(test=>{
                    if(test.subjectName===subjectName && test.testNumber === 2){
                        return test;
                    }
                });
               
                const grade2 = tests[0].grade;
                const grade1 = (average*2) - grade2;

                const subjectNameCapitalized = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

                line = `A nota da Prova1 em ${subjectNameCapitalized} foi ${grade1}`;

            }
    
        }
    }

    return line;
}

function getGradeToBeApproved(subjectName: string) {
    let line = 'Nem ideia do que isto significa!';
    
    const testSubjectNames = studentTests.map(test=>{
        return test.subjectName;
    });
    
    if(testSubjectNames.includes(subjectName)) {
        
        const testSubjectNames = studentTests.map(test=>{
            return test.subjectName;
        });

        if(testSubjectNames.includes(subjectName)) {

            const tests = studentTests.filter(test=>{
                if(test.subjectName===subjectName && test.testNumber === 1){
                    return test;
                }
            });
            
            const grade1 = tests[0].grade;
            const grade2 = (6*2) - grade1;

            const subjectNameCapitalized = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

            line = `A nota em ${subjectNameCapitalized} deve ser ${grade2}`;
        }
    }

    return line;
}

function whichGradeLine(line: string) {
    let lineArray = line.split(' ');
    lineArray.shift();
    lineArray.shift();
    lineArray.shift();

    const firstLetter = lineArray.shift();

    if(firstLetter === 'da') {

        const firstWord = lineArray.shift();
        const secondWord = lineArray.shift();

        line = lineArray.join(' ');
        line = line.trim();

        if(firstWord === 'prova2' && secondWord === 'em') {

            line = getAnotherTestGrade(line, 1);

        } else if(firstWord === 'prova1' && secondWord === 'em') {

            line = getAnotherTestGrade(line, 2);

        } else {

            line = 'Nem ideia do que isto significa!';

        }

    } else if(firstLetter === 'em') {
        if(lineArray[0] === 'pontuacao'
        && lineArray[1] === 'brasileira'
        && lineArray[2] === 'preciso'
        && lineArray[3] === 'tirar'
        && lineArray[4] === 'em') {
            
            lineArray.shift();
            lineArray.shift();
            lineArray.shift();
            lineArray.shift();
            lineArray.shift();

            if(lineArray[lineArray.length-1] === 'disciplina'
            && lineArray[lineArray.length-2] === 'na'
            && lineArray[lineArray.length-3] === 'passar'
            && lineArray[lineArray.length-4] === 'para') {

                lineArray.pop();
                lineArray.pop();
                lineArray.pop();
                lineArray.pop();
                
                line = lineArray.join(' ');
                line = line.trim();

                line = getGradeToBeApproved(line);

            } else {

                line = 'Nem ideia do que isto significa!';

            }

        } else {

            line = 'Nem ideia do que isto significa!';

        }

    } else {

        line = 'Nem ideia do que isto significa!';

    }

    return line;
}

function whichLine(line: string) {
    let lineArray = line.split(' ');

    const firstWord = lineArray[0];
    const secondWord = lineArray[1];
    const sentenceTest = firstWord + ' ' + secondWord; 

    if(sentenceTest === 'qual a') {

        const thirdWord = lineArray[2];

        if(thirdWord === 'media') {

            line = whichAverageLine(line);

        } else if(thirdWord === 'nota') {

            line = whichGradeLine(line);

        } else {

            line = 'Nem ideia do que isto significa!';

        }

    } else {

        line = 'Nem ideia do que isto significa!';

    }

    
    return line;
}

function checkSubjectApproved(subjectName: string) {
    let line = 'Nem ideia do que isto significa!';

    const testSubjectNames = studentTests.map(test=>{
        return test.subjectName;
    });
    
    if(testSubjectNames.includes(subjectName)) {

        const tests = studentTests.filter(test=>{

            if(test.subjectName===subjectName){
                return test;
            }
        });

        const subjectNameCapitalized = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

        const average = (tests[0].grade + tests[1].grade) / 2;

        studentAveragesTests.push({
            name: subjectName,
            average: average
        })

        if(average >= 5) {

            line = `Sim ${subjectNameCapitalized} media ${average}`;

        } else {

            line = `Nao ${subjectNameCapitalized} media ${average}`;

        }
    }
    return line;
}

function checkApprovedAll(line: string) {
    let totalOfSubjectsApproveds = 0;

    const subjects1 = studentAverages.map(subject=>{
        return subject;
    });

    const subjects2 = studentAveragesTests.map(subject=>{
        return subject;
    });

    const subjects = [...subjects1, ...subjects2];

    let fail = subjects.filter(subject=>{
        if(subject.average >= 5) {
            totalOfSubjectsApproveds++;
        } else {
            return subject.name;
        }
    })

    let failNamesNonUnique = fail.map(subject=>{
        return subject.name.charAt(0).toUpperCase() + subject.name.slice(1)
    })

    const failNames = failNamesNonUnique.filter((elem, pos, self)=>{
        return self.indexOf(elem) == pos;
    });

    let failString = failNames.join(' ');

    if(totalOfSubjectsApproveds === subjects.length) {

        line = 'Sim aprovado em todas disciplinas';

    } else {

        line = `Não reprovei em ${failString}`;

    }

    return line;
}

function didYouLine(line: string) {
    const lineArray = line.split(' ');

    if(lineArray[0] === 'voce'
    && lineArray[1] === 'foi'
    && lineArray[2] === 'aprovado'
    && lineArray[3] === 'em') {

        lineArray.shift();
        lineArray.shift();
        lineArray.shift();
        lineArray.shift();

        line = lineArray.join(' ');
        line = line.trim();

        const subjectNames = studentAverages.map(subject=>{
            return subject.name;
        });
    
        const testSubjectNames = studentTests.map(test=>{
            return test.subjectName;
        });

        if(line === 'todas as disciplinas') {

            line = checkApprovedAll(line);

        } else if(subjectNames.includes(line)) {

            line = checkSubjectApproved(line);

        } else if(testSubjectNames.includes(line)) {

            line = checkSubjectApproved(line);

        } else {

            line = 'Nem ideia do que isto significa!';

        }
    } else {

        line = 'Nem ideia do que isto significa!';

    }
    
    return line;
}

function checkStudiedCredits() {
    
    const subjects1 = studentAverages.map(subject=>subject.name);
    const subjects2 = studentAveragesTests.map(subject=>subject.name);
    const subjects3 = studentTests.map(test=>test.subjectName);

    const subjectsNonUnique = [...subjects1, ...subjects2, ...subjects3];

    const subjectsNames = subjectsNonUnique.filter((elem, pos, self)=>{
        return self.indexOf(elem) == pos;
    })

    const subjectsWithCredits  = <{name: string, credits: number}[]>[];

    subjects.map(subject=>{
        if(subjectsNames.includes(subject.name)) {
            subjectsWithCredits.push(subject);
        }
    });
    
    let credits = 0;
    
    subjectsWithCredits.map(subject=>{
        credits += subject.credits;
    });

    return  `No semestre cursei ${credits} creditos`;
}

function checkConcludedCredits() {

    const subjects1 = studentAverages.map(subject=>{
        if(subject.average >= 5){
            return subject.name
        }
    });
    const subjects2 = studentAveragesTests.map(subject=>{
        if(subject.average >= 5){
            return subject.name
        }
    });
    const subjectsNonUnique = [...subjects1, ...subjects2];

    const subjectsNames = subjectsNonUnique.filter((elem, pos, self)=>{
        return self.indexOf(elem) == pos;
    });

    const subjectsWithCreditsNonUnique  = <{name: string, credits: number}[]>[];

    subjects.map(subject=>{
        if(subjectsNames.includes(subject.name)) {
            subjectsWithCreditsNonUnique.push(subject);
        }
    });

    const subjectsWithCredits = subjectsWithCreditsNonUnique.filter((elem, pos, self)=>{
        return self.indexOf(elem) == pos;
    });
    
    let credits = 0;
    
    subjectsWithCredits.map(subject=>{
        credits += subject.credits;
    });

    let lineArray = (checkStudiedCredits()).split(' ');
    lineArray.shift();
    lineArray.shift();
    lineArray.shift();
    lineArray.pop();

    let totalCredits = parseInt(lineArray[0]);

    if(credits < totalCredits) {

        return `Conclui apenas ${credits} creditos`;

    } else {

        return `Conclui todos os ${credits} creditos`;

    }
}

function howManyLine(line: string) {
    const lineArray = line.split(' ');

    if(lineArray[0] === 'quantos'
    && lineArray[1] === 'creditos'
    && lineArray[2] === 'voce') {

        lineArray.shift();
        lineArray.shift();
        lineArray.shift();

        line = lineArray.join(' ');
        line = line.trim();

        if(line === 'cursou neste semestre') {

            line = checkStudiedCredits();

        } else if(line === 'concluiu') {

            line = checkConcludedCredits();

        } else {

            line = 'Nem ideia do que isto significa!';

        }

    } else {

        line = 'Nem ideia do que isto significa!';

    }
    
    return line;
}

function getGradeToReachAverage(subjectName: string, averageToReach: number) {
    let line = 'Nem ideia do que isto significa!';
    
    const testSubjectNames = studentTests.map(test=>{
        return test.subjectName;
    });
    
    if(testSubjectNames.includes(subjectName)) {
        
        const testSubjectNames = studentTests.map(test=>{
            return test.subjectName;
        });

        if(testSubjectNames.includes(subjectName)) {

            const tests = studentTests.filter(test=>{
                if(test.subjectName===subjectName && test.testNumber === 1){
                    return test;
                }
            });
            
            const grade1 = tests[0].grade;
            const grade2 = (averageToReach*2) - grade1;

            const subjectNameCapitalized = subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

            line = `A nota da Prova2 em ${subjectNameCapitalized} deve ser ${grade2}`;
        }
    }
    
    return line;
}

function toGetAverageLine(line: string) {
    let lineArray = line.split(' ');
    
    if(lineArray[0] === 'para'
    && lineArray[1] === 'ficar'
    && lineArray[2] === 'com'
    && lineArray[3] === 'media') {

        lineArray.shift();
        lineArray.shift();
        lineArray.shift();
        lineArray.shift();

        const gradeLetter = lineArray.shift();
        const gradeNumber = gradeLetterToNumber(gradeLetter);

        if(lineArray.shift() === 'em') {

            if(lineArray[lineArray.length-1] === 'prova2'
            && lineArray[lineArray.length-2] === 'da'
            && lineArray[lineArray.length-3] === 'nota'
            && lineArray[lineArray.length-4] === 'a'
            && lineArray[lineArray.length-5] === 'ser'
            && lineArray[lineArray.length-6] === 'deve'
            && lineArray[lineArray.length-7] === 'qual') {
                
                lineArray.pop();
                lineArray.pop();
                lineArray.pop();
                lineArray.pop();
                lineArray.pop();
                lineArray.pop();
                lineArray.pop();

                line = lineArray.join(' ');
                line = line.trim();

                line = getGradeToReachAverage(line, Number(gradeNumber));

            } else {

                line = 'Nem ideia do que isto significa!';

            }
        } else {

            line = 'Nem ideia do que isto significa!';

        }
    }
    
    return line;
}

function classifyQuestion(line: string) {
    if(line.charAt(line.length-1) === '?') {

        line = line.replace('?', '');

    }
    
    let lineArray = line.split(' ');

    if(lineArray[0] === 'qual') {

        line = whichLine(line);

    } else if(lineArray[0] === 'voce') {

        line = didYouLine(line);

    } else if(lineArray[0] === 'quantos') {

        line = howManyLine(line);

    } else if(lineArray[0] === 'para') {

        line = toGetAverageLine(line);

    } else {

        line = 'Nem ideia do que isto significa!';

    }

    return line;
}

function classifyLine(line: string) {
    line = line.toLowerCase();

    if(line.charAt(line.length-1) === '?') {

        line = classifyQuestion(line);

    } else if(grades.includes(line.charAt(line.length-1))){

        line = classifyNonQuestion(line);

    } else {

        line = 'Nem ideia do que isto significa!';
    }
    return line;
}

class FileController {
    upload(request: Request, response: Response){
        return response.send('Arquivo Adicionado');
    }
    
    execute(request: Request, response: Response) {
        
        let inputArray: string[] = [];
        let outputArray: string[] = [];
    
        const rl = readline.createInterface({
            input: fs.createReadStream('src/uploads/file.txt'),
            output: process.stdout,
            terminal: false
        });

        rl.on('line', function(line) {
            inputArray.push(line);

            const newLine = classifyLine(removeAccents(line));
            outputArray.push(newLine);
        });

        rl.on('close', function() {

            console.log(studentAverages);
            console.log(studentTests);
            console.log(studentAveragesTests);

            studentAverages = [];
            studentTests = [];

            let responseToSend = {input: inputArray, output: outputArray};
            fs.unlink('src/uploads/file.txt', ()=>{});
            return response.status(200).json(responseToSend);
        });
    }
}

export default FileController;
