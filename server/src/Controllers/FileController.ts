import {Request, Response} from 'express'
import readline from 'readline';
import fs from 'fs';

class FileController {
    upload(request: Request, response: Response){
        console.log(request.file);
        return response.send('Arquivo Adicionado');
    }
    
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
            fs.unlink('src/uploads/file.txt', ()=>{});
            return response.status(200).json(responseToSend);
        });
    }
}

export default FileController;
