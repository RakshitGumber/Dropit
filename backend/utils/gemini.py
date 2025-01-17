from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()


def chatbot(text: str) -> str:

    genai.configure(api_key=os.environ["GEMINI_API_KEY"])

    # Create the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash-exp",
        generation_config=generation_config,  # type: ignore
    )

    chat_session = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [text],
            },
        ]
    )

    response = chat_session.send_message(text)
    return response.text
