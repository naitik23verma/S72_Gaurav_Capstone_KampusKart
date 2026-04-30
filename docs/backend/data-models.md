# Backend Data Models

This section summarizes the Mongoose schemas used by the backend. Field names and enums are based on the model definitions.

## User
Fields:
- email (string, unique, lowercase)
- password (string, required if googleId is not set)
- name (string)
- googleId (string, unique, sparse)
- phone (string)
- createdAt (date)
- resetPasswordOTP (string)
- resetPasswordExpires (date)
- profilePicture { url, public_id }
- major (string)
- yearOfStudy (string)
- gender (string)
- dateOfBirth (date)
- program (string)

Methods:
- comparePassword(candidatePassword)

## LostFoundItem
Fields:
- user (ObjectId ref User)
- type (lost or found)
- title (string)
- description (string)
- location (string)
- date (date)
- images [{ public_id, url }]
- resolved (boolean)
- contact (string)
- resolvedAt (date)
- createdAt (date)
- isDeleted (boolean)
- deletedAt (date)
- expirationNotified (boolean)

Indexes:
- createdAt, resolved, resolvedAt, isDeleted, type, date, user
- compound: { type, resolved, isDeleted }, { isDeleted, createdAt }
- text: title, description, location

## Complaint
Fields:
- user (ObjectId ref User)
- title (string, max 100)
- description (string, max 1000)
- category (Academic, Administrative, Facilities, IT, Security, Other)
- priority (Low, Medium, High, Urgent)
- department (Academic Affairs, Administration, Facilities Management, IT Services, Security, Student Services)
- assignedTo (ObjectId ref User)
- estimatedResolutionTime (date)
- images [{ public_id, url }]
- status (Open, In Progress, Resolved, Closed)
- statusHistory [{ status, comment, updatedBy, timestamp }]
- createdAt (date)
- lastUpdated (date)
- isDeleted (boolean)
- deletedAt (date)

Indexes:
- status, category, department, priority, user, createdAt, isDeleted
- compound: { status, category }, { isDeleted, createdAt }, { department, status }

## Chat
Fields:
- sender (ObjectId ref User)
- message (string; required if no attachments)
- attachments [{ type: image or file, url, name, size, mimeType }]
- reactions [{ user, emoji }]
- readBy [{ user, readAt }]
- edited (boolean)
- editedAt (date)
- replyTo (ObjectId ref Chat)
- timestamp (date)
- isDeleted (boolean)
- timestamps (createdAt, updatedAt)

Indexes:
- timestamp
- text index on message
- readBy.user, reactions.user

Methods:
- isReadBy(userId)
- addReaction(userId, emoji)
- markAsRead(userId)

## News
Fields:
- title (string)
- description (string)
- date (date)
- category (string)
- images [{ public_id, url }]
- createdAt (date)

Indexes:
- date, category, createdAt
- compound: { category, date }

## Event
Fields:
- title (string)
- description (string)
- date (date)
- location (string)
- status (Upcoming, Ongoing, Completed, Cancelled)
- image { public_id, url }
- registerUrl (string)
- operatingHours (string)
- contactInfo { name, email, phone }
- mapLocation { building, floor, room, coordinates { lat, lng } }
- createdAt (date)

Indexes:
- date, status, createdAt
- compound: { date, status }

## Facility
Fields:
- name (string)
- description (string)
- location (string)
- type (Academic, Food, Service, Accommodation)
- icon (string)
- images [{ url, public_id }]
- timestamps (createdAt, updatedAt)

Indexes:
- type, name, createdAt
- compound: { type, name }

## ClubRecruitment
Fields:
- title (string)
- description (string)
- clubName (string)
- startDate (date)
- endDate (date)
- formUrl (string)
- image { public_id, url }
- contactInfo { name, email, phone }
- status (Open, Closed)
- createdAt (date)
