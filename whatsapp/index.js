const qrcode = require('qrcode-terminal');

const { Client ,Contact,LocalAuth,Buttons,MessageMedia} = require('whatsapp-web.js');
const client =new Client({
    authStrategy: new LocalAuth()
})

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});







// client.on('message', message => {
//   console.log('message from', message.from)
//       let button = new Buttons('Button body',[{ body:'bt1', url: "https://wa.me/c/918008696815"}],'title','footer');
//       client.sendMessage(message.from, button);
// });


client.initialize();
 


// const express = require("express");
const { google } = require("googleapis");

// const app = express();
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.post("/", async (req, res) => {

  let spreadsheetId = "1TWGDC0ukHUoyvDp1iMapDDoSmEA7Nqx6LoSw2ljM3U4";



async function authenticate(lis){

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    
 scopes : [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file'
  ]
  });

  // Create client instance for auth
  const gclient = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: gclient });



  async function addPermission(spreadsheetId) {

      drive = await google.drive({ version: "v3", auth: gclient });
      await drive.permissions.create({
          resource: {
              type: "user",
              role: "writer",
              emailAddress: "20pa1a5403@vishnu.edu.in",  
          },
          fileId: spreadsheetId,
          fields: "id",
      });
}



async function createSpreadsheet() {
  const spreadsheet = await googleSheets.spreadsheets.create({

      requestBody: {
          properties: {
              title: 'Demo Spreadsheet - 4',
          },
          sheets: [
              {
                  properties: {
                      title: 'Sheet1',
                      gridProperties: {
                          rowCount: 1,
                          columnCount: 7,
                      },
                  },
                  data: [
                      {
                          startRow: 0,
                          startColumn: 0,
                          rowData: {
                            values: [
                              {
                                  userEnteredValue: { stringValue: 'Mobile' },
                                  userEnteredFormat: {
                                    // backgroundColor: { red: 1 },
                                    textFormat: { bold: true, 
                                      // foregroundColor: { white: 1 }
                                     },
                                },
                              },
                              {
                                  userEnteredValue: { stringValue: 'Table' },
                                  userEnteredFormat: {
                                    // backgroundColor: { red: 1 },
                                    textFormat: { bold: true, 
                                      // foregroundColor: { white: 1 }
                                     },
                                },
                              },
                              {
                                  userEnteredValue: { stringValue: 'Products' },
                                  userEnteredFormat: {
                                    // backgroundColor: { red: 1 },
                                    textFormat: { bold: true, 
                                      // foregroundColor: { white: 1 }
                                     },
                                },
                              },
                              {
                                userEnteredValue: { stringValue: 'Quantity' },
                                userEnteredFormat: {
                                  // backgroundColor: { red: 1 },
                                  textFormat: { bold: true, 
                                    // foregroundColor: { white: 1 }
                                   },
                              },
                            },
                            {
                              userEnteredValue: { stringValue: 'Price' },
                              userEnteredFormat: {
                                // backgroundColor: { red: 1 },
                                textFormat: { bold: true, 
                                  // foregroundColor: { white: 1 } 
                                },
                            },
                          },
                          {
                            userEnteredValue: { stringValue: 'Total Price' },
                            userEnteredFormat: {
                              // backgroundColor: { red: 1 },
                              textFormat: { bold: true, 
                                // foregroundColor: { white: 1 }
                               },
                          },
                        },
                        {
                          userEnteredValue: { stringValue: 'Approval' },
                          userEnteredFormat: {
                            // backgroundColor: { red: 1 },
                            textFormat: { bold: true, 
                              // foregroundColor: { white: 1 }
                             },
                        },
                      },
                          ],

                          },
                      },
                  ],
              },
          ],
      },
  });
  console.log(`New spreadsheet created: ${spreadsheet.data.spreadsheetUrl}`);

  spreadsheetId = spreadsheet.data.spreadsheetId
  addPermission(spreadsheetId)
  append_details();

}






    /////  BATCH UPDATE
    async function checkbox(res2){
      console.log("+_+_++_+_+_+_+_+_+_+_+", res2.data.updates.updatedRange[8])





      const res1 = await googleSheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              repeatCell: {
                cell : {dataValidation: {
                  condition: {type: 'BOOLEAN'}
                }},
                fields : "*",
                range: {
                  endColumnIndex : 7,
                  endRowIndex: Number(res2.data.updates.updatedRange[8])+lis.length-1,
                  sheetId: 1873765832,
                  startColumnIndex: 6,
    
                  startRowIndex: Number(res2.data.updates.updatedRange[8])-1
                }
              },
            },
          ],
        },
      });
      console.log("success");
    }
    
    
    
    
    
    async function append_details(){
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:E",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: lis
        },
      }).then((res2)=>{
        console.log(res2);
      checkbox(res2, spreadsheetId)
      console.log(lis)
      }
      )
    }




    
