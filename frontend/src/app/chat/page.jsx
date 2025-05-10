'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
import PageTransition from '@/components/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import { useAppContext } from '@/context/appcontext';

const ChatPage = () => {
  const { isLoggedIn, userType, userInfo } = useAppContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');
  const receiverId = searchParams.get('receiverId');
  const receiverName = searchParams.get('receiverName');

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [deletingContact, setDeletingContact] = useState(null);
  const [socket, setSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const typingTimeoutRef = useRef(null);

  const messageEndRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Set user as online
    if (userInfo?.id) {
      newSocket.emit('user_online', userInfo.id);
    }

    return () => {
      newSocket.disconnect();
    };
  }, [userInfo?.id]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
      // Add message to the messages list
      setMessages(prev => [...prev, data]);
      
      // Update contacts list without creating duplicates
      setContacts(prev => {
        const existingContactIndex = prev.findIndex(c => c.id === data.sender);
        
        if (existingContactIndex === -1) {
          fetchContacts();
          return prev;
        }

        const updatedContacts = [...prev];
        const updatedContact = {
          ...updatedContacts[existingContactIndex],
          lastMessage: data.message,
          lastMessageTime: data.timestamp,
          unread: updatedContacts[existingContactIndex].unread + 1,
          lastMessageSender: 'them'
        };

        updatedContacts.splice(existingContactIndex, 1);
        return [updatedContact, ...updatedContacts];
      });

      // Mark messages as read if chat is open
      if (selectedContact?.id === data.sender) {
        socket.emit('message_read', {
          userId: userInfo.id,
          contactId: data.sender
        });
      }
    });

    socket.on('contacts_update', (messages) => {
      // Process messages to update contacts
      const contactMap = new Map();
      
      messages.forEach(message => {
        const contactId = message.sender === userInfo.id ? message.receiver : message.sender;
        const contactName = message.sender === userInfo.id ? message.receiver.businessName || message.receiver.fullName : message.sender.businessName || message.sender.fullName;
        const contactType = message.sender === userInfo.id ? message.receiverType : message.senderType;
        
        if (!contactMap.has(contactId)) {
          contactMap.set(contactId, {
            id: contactId,
            name: contactName,
            type: contactType,
            lastMessage: message.message,
            lastMessageTime: message.timestamp,
            unread: message.receiver === userInfo.id && !message.read ? 1 : 0,
            lastMessageSender: message.sender === userInfo.id ? 'me' : 'them'
          });
        }
      });

      // Update contacts state
      setContacts(Array.from(contactMap.values())
        .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)));
    });

    socket.on('message_error', ({ error }) => {
      toast.error(error);
    });

    socket.on('typing', ({ userId }) => {
      setTypingUsers(prev => new Set([...prev, userId]));
    });

    socket.on('stop_typing', ({ userId }) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    socket.on('user_status_change', ({ userId, status }) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        if (status === 'online') {
          newSet.add(userId);
        } else {
          newSet.delete(userId);
        }
        return newSet;
      });
    });

    socket.on('messages_read', ({ userId }) => {
      // Update unread count for the contact
      setContacts(prev => prev.map(contact => 
        contact.id === userId ? { ...contact, unread: 0 } : contact
      ));
    });

    return () => {
      socket.off('receive_message');
      socket.off('contacts_update');
      socket.off('message_error');
      socket.off('typing');
      socket.off('stop_typing');
      socket.off('user_status_change');
      socket.off('messages_read');
    };
  }, [socket, selectedContact, userInfo?.id]);

  // Join/leave chat rooms when contact changes
  useEffect(() => {
    if (!socket || !selectedContact || !userInfo?.id) return;

    // Leave previous room if exists
    if (selectedContact) {
      socket.emit('leave_chat', {
        userId: userInfo.id,
        contactId: selectedContact.id
      });
    }

    // Join new room
    socket.emit('join_chat', {
      userId: userInfo.id,
      contactId: selectedContact.id
    });

    return () => {
      socket.emit('leave_chat', {
        userId: userInfo.id,
        contactId: selectedContact.id
      });
    };
  }, [socket, selectedContact, userInfo?.id]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/chat/contacts/${userInfo.id}`);
      const backendContacts = response.data.data || [];

      setContacts(backendContacts);

      if (receiverId && receiverName) {
        const exists = backendContacts.some(c => c.id === receiverId);
        if (!exists) {
          setContacts(prev => [...prev, {
            id: receiverId,
            name: receiverName,
            type,
            lastMessage: 'Start chatting',
            unread: 0
          }]);
        }
        
        setSelectedContact(prev => prev?.id === receiverId ? prev : {
          id: receiverId,
          name: receiverName,
          type
        });
      }
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setContactsLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!selectedContact || !userInfo?.id) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/chat/messages/${userInfo.id}/${selectedContact.id}`
      );
      setMessages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [userInfo?.id, receiverId, receiverName, type]);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages();
    }
  }, [selectedContact]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    router.replace('/chat');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact || !userInfo?.id || !socket) return;

    const messageData = {
      sender: userInfo.id,
      senderType: userType === 'business' ? 'Business' : 'Partner',
      receiver: selectedContact.id,
      receiverType: selectedContact.type === 'business' ? 'Business' : 'Partner',
      message: newMessage,
      timestamp: new Date()
    };

    // Optimistic update
    const tempId = Date.now().toString();
    const optimisticMessage = {
      ...messageData,
      _id: tempId,
      isSent: true,
      sender: { _id: userInfo.id, [userType === 'business' ? 'businessName' : 'fullName']: userInfo.name },
      receiver: { _id: selectedContact.id, [selectedContact.type === 'business' ? 'businessName' : 'fullName']: selectedContact.name }
    };

    setMessages(prev => [...prev, optimisticMessage]);
    setNewMessage('');

    try {
      // Emit socket event with message data
      socket.emit('send_message', messageData);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      setMessages(prev => prev.filter(msg => msg._id !== tempId));
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Add delete contact function
  const handleDeleteContact = async (contactId) => {
    if (!userInfo?.id || !contactId) return;
    
    try {
      setDeletingContact(contactId);
      await axios.delete(`http://localhost:5000/chat/contact/${userInfo.id}/${contactId}`);
      
      // Remove contact from state
      setContacts(prev => prev.filter(c => c.id !== contactId));
      
      // If the deleted contact was selected, clear selection
      if (selectedContact?.id === contactId) {
        setSelectedContact(null);
        setMessages([]);
      }
      
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    } finally {
      setDeletingContact(null);
    }
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!socket || !selectedContact || !userInfo?.id) return;

    socket.emit('typing', {
      userId: userInfo.id,
      contactId: selectedContact.id
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', {
        userId: userInfo.id,
        contactId: selectedContact.id
      });
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 py-6">
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>

        <FadeIn>
          <div className="max-w-6xl mx-auto mt-14 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex h-[calc(100vh-180px)]">
              {/* Contacts Sidebar */}
              <div className="w-1/4 border-r border-gray-200 bg-gray-50">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-700">Contacts</h2>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-248px)]">
                  {contactsLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No conversations yet
                    </div>
                  ) : (
                    contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-4 border-b border-gray-200 hover:bg-orange-50 transition-colors flex items-center ${selectedContact?.id === contact.id ? 'bg-orange-100' : ''}`}
                      >
                        <div 
                          className="flex-1 cursor-pointer flex items-center"
                          onClick={() => handleContactSelect(contact)}
                        >
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-semibold mr-3">
                              {contact.name.charAt(0).toUpperCase()}
                            </div>
                            {onlineUsers.has(contact.id) && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                              {contact.unread > 0 && (
                                <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                                  {contact.unread}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteContact(contact.id);
                          }}
                          disabled={deletingContact === contact.id}
                          className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                          title="Delete contact"
                        >
                          {deletingContact === contact.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedContact ? (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-white flex items-center">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-semibold mr-3">
                          {selectedContact.name.charAt(0).toUpperCase()}
                        </div>
                        {onlineUsers.has(selectedContact.id) && (
                          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedContact.name}</h3>
                        <p className="text-xs text-gray-500">
                          {selectedContact.type === 'business' ? 'Business Owner' : 'Partner'}
                          {typingUsers.has(selectedContact.id) && ' • typing...'}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                      {loading ? (
                        <div className="flex justify-center items-center h-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
                          <p className="text-gray-500 max-w-xs">
                            Send a message to connect with {selectedContact.name}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {messages.map((msg) => {
                            const isSender = msg.sender === userInfo.id;
                            const senderName = isSender 
                              ? userInfo.name 
                              : msg.sender.businessName || msg.sender.fullName;

                            return (
                              <div
                                key={msg._id}
                                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`max-w-[70%] ${isSender ? 'order-2' : 'order-1'}`}>
                                  <div
                                    className={`rounded-2xl px-4 py-2 ${
                                      isSender
                                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                    }`}
                                  >
                                    <p className="break-words">{msg.message}</p>
                                    <div className={`flex items-center mt-1 text-xs ${
                                      isSender ? 'text-orange-100' : 'text-gray-500'
                                    }`}>
                                      <span>{formatTime(msg.timestamp)}</span>
                                      {isSender && (
                                        <span className="ml-2">
                                          {msg.read ? '✓✓' : '✓'}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className={`text-xs mt-1 ${
                                    isSender ? 'text-right' : 'text-left'
                                  } text-gray-500`}>
                                    {senderName}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div ref={messageEndRef} />
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => {
                            setNewMessage(e.target.value);
                            handleTyping();
                          }}
                          placeholder="Type your message..."
                          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-r-lg hover:shadow-md transition-all duration-200"
                          disabled={!newMessage.trim()}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500 max-w-xs">
                      Choose a contact from the list to start chatting
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
};

export default ChatPage;