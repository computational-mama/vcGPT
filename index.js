import fetch from 'node-fetch';
import express from "express";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import * as "gpt.js"
dotenv.config();
const port = process.env.PORT || "8080";
var appExpress = express();
// For parsing application/json
appExpress.use(express.json());

// For parsing application/x-www-form-urlencoded
appExpress.use(express.urlencoded({ extended: true }));

appExpress.use(express.static("public"));
appExpress.use(express.static("src"));


appExpress.post("/api", (request, response, next) => {
    console.log("i got a request");
    console.log(request.body);
  
    const vcPrompt = request.body;
    let prompt1 = vcPrompt.p1;
    // let prompt2 = text2img.p2;
    console.log(prompt1);
    // next();
    var gptResponse
    var refArr =[]
    var answer = callApi(prompt1).then((dataprompt) => {
        gptResponse = dataprompt.output.output_text;
        refArr =  dataprompt.output.references
        // refArrforEach(element => {
        //     console.log(element.url,element.title)
        // });
        // console.log(gptResponse)
        response.send({
          promptres:gptResponse,
          promptref: refArr

        });
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  
  });
  // Server setup
  appExpress.listen(port, () => {
    console.log("server running");
  });

async function callApi(p) {
  const response = await fetch("https://api.gooey.ai/v2/google-gpt/", {
    method: "POST",
    headers: {
        "Authorization": "Bearer "+ process.env.GOOEY_API_KEY,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "search_query": p + " as a venture capitalist",
      "site_filter": "",
      "task_instructions": "Generate a comprehensive and factoid Answer the for the following Question solely based on the provided web Search Results. You must only use information from the provided Search Results. Use an unbiased, succinct but funny tone. Answer in 150-180 words only. Don't add the citation number or footnote or any generic strings like `[1]`. Use this current date and time: {{ datetime.utcnow }}. Combine search results together into a coherent answer. Cite the most relevant results that answer the question accurately. If different results refer to different entities with the same name, write separate answers for each entity. Politely refuse to answer any question that is about politics, current events, wars, drugs, religion, legislation, or any controversial topics. Add a relevant and witty emoji at the end of the response",
      "selected_model": "gpt_4"
    // "selected_model": "gpt_3_5_turbo"
    }),
  });

  const data = await response.json();

  console.log(response.status, data.output.output_text);
  return data
}

// callApi();