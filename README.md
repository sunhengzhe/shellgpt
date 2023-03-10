# shellgpt

Generate shell commands with natural language using OpenAI.

![shellgpt](https://user-images.githubusercontent.com/8614151/224351481-e90d5591-1d0a-4c99-b109-8eeec387b6b4.gif)

## Usage

```bash
npx shellgpt

# or
npm i shellgpt -g
# then
shellgpt
```

## Requirement

1. Set your openai API key to env variable.

```shell
export OPENAI_API_KEY={your-key}
```

2. For people in certain regions, it may be necessary to use a proxy to access OpenAI. In that case, you need to set the https_proxy environment variable as well.

```shell
export https_proxy={your-proxy-url}
```

### Get your OpenAI API key

1. Sign in to https://platform.openai.com/account/api-keys
2. Click on the "Create new secret key" button.
3. Your API key will be displayed on the screen. Copy it and keep it in a secure place.

