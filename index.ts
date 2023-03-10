#!/usr/bin/env node
import { Configuration, OpenAIApi } from 'openai';
import agent from 'https-proxy-agent';
import ora from 'ora';
import inquirer from 'enquirer';
import { prompts } from './prompts';

const { HttpsProxyAgent } = agent
const { prompt } = inquirer

const apiKey = process.env.OPENAI_API_KEY;

function checkIfApiConfig() {
  if (!apiKey) {
    console.log(`It appears that you haven't configured your API key. Please configure your API key by setting the environment variable OPENAI_API_KEY, for example:

    a. Run \`export OPENAI_API_KEY={your-key}\` directly. (Temporary)
    b. Add \`export OPENAI_API_KEY={your-key}\` to your \`~/.bashrc\` or \`~/zshrc\`, etc.`);
    process.exit(1);
  }
}

const selectPromptType = () =>
  prompt<{ promptType: string }>({
    type: 'select',
    message: 'Hi 👋! What can I do for you today?',
    name: 'promptType',
    choices: Object.keys(prompts),
  });

const userInput = () =>
  prompt<{ message: string }>({
    type: 'input',
    name: 'message',
    message: "What's on your mind?",
    initial: 'You can say bye to exit',
  });

async function main() {
  checkIfApiConfig();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const { promptType } = await selectPromptType();

  while (true) {
    const { message } = await userInput();

    if (message === 'bye') {
      process.exit(0)
    }

    const prompContent = prompts[promptType];

    const spinner = ora('🤖 is thinking...').start();

    try {
      const proxyOptions = process.env.https_proxy ? {
        proxy: false as const,
        httpsAgent: new HttpsProxyAgent(process.env.https_proxy),
      } : {}

      const completion = await openai.createChatCompletion(
        {
          model: 'gpt-3.5-turbo-0301',
          messages: [
            { role: 'system', content: prompContent },
            { role: 'user', content: message },
          ],
          max_tokens: 2048,
        },
        {
          ...proxyOptions
        }
      );

      spinner.stop();

      const resp = completion.data.choices[0].message?.content || '';

      console.log(resp)
    } catch (error) {
      spinner.stop();
      const e = error as any;
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      } else {
        console.log(e.message);
      }
    }
  }
}

process.on('unhandledRejection', () => {
  // do nothing
})

process.on('exit', () => {
  console.log('Bye bye')
})

main();
