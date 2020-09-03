import {Request, Response} from 'express'
import readline from 'readline';
import fs from 'fs';

class FileController {
    execute(request: Request, response: Response) {
        let array: string[] = [];
        
        const rl = readline.createInterface({
            input: fs.createReadStream('src/uploads/file.txt'),
            output: process.stdout,
            terminal: false
        });

        rl.on('line', function(line) {
            array.push(line);
        });

        rl.on('close', function() {
            let responseToSend = {input: array, output: []};

            return response.status(200).json(responseToSend);
        });
    }
}

export default FileController;
