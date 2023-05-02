import { Configuration, OpenAIApi } from "openai";

const generateTweet = async () => {
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Can you generate a motivational tweet about bananas",
        max_tokens: 280
    });
    console.log(completion.data.choices[0].text);
};

generateTweet();
