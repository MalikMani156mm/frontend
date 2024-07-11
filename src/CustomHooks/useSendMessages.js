import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
				method: "POST",
                credentials: 'include',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			const newMessage = data.newMessage;

			setMessages([...messages, newMessage]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return [ loading, sendMessage]  ;
};
export default useSendMessage;
