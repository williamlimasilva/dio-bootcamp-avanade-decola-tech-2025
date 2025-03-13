# Guide for Setting Up the Barber Shop UI

## Prerequisites

- Ensure that you have Node.js installed.

## Installation Steps

1. Navigate to the project directory:

   ```
   cd barber-shop-ui
   ```

2. Install Angular CLI globally:

   ```
   npm install -g @angular/cli --save-dev

   ```

3. Create a new Angular project:

   ```
   ng new barber-shop-ui --directory=./
   ```

4. Install Angular Material:

   ```
   npm add @angular/material
   ```

   4.1. Choose your theme:

   - Azure/Blue
   - Rose/Red
   - Magenta/Violet
   - Cyan/Orange
   - Custom

     4.2. Include the Angular animation module: Inclue and enable anomations

5. Install Angular CDK:

   ```
   npm install @angular/cdk
   ```

6. Run Setup for Angular Components:
   6.1 Bash
   ```
   setup.sh
   ```
   6.2 PowerShell with Git Bash
   ```
   & "C:\Program Files\Git\bin\bash.exe" ./setup.sh
   ```
   6.3 WSL (Windows Subsystem for Linux)
   ```
   wsl ./setup.sh
   ```
