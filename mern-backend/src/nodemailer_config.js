import {createTransport} from 'nodemailer'
//import { google } from 'googleapis';
import dotenv from "dotenv";



dotenv.config();
//const OAuth2Credential = new google.auth.OAuth2(process.env.ID_CLIENTE, process.env.ID_SECRET, process.env.URI_REDIRECT)

//OAuth2Credential.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

export const enviarEmail = async (destinatario, codigo)=>{
  try {
    //const accessToken = await OAuth2Credential.getAccessToken()
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASSUSER,
      }
    });

    const verificacion = await transporter.verify()
    console.log("listo para enviar emails: ", verificacion)
    
    
    const result = await transporter.sendMail({
      from: `"free database" <${process.env.USER}>`,
      to: destinatario,
      subject: "Reseteo de contraseña",
      html: `<h1>El codigo solicitado es ${codigo}</h1>`

    })
    return result
  } catch (error) {
    console.log(error)
  }
}

  //transporter.verify().then(()=>{console.log("listo para enviar emails")})

