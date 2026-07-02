from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import json
import asyncio

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "Cognee Python Service is Running"}

@app.websocket("/ws/cognee")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Node.js Backend connected to Python Cognee service")
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            # Extract incoming data
            chat_id = payload.get("chatId")
            text = payload.get("text")
            model = payload.get("model", "gpt-4o")
            workspace_dir = payload.get("workspaceDir", "")
            
            print(f"Received prompt for chat {chat_id}: {text}")

            # Static mock response as requested by user
            # We will stream the response back in chunks
            mock_reply = f"[Cognee FastAPI] Received your prompt: '{text}'. Currently using model '{model}' on workspace '{workspace_dir}'. Working on retrieving graph data..."
            words = mock_reply.split(" ")
            
            for i, word in enumerate(words):
                await asyncio.sleep(0.05) # Simulate processing time
                await websocket.send_text(json.dumps({
                    "type": "chat_stream",
                    "chatId": chat_id,
                    "chunk": word + " ",
                    "isLast": i == len(words) - 1
                }))
                
    except WebSocketDisconnect:
        print("Node.js Backend disconnected")
    except Exception as e:
        print(f"Error in websocket: {e}")
