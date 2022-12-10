import { stdin as input, stdout as output } from 'node:process'
import * as readline from 'node:readline/promises'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: 'Masukan API key dari OpenAI',
})

const openai = new OpenAIApi(configuration)

try {
  const rl = readline.createInterface({ input, output })
  const question = await rl.question('Masukan perintah: ')

  const P = ['\\', '|', '/', '-']
  let x = 0
  const loader = setInterval(() => {
    process.stdout.write(`\r${P[x++]}`)
    x %= P.length
  }, 250)

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 1024,
    temperature: 0.5,
    prompt: question,
  })

  clearInterval(loader)
  console.log(completion.data.choices[0].text)
  process.exit()
} catch (err) {
  if (err.response) {
    console.log(err.response.status)
    console.log(err.response.data)
  } else console.log(err.message)
}
