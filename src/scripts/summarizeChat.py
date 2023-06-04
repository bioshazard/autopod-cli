# https://python.langchain.com/en/latest/modules/chains/index_examples/summarize.html
import os
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain

def doSummary(docs, mapReducePrompts, maxTokens=512, temp=0.3):
    from langchain.chat_models import ChatOpenAI

    llm = ChatOpenAI(max_tokens=maxTokens, temperature=temp, model_name="gpt-3.5-turbo")

    MAP_PROMPT=PromptTemplate(template=mapReducePrompts['map'], input_variables=["text"])
    REDUCE_PROMPT=PromptTemplate(template=mapReducePrompts['reduce'], input_variables=["text"])
    chain = load_summarize_chain(
        llm,
        chain_type="map_reduce",
        map_prompt=MAP_PROMPT,
        combine_prompt=REDUCE_PROMPT,
        verbose=True
    )
    return chain.run(docs)


transcript_file = os.getenv("TRANSCRIPT_FILE")
with open(transcript_file, encoding="utf-8") as f:
    transcript_text = f.read()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 3000,
    chunk_overlap  = 200,
    length_function = len,
)

docs = text_splitter.create_documents([transcript_text])
print("Docs array length:", len(docs))

mapReducePrompts = {
    "podDesc": {
        "v1": {
            "map": "\n\n\n".join([ "{text}", "GIVEN THE ABOVE, PROVIDE A DESCRIPTIVE SUMMARY AND EXTRACT A SINGLE CONCISE TOPIC LABEL ASSOCIATED TIMESTAMP THAT BEST CHARACTERIZES IT. LABEL THE OUTPUTS 'Summary' and 'Topic and Start Time':" ]),
            "reduce": "\n\n\n".join([ "{text}", "GIVEN THE ABOVE SUMMARIES AND TIMESTAMP BULLETS, PROVIDE A DESCRIPTIVE EPISODE TITLE, AND A CONCISE DESCRIPTIVE PODCAST EPISODE DESCRIPTION, AND A CONSOLIDATED BULLET LIST OF ONLY THE MOST REPRESENTATIVE CONCISE TOPICS WITH ASSOCIATED TIMESTAMP THROUGHOUT THE EPISODE SECTIONS (combine similar topics to the earliest, timestamp format hh:mm:ss):" ]),
        },
        "v2": {
            "map": "\n\n\n".join([ "{text}", "GIVEN THE ABOVE, EXTRACT A SINGLE TOPIC LABEL ASSOCIATED TIMESTAMP THAT BEST CHARACTERIZES IT WITH FORMAT '# <TOPIC> <TIMESTAMP>'. FOLLOWED ON THE NEXT LINE BY A DESCRIPTIVE SUMMARY:" ]),
            "reduce": "\n\n\n".join([ "{text}", "GIVEN THE ABOVE '# <TOPIC> <TIMESTAMP>' DELINIATED EPISODE SECTIONS, PROVIDE A DESCRIPTIVE EPISODE TITLE, A CONCISE DESCRIPTIVE PODCAST EPISODE DESCRIPTION, AND A CONSOLIDATED BULLET LIST OF AT MOST 10 REPRESENTATIVE 2-WORD-MAXIMUM 'Hot Timestamps' FROM THROUGHOUT THE EPISODE BASED ON THE TOPIC HEADER OF EACH SECTION WITH BULLET FORMAT '- <HH:MM:SS TIMESTAMP> <2-WORD-MAXIMUM TOPIC>'" ]),
        }
    }
}

summary = doSummary(docs, mapReducePrompts=mapReducePrompts["podDesc"]["v2"], temp=0.3)
print(summary)
