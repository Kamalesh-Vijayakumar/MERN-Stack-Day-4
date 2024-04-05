import qr from "qr-image";
import inquirer from "inquirer";
/*inquirer package used to get input from the user*/
import fs from "fs";

inquirer
  .prompt([
    /*used to pass the question like getting input*/
    {
      message: "Please type your URL or text to convert as QR-Code",
      /*creating a var for the input and calling the input using this var that is "name"*/
      name: "URL",
    },
  ])
  .then((answers) => {
    /*User feedback or whatever*/
    const url = answers.URL;
    console.log(url);
    /*creating a var to call the qr fn to generate the qr-image*/
    var qr_img = qr.image(url, { type: "png" });
    qr_img.pipe(fs.createWriteStream("website_url.png"));

    /* so this below fn is only used to create another
    file and that used to save the url , there is no 
    relation with the above pipe stram of qr_image*/

    /* fs.writeFile("url-text.txt",url,(error)=>{
        if (error) {
            console.log("Error occured");
        }else{

            console.log("success");
        }
    })
    fs.close();
    */
  });
