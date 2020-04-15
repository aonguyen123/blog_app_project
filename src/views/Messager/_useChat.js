import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

export default function useChat() {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient('http://localhost:4000');

        socketRef.current.on('new-message', ({message}) => {    
            setMessages(messages => [...messages, message]);
        });

    }, []);

    const sendMessage = ({message}) => {
        socketRef.current.emit('new-message', {message});
    }

    return { messages, sendMessage };
}