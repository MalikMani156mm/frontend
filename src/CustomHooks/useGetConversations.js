import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useGetConversations = (query) => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/auth/users${query}` , {
                    credentials: 'include'});
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, [query]);

	return { loading, conversations };
};
export default useGetConversations;