if(spreadsheetId===""){
  console.log("***************", spreadsheetId)
  createSpreadsheet();
}

else{
  console.log("***************", spreadsheetId);
  append_details();
}


    




// async function get_data(){
//   await googleSheets.spreadsheets.values.get(
//     {
//       auth: auth,
//       spreadsheetId: spreadsheetId,
//       range: 'Sheet1!A:E',
//     },
//     (err, res) => {
//       if (err) {
//         console.error('The API returned an error.');
//         throw err;
//       }
//       console.log(res)
//       const rows = res.data.values;
//       if (rows.length === 0) {
//         create_header();
//         console.log('No data found.');
//         console.log("header is created")
//       } else {
//         console.log('OrderNo, Phone, Table, Items, Approval : ');
//         for (const row of rows) {
//           // Print columns A and E, which correspond to indices 0 and 4.
//           console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}`);
//         }
//       }
//     }
//   );
//   }

  // get_data();

  // console.log(res1);
//   res.send("Successfully submitted! Thank you!");
// });

// app.listen(5000, (req, res) => console.log("running on 5000"));


}






function checkLoation(rest_location,cus_location) {
  return ((rest_location.latitude.toFixed(3)==(cus_location.latitude).toString().split('.')[0]+"."+(cus_location.latitude).toString().split('.')[1].slice(0,3)) && rest_location.longitude.toFixed(3)==(cus_location.longitude).toString().split('.')[0]+"."+(cus_location.longitude).toString().split('.')[1].slice(0,3));
}

 let rest_location =  {
      latitude: 16.565,
      longitude: 81.521,
      description: undefined
                };
client.on('message',async message => {
  //console.log(message)
  if(message.type=='chat'){

      if(message.body.includes("Table Number is ")){

          console.log("is numb : ",Number.isInteger(message.body.slice(message.body.lastIndexOf(" "))))

          await message.star()

          console.log("Table Number : ",message.body.slice(message.body.lastIndexOf(" ")))
          message.reply(`Thank You for coming your Table_No : ${message.body.slice(message.body.lastIndexOf(" "))} please share your live location`);
      }
      else{
         //message.reply("--");          
      }
  }
  else if(message.type=='location'){ // fetching resturent location and check if the table is taken or not 

      if( message._data.isLive==true){

          let staredMsg ='';

          let n_chat = await client.getChatById(message.from);
          let mensajes_verificar = await n_chat.fetchMessages({limit:100});
          for (const n_chat_mensaje of mensajes_verificar) {
          if(n_chat_mensaje.isStarred){

              staredMsg = n_chat_mensaje.body
               
          }
          }
          // console.log(staredMsg)


              if(staredMsg!=''){
                  if(checkLoation(rest_location,message.location)){
                      let button = new Buttons('Okey',[{body:'Open Menu',url:'https://wa.me/c/918008696815' }]);
                          client.sendMessage(message.from,button);
      
      
                                  }
                      else{
                          message.reply("location not match")
                      } 

                    

              }
              else{
                   message.reply("Plese scan the QR code only")

              }
            
       }
       else{
          message.reply("Only live location is accepted")
       }
   }
   else if(message.type=="order"){

          let staredMsg ='';
          let res = {};

          let n_chat = await client.getChatById(message.from);
          let mensajes_verificar = await n_chat.fetchMessages({limit:100});
          for (const n_chat_mensaje of mensajes_verificar) {
          if(n_chat_mensaje.isStarred){
              staredMsg=n_chat_mensaje.body
              n_chat_mensaje.unstar();
          }
          }
          console.log("*********", staredMsg)
          res['Table_No']=staredMsg.slice(staredMsg.lastIndexOf(" "));
          message.getOrder().then((order)=>{


              let item_lis =[]
              let res_str = ''
              const tabe_no = staredMsg.slice(staredMsg.lastIndexOf(" ")+1);
              console.log("+++++++++++++++++++++++++++++++++++++++++++++", tabe_no)
              for(const item of order.products){
                res_str=res_str+"\n"+`${item.name} - ${item.quantity}`

                item_lis.push([
                    message.from,
                    tabe_no,
                    item.name,
                    item.quantity,
                    item.price,
                    order.total
                ])
            }
            res['total']=order.total;
            res['order_items']=res_str;
            res['phone']=message.from
            authenticate(item_lis)

            message.reply(`${res_str}\nYour order will be with you soon...`)

          })
   }

});


