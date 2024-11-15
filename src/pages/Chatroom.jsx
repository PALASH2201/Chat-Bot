'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"
import { generateResponse } from '@/config/api-config'

const Chatroom = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: 'bot' }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    }
    setMessages(prevMessages => [...prevMessages, newUserMessage])
    setInputMessage('');

    try {
      // Await the response from generateResponse
      const response = await generateResponse(inputMessage);
      const botResponse = {
        id: messages.length + 2,
        text: response, 
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, botResponse])
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { id: messages.length + 2, text: "Oops! Something went wrong.", sender: 'bot' }
      ])
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Bot</h1>
      <ScrollArea className="flex-grow mb-4 border rounded-md p-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground ml-auto' 
                : 'bg-muted'
            } max-w-[80%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            {message.text}
          </div>
        ))}
      </ScrollArea>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Chatroom;
