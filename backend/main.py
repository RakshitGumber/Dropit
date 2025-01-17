import json
from dotenv import load_dotenv
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.summarize import summarize
from utils.gemini import chatbot
from utils.mailSender import sendMail

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://dropit-kappa.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: str = Form(...)):
    pipeline_dict = dict(json.loads(pipeline))
    num_nodes = len(pipeline_dict["nodes"])
    num_edges = len(pipeline_dict["edges"])

    nodes = pipeline_dict["nodes"]

    graph = {node["id"]: [] for node in nodes}

    for edge in pipeline_dict["edges"]:
        source = edge["source"]
        target = edge["target"]
        graph[source].append(target)

    def has_cycle(node, visited, rec_stack):
        visited[node] = True
        rec_stack[node] = True

        for neighbour in graph[node]:
            if not visited[neighbour]:
                if has_cycle(neighbour, visited, rec_stack):
                    return True
            elif rec_stack[neighbour]:
                return True

        rec_stack[node] = False
        return False

    visited = {node: False for node in graph}
    rec_stack = {node: False for node in graph}

    is_dag = not any(has_cycle(node, visited, rec_stack) for node in graph)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}


@app.post("/pipelines/summarize")
def summarize_pipeline(pipeline: str = Form(...)):
    text = summarize(pipeline)
    return {"summary": text}


@app.post("/pipelines/ai")
def ai_pipeline(pipeline: str = Form(...)):
    text = chatbot(pipeline)
    return {"summary": text}


@app.post("/pipelines/send-mail")
def send_mail(pipeline: str = Form(...)):
    pipeline_dict = dict(json.loads(pipeline))
    receiver = pipeline_dict["receiver"]
    subject = pipeline_dict["subject"]
    body = pipeline_dict["body"]
    sendMail(
        receiver,
        subject,
        body,
    )
    return {"message": "Email sent successfully"}

# push