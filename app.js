import { channel } from "diagnostics_channel";
import { config  } from "dotenv";
config()


import { Configuration, OpenAIApi} from "openai"
import readline from 'readline' ;

const openai = new OpenAIApi( new Configuration ({
    apiKey : process.env.APIKEY
}))

let new_message = []
const rl = readline.createInterface(
        process.stdin, process.stdout);
 
rl.prompt();
rl.on('line', async (input) => {
    new_message.push({"role": "user", "content": input})
    const res = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        messages : new_message
      })

      let chat_response = res.data.choices[0].message.content
    //   new_message.push({"role": "assistant", "content": chat_response}) ADD THIS TO MAKE IT CONVERSATIONAL/INTERACTIVE

      console.log(chat_response)
      rl.prompt()
});
