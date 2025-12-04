import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { io } from 'socket.io-client';
import { format } from 'date-fns';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { API_BASE } from '../../config';
import { themeConfig } from '../../theme/themeConfig';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(API_BASE, {
      withCredentials: true,
    });

    // Join chat when component mounts
    if (user) {
      socketRef.current.emit('join', {
        _id: user._id,
        name: user.name,
        profilePicture: user.profilePicture,
      });
    }

    // Listen for previous messages
    socketRef.current.on('previous-messages', (data) => {
      // Support both array and object formats
      if (Array.isArray(data)) {
        setMessages(data);
        setHasMore(false); // No pagination info from socket
      } else if (data && data.messages) {
        setMessages(data.messages);
        if (data.pagination) {
          setHasMore(data.pagination.page < data.pagination.pages);
        }
      }
      setLoading(false);
      setConnectionStatus('connected');
      setError(null);
    });

    // Handle connection errors
    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setError('Failed to connect to chat server');
      setConnectionStatus('error');
      setLoading(false);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setConnectionStatus('disconnected');
      if (reason === 'io server disconnect') {
        setError('Connection lost. Please refresh the page.');
      }
    });

    socketRef.current.on('connect', () => {
      setConnectionStatus('connected');
      setError(null);
    });

    // Listen for new messages
    socketRef.current.on('new-message', (message) => {
      if (message) {
        setMessages((prev) => {
          // Check if message already exists to prevent duplicates
          const messageExists = prev.some(msg => msg._id === message._id);
          if (messageExists) {
            return prev;
          }
          return [...prev, message];
        });
        markMessageAsRead(message._id);
      }
    });

    // Listen for online users
    socketRef.current.on('online-users', (users) => {
      if (Array.isArray(users)) {
        setOnlineUsers(users);
      }
    });

    // Listen for typing indicators
    socketRef.current.on('user-typing', (userData) => {
      if (userData && userData._id !== user._id) {
        setIsTyping(true);
      }
    });

    socketRef.current.on('user-stop-typing', (userData) => {
      if (userData && userData._id !== user._id) {
        setIsTyping(false);
      }
    });

    // Listen for message updates (edits, reactions, etc.)
    socketRef.current.on('message-updated', (updatedMessage) => {
      if (updatedMessage) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === updatedMessage._id ? updatedMessage : msg
          )
        );
      }
    });

    // Listen for message-deleted
    socketRef.current.on('message-deleted', (data) => {
      if (data && data._id) {
        setMessages((prev) => prev.filter((msg) => msg._id !== data._id));
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user]);

  // Load more messages when scrolling up
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loading) {
        loadMoreMessages();
      }
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (messagesEndRef.current) {
      observerRef.current.observe(messagesEndRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [messages, hasMore, loading, loadMoreMessages]);

  const loadMoreMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE}/api/chat/messages?page=${page + 1}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      setMessages((prev) => [...data.messages, ...prev]);
      setPage((prev) => prev + 1);
      setHasMore(data.pagination.page < data.pagination.pages);
    } catch (error) {
      console.error('Error loading more messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' && attachments.length === 0) return;
    if (sendingMessage) return; // Prevent multiple submissions

    setSendingMessage(true);
    const messageText = newMessage.trim();
    const currentAttachments = [...attachments];
    
    // Clear form immediately
    setNewMessage('');
    setAttachments([]);
    setReplyTo(null);
    setShowEmojiPicker(false);

    const formData = new FormData();
    formData.append('message', messageText);
    if (replyTo) {
      formData.append('replyTo', replyTo._id);
    }
    currentAttachments.forEach((file) => {
      formData.append('attachments', file);
    });

    try {
      const response = await fetch(`${API_BASE}/api/chat/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        // Restore the message if sending failed
        setNewMessage(messageText);
        setAttachments(currentAttachments);
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Restore the message if sending failed
      setNewMessage(messageText);
      setAttachments(currentAttachments);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleTyping = () => {
    if (!socketRef.current) return;
    
    socketRef.current.emit('typing', {
      _id: user._id,
      name: user.name,
    });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit('stop-typing', {
        _id: user._id,
        name: user.name,
      });
    }, 1000);
  };

  const handleMessageActions = (message, event) => {
    setSelectedMessage(message);
    setAnchorEl(event.currentTarget); // Use the button as anchor
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;
    try {
      await fetch(`${API_BASE}/api/chat/messages/${selectedMessage._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== selectedMessage._id)
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleEditMessage = async () => {
    if (!selectedMessage || !editText.trim()) return;
    
    console.log('Editing message:', {
      messageId: selectedMessage._id,
      currentUser: user._id,
      messageSender: selectedMessage.sender._id,
      isOwnMessage: selectedMessage.sender._id === user._id
    });
    
    try {
      const response = await fetch(`${API_BASE}/api/chat/messages/${selectedMessage._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ message: editText.trim() }),
      });
      
      if (response.ok) {
        const updatedMessage = await response.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === selectedMessage._id ? { ...msg, ...updatedMessage } : msg
          )
        );
        console.log('Message edited successfully');
      } else {
        const errorData = await response.text();
        console.error('Failed to edit message:', response.status, response.statusText, errorData);
      }
    } catch (error) {
      console.error('Error editing message:', error);
    }
    setEditingMessage(null);
    setEditText('');
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const startEditing = (message) => {
    setEditingMessage(message);
    setEditText(message.message);
    setAnchorEl(null);
  };

  const markMessageAsRead = async (messageId) => {
    try {
      await fetch(`${API_BASE}/api/chat/messages/${messageId}/read`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Scroll to bottom when component mounts or when new messages arrive
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Scroll immediately when component mounts
    scrollToBottom();

    // Also scroll when new messages are added
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  // Force scroll to bottom when chat is first loaded
  useEffect(() => {
    if (!loading && messages.length > 0) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [loading, messages.length]);

  // Fix logo import for Avatar
  const logoUrl = '/Logo.png';

  // Modern, elegant chat header
  const ChatHeader = () => (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        mb: 0,
        background: 'linear-gradient(135deg, #00C6A7 0%, #009e87 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 12px rgba(0, 198, 167, 0.15)',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        }
      }}
    >
      <Box display="flex" alignItems="center" gap={{ xs: 1.5, sm: 2 }}>
        <Box
          sx={{
            width: { xs: 44, sm: 48 },
            height: { xs: 44, sm: 48 },
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Avatar
            src={logoUrl}
            sx={{ 
              width: { xs: 36, sm: 40 }, 
              height: { xs: 36, sm: 40 },
              border: 'none',
            }}
          />
        </Box>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800,
              color: '#fff',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              letterSpacing: '-0.02em',
              mb: 0.25,
            }}
          >
            KampusKart Chat
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                },
              }}
            />
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                fontSize: '0.75rem',
              }}
            >
              {onlineUsers.length} {onlineUsers.length === 1 ? 'person' : 'people'} online
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // Enhanced message bubble
  const renderMessage = (message) => {
    if (!message) return null;
    if (!message.sender) return null;
    const isOwnMessage = message.sender._id === user._id;
    const hasReactions = message.reactions && message.reactions.length > 0;
    const isRead = message.readBy && message.readBy.some((r) => r.user._id === user._id);
    return (
      <ListItem
        key={message._id}
        alignItems="flex-start"
        sx={{
          flexDirection: isOwnMessage ? 'row-reverse' : 'row',
          position: 'relative',
          mb: 1.5,
        }}
        disableGutters
      >
        <ListItemAvatar sx={{ minWidth: 48 }}>
          <Avatar
            src={
              typeof message.sender.profilePicture === 'string'
                ? message.sender.profilePicture
                : message.sender.profilePicture?.url
            }
            alt={message.sender.name}
            sx={{ 
              border: isOwnMessage ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid #e5e7eb',
              width: { xs: 40, sm: 44 },
              height: { xs: 40, sm: 44 },
              boxShadow: isOwnMessage 
                ? '0 2px 8px rgba(0, 198, 167, 0.2)' 
                : '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          />
        </ListItemAvatar>
        <Box 
          sx={{
            bgcolor: isOwnMessage ? 'linear-gradient(135deg, #00C6A7 0%, #009e87 100%)' : '#ffffff',
            background: isOwnMessage ? 'linear-gradient(135deg, #00C6A7 0%, #009e87 100%)' : '#ffffff',
            border: isOwnMessage ? 'none' : '1px solid #e5e7eb',
            borderRadius: isOwnMessage ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            p: { xs: 1.5, sm: 1.75 },
            minWidth: 120,
            maxWidth: { xs: '80%', sm: 420 },
            boxShadow: isOwnMessage 
              ? '0 4px 12px rgba(0, 198, 167, 0.25)' 
              : '0 2px 8px rgba(0, 0, 0, 0.06)',
            ml: isOwnMessage ? 0 : { xs: 0.5, sm: 1 },
            mr: isOwnMessage ? { xs: 0.5, sm: 1 } : 0,
            position: 'relative',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: isOwnMessage 
                ? '0 6px 16px rgba(0, 198, 167, 0.35)' 
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          {editingMessage?._id === message._id ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                variant="outlined"
                size="small"
                multiline
                maxRows={3}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.875rem',
                    padding: '4px 8px',
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  onClick={() => {
                    setEditingMessage(null);
                    setEditText('');
                  }}
                  sx={{ fontSize: '0.75rem', px: 1, py: 0.5 }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleEditMessage}
                  disabled={!editText.trim() || editText.trim() === message.message}
                  sx={{ fontSize: '0.75rem', px: 1, py: 0.5 }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography 
              variant="body2" 
              sx={{ 
                wordBreak: 'break-word',
                color: isOwnMessage ? '#ffffff' : '#1f2937',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              {message.message}
              {message.edited && (
                <Typography 
                  component="span" 
                  variant="caption" 
                  sx={{ 
                    ml: 1,
                    color: isOwnMessage ? 'rgba(255, 255, 255, 0.7)' : '#6b7280',
                    fontSize: '0.75rem',
                    fontStyle: 'italic',
                  }}
                >
                  (edited)
                </Typography>
              )}
            </Typography>
          )}
          {message.attachments && message.attachments.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {message.attachments.map((attachment, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  {attachment.type === 'image' ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      style={{ maxWidth: '180px', borderRadius: '8px', boxShadow: '0 2px 8px #eee' }}
                    />
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {attachment.name}
                    </Button>
                  )}
                </Box>
              ))}
            </Box>
          )}
          {hasReactions && (
            <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
              {message.reactions.map((reaction, index) => (
                <Tooltip key={index} title={reaction.user.name} placement="top">
                  <Typography component="span" variant="caption" sx={{ bgcolor: '#f1f1f1', px: 0.5, borderRadius: 1, fontSize: 18 }}>
                    {reaction.emoji}
                  </Typography>
                </Tooltip>
              ))}
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {message.sender.name}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {format(new Date(message.timestamp), 'HH:mm')}
            </Typography>
            {isOwnMessage && (
              <Typography variant="caption" color={isRead ? 'primary.main' : 'text.disabled'}>
                {isRead ? 'Read' : 'Sent'}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Action Button for Own Messages */}
        {isOwnMessage && (
          <IconButton
            size="small"
            onClick={(e) => handleMessageActions(message, e)}
            sx={{ 
              position: 'absolute', 
              top: 4, 
              left: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '50%',
              width: 28,
              height: 28,
              opacity: 0.8,
              transition: 'all 0.2s ease-in-out',
              zIndex: 10,
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 1)',
                opacity: 1,
                transform: 'scale(1.05)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)'
              }
            }}
          >
            <MoreVertIcon fontSize="small" sx={{ color: '#555' }} />
          </IconButton>
        )}

      </ListItem>
    );
  };

  useEffect(() => {
    if (anchorEl && !document.body.contains(anchorEl)) {
      setAnchorEl(null);
      setSelectedMessage(null);
    }
  }, [anchorEl, messages]);

  // Error state
  if (error && (!messages || messages.length === 0)) {
    return (
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f7f7fa',
          overflow: 'hidden',
          height: '100vh',
          minHeight: 0,
          pt: '64px',
        }}
      >
        {/* Chat Header during error */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 0,
            bgcolor: '#fff',
            borderRadius: '0 0 16px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: 'none',
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={logoUrl}
              sx={{ bgcolor: 'error.main', width: 40, height: 40 }}
            />
            <Box>
              <Typography variant="h6" fontWeight={700} color="error.main">
                KampusKart Chat
              </Typography>
              <Typography variant="caption" color="error.main">
                Connection Error
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Error Content */}
        <Box 
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'error.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img 
                src={logoUrl} 
                alt="KampusKart" 
                style={{ 
                  width: '50px', 
                  height: '50px',
                  filter: 'brightness(0) invert(1)',
                }} 
              />
            </Box>
            
            <Typography variant="h6" fontWeight={600} color="error.main">
              Connection Failed
            </Typography>
            
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {error}
            </Typography>
          </Box>

          <Button 
            variant="contained" 
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry Connection
          </Button>
        </Box>
      </Box>
    );
  }

  if (loading && (!messages || messages.length === 0)) {
    return (
      <Box 
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#212B36',
          overflow: 'hidden',
          height: '100vh',
          minHeight: 0,
          pt: '64px',
        }}
      >
        {/* Chat Header during loading */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 0,
            bgcolor: '#fff',
            borderRadius: '0 0 16px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: 'none',
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={logoUrl}
              sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}
            />
            <Box>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                KampusKart Chat
              </Typography>
                          <Typography variant="caption" color="text.secondary">
              {connectionStatus === 'connecting' ? 'Connecting...' : 
               connectionStatus === 'connected' ? 'Connected' : 
               connectionStatus === 'disconnected' ? 'Disconnected' : 'Connecting...'}
            </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Loading Content */}
        <Box 
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            gap: 3,
          }}
        >
          {/* Animated Logo */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: themeConfig.colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 1,
                  },
                  '50%': {
                    transform: 'scale(1.1)',
                    opacity: 0.7,
                  },
                  '100%': {
                    transform: 'scale(1)',
                    opacity: 1,
                  },
                },
              }}
            >
              <img 
                src={logoUrl} 
                alt="KampusKart" 
                style={{ 
                  width: '50px', 
                  height: '50px',
                  filter: 'brightness(0) invert(1)',
                }} 
              />
            </Box>
            
            <Typography variant="h6" fontWeight={600} sx={{ color: themeConfig.colors.primary }}>
              Loading Chat
            </Typography>
            
            <Typography variant="body2" sx={{ color: themeConfig.colors.text.secondary }} textAlign="center">
              Connecting to chat server...
            </Typography>
          </Box>

          {/* Progress Indicator */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <CircularProgress 
              size={40} 
              thickness={4}
              sx={{ 
                color: themeConfig.colors.primary,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
            <Typography variant="caption" sx={{ color: themeConfig.colors.text.secondary }}>
              Establishing connection
            </Typography>
          </Box>

          {/* Loading Steps */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: 300 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress 
                size={16} 
                sx={{ 
                  color: connectionStatus === 'connected' ? themeConfig.colors.success : 
                         connectionStatus === 'error' ? themeConfig.colors.error : themeConfig.colors.primary 
                }} 
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: connectionStatus === 'connected' ? themeConfig.colors.success : 
                         connectionStatus === 'error' ? themeConfig.colors.error : themeConfig.colors.text.secondary
                }}
              >
                {connectionStatus === 'connected' ? 'Connected to server' :
                 connectionStatus === 'error' ? 'Connection failed' : 'Connecting to server'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress 
                size={16} 
                sx={{ 
                  color: connectionStatus === 'connected' ? themeConfig.colors.success : themeConfig.colors.primary 
                }} 
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: connectionStatus === 'connected' ? themeConfig.colors.success : themeConfig.colors.text.secondary
                }}
              >
                {connectionStatus === 'connected' ? 'Messages loaded' : 'Loading messages'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress 
                size={16} 
                sx={{ 
                  color: connectionStatus === 'connected' ? themeConfig.colors.success : themeConfig.colors.text.light 
                }} 
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: connectionStatus === 'connected' ? themeConfig.colors.success : themeConfig.colors.text.light
                }}
              >
                {connectionStatus === 'connected' ? 'Real-time features ready' : 'Setting up real-time features'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#fafafa',
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
      overflow: 'hidden',
      height: '100vh',
      minHeight: 0,
      pt: '64px', // Use padding-top instead of top positioning
    }}>
      <ChatHeader />
      {/* Messages */}
      <Box sx={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        p: { xs: 2, sm: 3 },
        mb: 0,
        bgcolor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#d1d5db',
          borderRadius: '10px',
          '&:hover': {
            background: '#9ca3af',
          },
        },
      }}>
        {loading && messages.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} sx={{ color: 'primary.main' }} />
              <Typography variant="caption" color="text.secondary">
                Loading more messages...
              </Typography>
            </Box>
          </Box>
        )}
        <List sx={{ p: 0 }}>
          {messages.map((message) => (
            <React.Fragment key={message._id}>
              {renderMessage(message)}
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Sticky Input and Reply Preview */}
      <Box sx={{ 
        position: 'sticky', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        background: 'linear-gradient(180deg, transparent 0%, #fafafa 10%)',
        zIndex: 20, 
        pt: 2, 
        pb: 'env(safe-area-inset-bottom)',
        px: { xs: 2, sm: 3 },
      }}>
        {/* Reply Preview */}
        {replyTo && (
          <Paper 
            sx={{ 
              p: 1.5, 
              mb: 1.5, 
              bgcolor: '#f3f4f6',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                Replying to {replyTo.sender.name}
              </Typography>
              <IconButton 
                size="small" 
                onClick={() => setReplyTo(null)}
                sx={{ 
                  color: '#6b7280',
                  '&:hover': { bgcolor: '#e5e7eb' }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="body2" noWrap sx={{ color: '#374151' }}>
              {replyTo.message}
            </Typography>
          </Paper>
        )}
        {/* Typing Indicator */}
        {isTyping && (
          <Box sx={{ px: 2, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#00C6A7', animation: 'bounce 1.4s infinite', '@keyframes bounce': { '0%, 60%, 100%': { transform: 'translateY(0)' }, '30%': { transform: 'translateY(-10px)' } } }} />
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#00C6A7', animation: 'bounce 1.4s infinite 0.2s', '@keyframes bounce': { '0%, 60%, 100%': { transform: 'translateY(0)' }, '30%': { transform: 'translateY(-10px)' } } }} />
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#00C6A7', animation: 'bounce 1.4s infinite 0.4s', '@keyframes bounce': { '0%, 60%, 100%': { transform: 'translateY(0)' }, '30%': { transform: 'translateY(-10px)' } } }} />
            </Box>
            <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>
              Someone is typing...
            </Typography>
          </Box>
        )}
        {/* Message Input */}
        <Paper
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            px: { xs: 1.5, sm: 2 },
            py: { xs: 1.25, sm: 1.5 },
            display: 'flex',
            alignItems: 'flex-end',
            gap: { xs: 0.75, sm: 1 },
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: '20px',
            border: '1px solid #e5e7eb',
            bgcolor: '#ffffff',
            transition: 'all 0.2s ease',
            '&:focus-within': {
              boxShadow: '0 -4px 24px rgba(0, 198, 167, 0.15)',
              borderColor: '#00C6A7',
            }
          }}
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <IconButton 
            onClick={() => fileInputRef.current?.click()} 
            size="small"
            sx={{ 
              color: '#6b7280',
              '&:hover': { 
                bgcolor: '#f3f4f6',
                color: '#00C6A7',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <IconButton 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
            size="small"
            sx={{ 
              color: '#6b7280',
              '&:hover': { 
                bgcolor: '#f3f4f6',
                color: '#00C6A7',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <EmojiEmotionsIcon />
          </IconButton>
          {showEmojiPicker && (
            <Box sx={{ position: 'absolute', bottom: '100%', left: 0, zIndex: 30 }}>
              <Picker 
                data={data} 
                theme="light"
                onEmojiSelect={(emoji) => {
                setNewMessage((prev) => prev + emoji.native);
                setShowEmojiPicker(false);
                }} 
              />
            </Box>
          )}
          {/* Show selected attachments as chips */}
          {attachments.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1, px: 2 }}>
              {attachments.map((file, idx) => (
                <Paper key={idx} sx={{ display: 'flex', alignItems: 'center', p: 0.5, bgcolor: '#e3f2fd' }}>
                  <Typography variant="caption" sx={{ mr: 1 }}>{file.name}</Typography>
                  <IconButton size="small" onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Paper>
              ))}
            </Box>
          )}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                bgcolor: '#f9fafb',
                fontSize: '0.9375rem',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00C6A7',
                  borderWidth: '1px',
                },
              },
              '& .MuiInputBase-input': {
                py: 1.25,
                px: 1.5,
              },
            }}
            inputProps={{ style: { fontSize: '0.9375rem' } }}
          />
          <IconButton 
            type="submit" 
            disabled={(newMessage.trim() === '' && attachments.length === 0) || sendingMessage}
            sx={{
              width: { xs: 40, sm: 44 },
              height: { xs: 40, sm: 44 },
              background: (newMessage.trim() !== '' || attachments.length > 0) && !sendingMessage
                ? 'linear-gradient(135deg, #00C6A7 0%, #009e87 100%)'
                : '#e5e7eb',
              color: (newMessage.trim() !== '' || attachments.length > 0) && !sendingMessage
                ? '#ffffff'
                : '#9ca3af',
              '&:hover': {
                background: (newMessage.trim() !== '' || attachments.length > 0) && !sendingMessage
                  ? 'linear-gradient(135deg, #009e87 0%, #008a75 100%)'
                  : '#d1d5db',
                transform: 'scale(1.05)',
              },
              '&:disabled': {
                background: '#e5e7eb',
                color: '#9ca3af',
              },
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: (newMessage.trim() !== '' || attachments.length > 0) && !sendingMessage
                ? '0 4px 12px rgba(0, 198, 167, 0.3)'
                : 'none',
            }}
          >
            {sendingMessage ? (
              <CircularProgress size={20} sx={{ color: '#ffffff' }} />
            ) : (
              <SendIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
            )}
          </IconButton>
        </Paper>
      </Box>

      {/* Message Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            minWidth: 120
          }
        }}
      >
        {selectedMessage?.sender._id === user._id && (
          <>
            <MenuItem 
              onClick={() => {
                startEditing(selectedMessage);
                setAnchorEl(null);
              }}
              sx={{
                borderRadius: '8px',
                mx: 0.5,
                my: 0.25,
                '&:hover': {
                  backgroundColor: '#e3f2fd'
                }
              }}
            >
              <EditIcon fontSize="small" sx={{ mr: 1.5, color: '#1976d2' }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Edit</Typography>
            </MenuItem>
            <MenuItem 
              onClick={() => {
                handleDeleteMessage();
                setAnchorEl(null);
              }}
              sx={{
                borderRadius: '8px',
                mx: 0.5,
                my: 0.25,
                '&:hover': {
                  backgroundColor: '#ffebee'
                }
              }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1.5, color: '#d32f2f' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#d32f2f' }}>Delete</Typography>
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Search Results Dialog */}
      <Dialog
        open={searchResults.length > 0}
        onClose={() => setSearchResults([])}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Search Results</DialogTitle>
        <DialogContent>
          <List>
            {searchResults.map((message) => (
              <React.Fragment key={message._id}>
                {renderMessage(message)}
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSearchResults([])}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatWindow; 