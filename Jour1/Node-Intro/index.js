import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';
import http from 'http';

const PORT = 8000
const localhost = 'localhost'

console.log(chalk.red('Lucie'));
console.log(chalk.green('David'));
console.log(chalk.yellow('Maxime'));
console.log(chalk.blue('Coralie'));

fs.writeFile('test.txt', 'Hello world', (err) => {
    if (err) console.error(err)
    else console.log('File has been created')
})

fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) console.error(err)
    console.log(data)
})

const fetchGoogle = async () => {
    try{
        const response = axios.get(`https://www.google.com`)
        fs.writeFile('google.html', (await response).data, (err) => {
            if(err) console.error(err)
        })
    }
    catch(err){
        console.error(err)
    }
}

fetchGoogle()

const server = http.createServer((request, response) => {
    response.end('<h1>Hello world !</h1>')
});

server.listen(8000, 'localhost', () => {
    console.log(`Server is running on port ${PORT}`)
});