# Task Tracker CLI

A simple command-line task management application built with **Node.js**. It uses a JSON file to store task data locally.

## Project Repository

https://github.com/meKenneth/task-tracker

## Features

- Add new tasks
- List all tasks
- View individual tasks
- Update existing tasks
- Delete tasks
- Mark tasks as in progress
- Mark tasks as done
- Store task data in a JSON file
- Automatically create the JSON file if it doesn't exist

## Requirements

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- Terminal or Command Prompt

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/meKenneth/task-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-tracker
   ```

3. Run the application:

   ```bash
   node index.js
   ```

## Available Commands

| Command | Description | Example |
|---|---|---|
| `listUsers` | List all tasks | `listUsers` |
| `add` | Add a new task | `add "My first task"` |
| `listUser` | List tasks using an option | `listUser all` |
| `update` | Update an existing task | `update 1 "Updated task"` |
| `mark-in-progress` | Mark a task as in progress | `mark-in-progress 1` |
| `mark-done` | Mark a task as done | `mark-done 1` |

## Data Storage

Tasks are stored locally in `tasks.json`.

Example:

```json
{
  "user1": {
    "name": "My first task",
    "role": "Pending"
  }
}
```

The application automatically creates `tasks.json` if the file does not exist.

## Technologies Used

- JavaScript
- Node.js
- Node.js File System (`fs`)
- JSON

## License

This project is open-source and available for personal learning and educational purposes.
