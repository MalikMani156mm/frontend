import React, { useEffect, useState } from 'react';
import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Conversation from "../../Components/SideBar/Conversation.jsx";
import useGetConversations from '../../CustomHooks/useGetConversations.js';
import { Spinner } from 'react-bootstrap';

const Conversations = () => {

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(`?search=`);
  const [submitted, setSubmitted] = useState(false);

  const { loading, conversations } = useGetConversations(query);

  useEffect(() => {
    if (!submitted) {
      const delayDebounceFn = setTimeout(() => {
        setQuery(`?search=${search}`);
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [search, submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    setQuery(`?search=${search}`);
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
    }
  }, [submitted, query]);

  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
        <input
          type="text"
          placeholder="Search…"
          className="form-control rounded-pill"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className={`btn ${styles['btn-circle']} ${styles['bg-sky-500']} text-white`}
        >
          <FontAwesomeIcon icon={faSearch} className="w-100 h-100" />
        </button>
      </form>
      <div className={styles.divider}></div>
      <div className={` d-flex flex-column ${styles['overflow-auto']}`}>
        {loading ? <div className={styles.spinnerDiv}> <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="mr-2"
        /> </div> : (
          <>
            {conversations.length > 0 ? (
              conversations.map((conversation, idx) => (
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  lastIndex={idx === conversations.length - 1}
                />
              ))
            ) : (
              <div className={styles.noConversations}>
                <p>No conversations found.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Conversations;