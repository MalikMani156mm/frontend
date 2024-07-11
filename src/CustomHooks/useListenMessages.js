import { useEffect } from "react";
import { useSocketContext } from "../Redux/Context/socketContext"
import useConversation from "../zustand/useConversation";
import notificationSound from '../Assets/notification.mp3';

const useListenMessages = ()=>{
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            setMessages([...messages,newMessage]);
			const sound = new Audio(notificationSound);
			sound.play().catch(error => {
                console.error("Error playing sound:", error);
            });;
        })
        
        return()=> socket?.off("newMessage");
    },[socket,setMessages,messages])
}

export default useListenMessages; 