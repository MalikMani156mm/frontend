import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/message/get/${selectedConversation._id}` , {
                    credentials: 'include'});
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) {
			getMessages()
		};
	}, [selectedConversation?._id, setMessages]);

	return [ loading , messages ];
};
export default useGetMessages;