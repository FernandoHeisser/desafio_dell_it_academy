import { Request, Response } from 'express'
import readline from 'readline';
import fs from 'fs';

interface subject {
    name: string,
    average: number
}

interface test {
    subject_name: string,
    testNumber: number,
    grade: number
}

const grades = ['a', 'b', 'c', 'd', 'f'];

const subject = [
    { name: 'logica matematica', credits: 4 },
    { name: 'engenharia de software', credits: 6 },
    { name: 'teoria da computacao', credits: 3 },
    { name: 'banco de dados', credits: 6 },
    { name: 'arquitetura de software', credits: 4 }
]

var studentAverages = <subject[]>[];
var studentTests = <test[]>[];

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
        default:
            return undefined;
    }
}

function mediaLine(line: string) {
    let lineArray = line.split(' ');
    
    let gradeLetter = lineArray.pop();
    let gradeNumber = gradeLetterToNumber(gradeLetter);

    lineArray.pop();
    line = lineArray.join(' ');
    line = line.trim();

    if(gradeNumber !== undefined) {
        const subject: subject = {
            name: line,
            average: gradeNumber
        }
        studentAverages.push(subject);
        line = '';
    }
    return line;
}

function provaLine(line: string) {//----------------------------------------continuar aqui
    let lineArray = line.split(' ');
    
    if(lineArray[lineArray.length-2] === 'prova1') {
        let gradeLetter = lineArray.pop();
        let gradeNumber = gradeLetterToNumber(gradeLetter);
        
        line = lineArray.join(' ');
        line = 'Linha de prova 1'; 
    } else if(lineArray[lineArray.length-2] === 'prova2') {
        let gradeLetter = lineArray.pop();
        let gradeNumber = gradeLetterToNumber(gradeLetter);
        
        line = lineArray.join(' ');
        line = 'Linha de prova 2'; 
    } else {
        line = 'Nem ideia do que isto significa!';
    }
    
    return line;
}

function classifyQuestion(line: string) {//-----------------------------------depois aqui
    let lineArray = line.split(' ');

    line = 'É pergunta';
    return line;
}

function classifyNonQuestion(line: string) {
    let lineArray = line.split(' ');

    if(lineArray[lineArray.length-2] === 'media') {

        line = mediaLine(line);

    } else if(lineArray[lineArray.length-2] === 'prova1') {

        line = provaLine(line);

    } else if(lineArray[lineArray.length-2] === 'prova2') {

        line = provaLine(line);

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

            const newLine = classifyLine(line);
            outputArray.push(newLine);
        });

        rl.on('close', function() {

            console.log(studentAverages);
            console.log(studentTests);

            let responseToSend = {input: inputArray, output: outputArray};
            fs.unlink('src/uploads/file.txt', ()=>{});
            return response.status(200).json(responseToSend);
        });
    }
}

export default FileController;
