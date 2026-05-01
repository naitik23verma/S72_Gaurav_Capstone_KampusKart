import { API_BASE } from '../../config';
import { ChatMessage, PaginatedChatResponse } from './types';

export const chatApi = {
  listMessages: async (
    token: string,
    page: number,
    limit: number
  ): Promise<PaginatedChatResponse> => {
    const response = await fetch(`${API_BASE}/api/chat/messages?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  searchMessages: async (token: string, query: string): Promise<ChatMessage[]> => {
    const response = await fetch(`${API_BASE}/api/chat/search?query=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to search messages');
    return response.json();
  },

  sendMessage: async (token: string, formData: FormData): Promise<ChatMessage> => {
    const response = await fetch(`${API_BASE}/api/chat/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },

  editMessage: async (token: string, messageId: string, message: string): Promise<ChatMessage> => {
    const response = await fetch(`${API_BASE}/api/chat/messages/${messageId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error('Failed to edit message');
    return response.json();
  },

  deleteMessage: async (token: string, messageId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/api/chat/messages/${messageId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete message');
    return response.json();
  },

  addReaction: async (token: string, messageId: string, emoji: string): Promise<ChatMessage> => {
    const response = await fetch(`${API_BASE}/api/chat/messages/${messageId}/reactions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emoji }),
    });
    if (!response.ok) throw new Error('Failed to add reaction');
    return response.json();
  },

  markRead: async (token: string, messageId: string): Promise<ChatMessage> => {
    const response = await fetch(`${API_BASE}/api/chat/messages/${messageId}/read`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to mark message as read');
    return response.json();
  },
};
