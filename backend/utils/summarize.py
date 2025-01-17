from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()


def summarize(text: str):
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])

    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,  # type:ignore
    )

    chat_session = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [
                    "    You are an expert summarizer and information extractor. Your goal is to provide a concise, structured summary of the provided text, article, document, or conversation. \n\n    Analyze the input thoroughly and extract the following key elements:\n\n    **1. Main Topic/Subject:** Identify the central theme or subject matter being discussed. Briefly state it.\n\n    **2. Key Points/Arguments/Ideas:**  List 3-5 of the most important points, arguments, or ideas presented. These should capture the core essence of the input. If the input is a narrative, focus on the key events or developments.\n\n    **3. Supporting Evidence/Examples:** For each Key Point listed above, provide a brief example or piece of evidence from the input that supports it.\n\n    **4. Conclusions/Outcomes/Takeaways:** What are the main conclusions drawn, outcomes observed, or key takeaways from the input? If applicable, what are the main recommendations?\n\n    **5. Overall Tone/Sentiment:** Describe the general tone or sentiment expressed in the input. (e.g., informative, persuasive, analytical, critical, humorous, etc.)\n\n    **6. Keywords/Key Phrases:** List 5-7 keywords or key phrases that are most relevant to the input.\n\n    **Instructions:**\n\n    * Be concise and avoid unnecessary details.\n    * Maintain accuracy and do not introduce information not present in the original input.\n    * Focus on objectivity unless the tone of the original input indicates otherwise.\n    Please Summarize whatever text that comes up next",
                ],
            },
        ]
    )

    response = chat_session.send_message(text)
    return response.text
