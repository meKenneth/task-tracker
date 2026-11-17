#!/usr/bin/env node

import fs from 'fs';
import readline from 'node:readline';
import path from 'path';
import { fileURLToPath } from 'url';

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), 'tasks.json');

if (!fs.existsSync(file)) fs.writeFileSync(file, '{}');

const data = fs.readFileSync('tasks.json', 'utf8');
const jsonObj = JSON.parse(data);

function getTimeStamp(){
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    return `${year}-${month}-${day} ${time}`;
}

function getLastIndex(){
    const taskJsonLength = Object.keys(jsonObj).length
    return taskJsonLength? String(taskJsonLength + 1) : String(1);
}

function writeFileFunct(){
    fs.writeFileSync('tasks.json', JSON.stringify(jsonObj, null, 2));
    return
}

const functions = {

    list : function (filterKey) {
        if (filterKey){
            const filteredJsonObj = Object.fromEntries(
            Object.entries(jsonObj).filter(([key, value]) => value.status === filterKey));
            console.log(filteredJsonObj);
            return
        }

        console.log(jsonObj);
        },

    add : function (task){

            const taskIndex = getLastIndex()

            jsonObj[taskIndex] = {
                "description" : task,
                "status" : "to-do",
                "createdAt" : getTimeStamp(),
                "updatedAt" : "-"
                }

            fs.writeFileSync('tasks.json', JSON.stringify(jsonObj, null, 2));
            console.log(`Task added successfully (ID: ${taskIndex})`)
        },
    update : function (taskId, updatedDescription) {
            jsonObj[taskId]["description"] = updatedDescription
            jsonObj[taskId].updatedAt = getTimeStamp()
            writeFileFunct()
            console.log(`Task updated (ID: ${taskId})`)
        },

    delete : function (taskId){
            delete jsonObj[taskId]
            writeFileFunct()
        },
    "mark-in-progress" : function (taskId){
            jsonObj[taskId]["status"] = "in-progress"
            jsonObj[taskId].updatedAt = getTimeStamp()
            writeFileFunct()
         
        },
    "mark-done" : function (taskId){
            jsonObj[taskId]["status"] = "done"
            jsonObj[taskId].updatedAt = getTimeStamp()
            writeFileFunct()
        }
  

};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'task-cli> '
});


console.log('Active! Available commands:', Object.keys(functions).join(', '));
rl.prompt();

rl.on('line', (line) => {
    // Extract function name and optional arguments
    const match = line.trim().match(/^([\w-]+)(?:\s+(\d+))?(?:\s+"(.*)"|\s+(.+))?$/);
  
  if (match) {
        const funcName = match[1];
     
        // Extract arguments
        const args = [];

        if (match[2] !== undefined) args.push(match[2]);
        if (match[3] !== undefined) args.push(match[3]);
        else if (match[4] !== undefined) args.push(match[4]);

        if (functions[funcName]) {
            functions[funcName](...args);
        } else {
            console.log(`Unknown command: "${funcName}"`);
        }
    } 
    else if (line.trim()) {
        console.log('Invalid command format.');
    }
  rl.prompt();
});

