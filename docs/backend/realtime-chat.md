# Real Time Chat

## Overview
The chat system combines Socket.IO for live updates with REST endpoints for persistence, pagination, and moderation.

## Socket.IO lifecycle
1. Client connects with a JWT in the handshake (auth.token).
2. Server verifies the JWT and confirms the user exists.
3. Client emits join; server adds the user to the global room.
4. Server broadcasts the current online user list.
5. Server sends the last 50 messages to the joining client.

## Socket events
Server emits:
- previous-messages
- new-message
- online-users
- user-typing
- user-stop-typing
- message-updated
- message-deleted

Client emits:
- join
- typing
- stop-typing

## REST endpoints used by chat
- GET /api/chat/messages for pagination
- POST /api/chat/messages for sending messages and attachments
- PATCH /api/chat/messages/:messageId for edits
- DELETE /api/chat/messages/:messageId for soft delete
- POST /api/chat/messages/:messageId/reactions for reactions
- POST /api/chat/messages/:messageId/read for read receipts

## Attachments
- Attachments are uploaded through Cloudinary and stored on the message record.
- Allowed file types include images and common document formats.
- Orphaned attachments can be cleaned via an admin endpoint.

## Read receipts and reactions
- readBy is tracked per message and uses a subdocument with user and readAt.
- reactions are stored as user plus emoji and toggled by user.
