# LedmatrixUi

This is my prototype for an angular application controlling my LED-Matrix on my Raspberry Pi (see my project ledmatrix-srv)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Notes on this project

This is a quick and dirty prototype, most functions still need some work, but my first goal was to see something 😉

There are two services, CommunicationService is used to communicate with my backend (you'll need to change the apiUrl), the SettingsService holds a representation of the matrix in memory.

There is one main-page component which holds a color picker and a matrix component. Inside the matrix component there is one pixel component representing every single pixel.
You can add colors using the ADD button and use the SELECT button to switch between colors.

The CLEAR button on bottom resets the matrix and the UI. The SAVE button is more like an experimental way to save the current matrix as JSON to disk. The standard input next to it is used to select a previously saved JSON.

TODOs:
- UI looks horrible, I'll need some work to make this look a bit less like a prototype. Error handling would be fine!
- Are 2048 instances of the pixel component a good idea? Maybe not, but kudos to angular since it does not have that huge impact on performance.
- Touch is not working at the moment. I wanted to use this on my mobile phone so hard! I tried to get it to work with hammer.js, but there is still some work to do.
- I'd like to use ngrx (https://ngrx.io/) for state management, to use a central store for my matrix and for fancy functions like undo/redo.
- I'll need some import/export functions for standard image formats. I need to find a good standard format used for this, maybe some sprite format?
- I have some ideas for the editor. Color Pipette, Eraser, some basic functions supported by the matrix library (draw circle, rectangle, fill).
- Animations! It would be great to edit single frames and upload animations.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Installation

I installed an apache2 server on my Raspberry Pi and changed the owner of the var/www folder to my user Pi:

```
sudo apt-get install apache2
sudo chown -R pi:pi /var/www/

Then I used SFTP to transfer my dist folder to the Raspberry (var/www/html folder).