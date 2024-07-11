import React, { useEffect, useRef } from 'react';
import styles from "./MessageContainer.module.css";
import Message from "../../Components/Messages/Message.jsx";
import useGetMessages from '../../CustomHooks/useGetMessages.js';
import MessageSkeleton from '../../Components/Messages/MessageSkeleton.jsx';
import useListenMessages from '../../CustomHooks/useListenMessages.js';


const Messages = () => {

	const [loading, messages] = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: 'end' });
		}, 1);
	}, [messages]);

	return (
		<div className={`px-4 ${styles['flex-1']} ${styles['overflow-auto']}`}>
			{!loading  && messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
			{
				loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
			}
			{!loading &&  messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}

		</div>
	)
}

export default Messages