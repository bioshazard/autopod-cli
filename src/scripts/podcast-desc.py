# https://python.langchain.com/en/latest/modules/chains/index_examples/summarize.html
import os
from langchain import OpenAI, PromptTemplate, LLMChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.mapreduce import MapReduceChain
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.chains.summarize import load_summarize_chain

llm = OpenAI(temperature=0, max_tokens=512)

transcript_file = os.getenv("TRANSCRIPT_FILE")
with open(transcript_file, encoding="utf-8") as f:
    transcript_text = f.read()

text_splitter = RecursiveCharacterTextSplitter(
    # Set a really small chunk size, just to show.
    chunk_size = 3000,
    chunk_overlap  = 200,
    length_function = len,
)

docs = text_splitter.create_documents([transcript_text])
print("Docs array length:", len(docs))

# "Get best topic from each list"
# "Count how many sections there are, label them"


summary_and_bullets = "\n\n\n".join([
    "{text}",
    "GIVEN THE ABOVE, PROVIDE A DESCRIPTIVE SUMMARY AND EXTRACT A SINGLE SHORT TOPIC LABEL ASSOCIATED TIMESTAMP THAT BEST CHARACTERIZES IT. LABEL THE OUTPUTS 'Summary' and 'Topic and Start Time':"
])
PROMPTsab = PromptTemplate(template=summary_and_bullets, input_variables=["text"])

podcast_description = "\n\n\n".join([
    "{text}",
    "GIVEN THE ABOVE SUMMARIES AND TIMESTAMP BULLETS, PROVIDE A DESCRIPTIVE EPISODE TITLE, AND A CONCISE DESCRIPTIVE PODCAST EPISODE DESCRIPTION, AND A BULLET LIST OF THE BEST REPRESENTATIVE TOPICS WITH ASSOCIATED TIMESTAMP THROUGHOUT THE EPISODE SECTIONS:"
])
PROMPTpd = PromptTemplate(template=podcast_description, input_variables=["text"])

chain = load_summarize_chain(
    llm,
    chain_type="map_reduce", 
    map_prompt=PROMPTsab, 
    combine_prompt=PROMPTpd,
    verbose=True
)
result = chain.run(docs)

print(result)
