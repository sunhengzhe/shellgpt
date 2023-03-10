# shellgpt

Generate shell commands with natural language using OpenAI.

![shellgpt]()

## Requirement

1. Set your openai API key to env variable.

```shell
export OPENAI_API_KEY={your-key}
```

2. For people in certain regions, it may be necessary to use a proxy to access OpenAI. In that case, you need to set the https_proxy environment variable as well.

```shell
export https_proxy={your-proxy-url}
```

## Usage

```bash
npx shellgpt
```

### Get your OpenAI API key

1. Sign in to https://platform.openai.com/account/api-keys
2. Click on the "Create new secret key" button.
3. Your API key will be displayed on the screen. Copy it and keep it in a secure place.

