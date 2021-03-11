# crud laravel angular
1- back:laravel 

create controller exp: php artisan make:controller BookController --api 

2- front:angular
add angular-datatable
    a. Install the following packages:

        npm install jquery --save
        npm install datatables.net --save
        npm install datatables.net-dt --save
        npm install angular-datatables --save
        npm install @types/jquery --save-dev
        npm install @types/datatables.net --save-dev

    b. Add the dependencies in the scripts and styles attributes to angular.json:

        "projects": {
            "your-app-name": {
            "architect": {
                "build": {
                "options": {
                    "styles": [
                    "node_modules/datatables.net-dt/css/jquery.dataTables.css"
                    ],
                    "scripts": [
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/datatables.net/js/jquery.dataTables.js"
                    ],
                    ...
                }
        }
    
    c. Import the DataTablesModule at the appropriate level of your app.

        import { NgModule } from "@angular/core";
        import { BrowserModule } from "@angular/platform-browser";

        import { DataTablesModule } from "angular-datatables";

        import { AppComponent } from "./app.component";

        @NgModule({
        declarations: [AppComponent],
        imports: [BrowserModule, DataTablesModule],
        providers: [],
        bootstrap: [AppComponent],
        })
        export class AppModule {}
