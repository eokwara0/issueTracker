

/**
 * this method takes a string component and adds it to it's body 
 * and returns a full html page
 * @param {component rendered into a string } body 
 * @returns 
 */
export default function template(body) {

    // return statement
  return `
    "<!DOCTYPE HTML>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Pro MERN Stack</title>
                    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" >
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        table.table-hover tr {cursor: pointer;}
                        .panel-title a {display: block; width: 100%; cursor: pointer;}
                    </style>
                </head>
                <body>
                <!-- Page generated from template. -->
                    <div id="contents">${body}</div>
                </body>
            </html>`;
}
