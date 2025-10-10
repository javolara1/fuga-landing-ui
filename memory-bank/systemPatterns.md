# System Patterns

_This document outlines the system architecture, key technical decisions, design patterns in use, component relationships, and critical implementation paths._

## Data Models and Entity-Relationship Diagram

### Core Entities

#### Week

Represents a calendar week with specific status and access controls.

**Attributes:**

- `id`: Unique identifier (UUID/Integer)
- `start_date`: Start date of the week (Date)
- `end_date`: End date of the week (Date)
- `status`: Week status enum (`PAST`, `CURRENT`, `FUTURE_DISABLED`, `FUTURE_ENABLED`)
- `enabled_by`: Administrator who enabled the week (Foreign Key to Administrator)
- `enabled_at`: Timestamp when week was enabled (DateTime)
- `created_at`: Creation timestamp (DateTime)
- `updated_at`: Last update timestamp (DateTime)

**Business Rules:**

- Past weeks are automatically read-only
- Only administrators can enable future weeks
- Current week is determined by system date
- Week boundaries are Sunday to Saturday

#### TimeSlot

Represents a specific time period within a day of a week.

**Attributes:**

- `id`: Unique identifier (UUID/Integer)
- `week_id`: Reference to Week (Foreign Key)
- `day_of_week`: Day within the week (Integer 0-6, Sunday=0)
- `start_time`: Start time of the slot (Time)
- `end_time`: End time of the slot (Time)
- `resource_type`: Type of resource (`CLASS`, `ROOM`, `PROFESSIONAL`)
- `resource_id`: Reference to specific resource (Foreign Key)
- `capacity`: Maximum number of people/bookings (Integer)
- `available_capacity`: Current available capacity (Integer)
- `is_active`: Whether the time slot is active (Boolean)
- `created_at`: Creation timestamp (DateTime)
- `updated_at`: Last update timestamp (DateTime)

**Business Rules:**

- Time slots can only be created for enabled weeks
- Capacity must be positive integer
- Available capacity cannot exceed total capacity
- Start time must be before end time
- No overlapping time slots for same resource

#### Class

Represents a class/activity or physical space that can be scheduled.

**Attributes:**

- `id`: Unique identifier (UUID/Integer)
- `name`: Class/room name (String)
- `description`: Class/room description (Text)
- `duration_minutes`: Default duration in minutes (Integer, optional)
- `max_capacity`: Maximum participants/occupancy (Integer)
- `location`: Room location/building (String, optional)
- `is_active`: Whether class/room is available for scheduling (Boolean)
- `created_at`: Creation timestamp (DateTime)
- `updated_at`: Last update timestamp (DateTime)

#### Professional

Represents a professional/instructor who can be scheduled.

**Attributes:**

- `id`: Unique identifier (UUID/Integer)
- `first_name`: First name (String)
- `last_name`: Last name (String)
- `email`: Email address (String, unique)
- `phone`: Phone number (String)
- `specializations`: Areas of expertise (JSON/Text)
- `is_active`: Whether professional is available (Boolean)
- `created_at`: Creation timestamp (DateTime)
- `updated_at`: Last update timestamp (DateTime)

#### Administrator

Represents system administrators who can manage schedules.

**Attributes:**

- `id`: Unique identifier (UUID/Integer)
- `username`: Login username (String, unique)
- `email`: Email address (String, unique)
- `first_name`: First name (String)
- `last_name`: Last name (String)
- `role`: Administrator role (`SUPER_ADMIN`, `FACILITY_MANAGER`, `SCHEDULER`)
- `permissions`: Specific permissions (JSON/Text)
- `is_active`: Whether account is active (Boolean)
- `last_login`: Last login timestamp (DateTime)
- `created_at`: Creation timestamp (DateTime)
- `updated_at`: Last update timestamp (DateTime)

### Entity Relationships

```
Week (1) ──────── (Many) TimeSlot
  │
  └── enabled_by ──── (1) Administrator

TimeSlot (Many) ──── (1) Class
TimeSlot (Many) ──── (1) Room
TimeSlot (Many) ──── (1) Professional

Administrator (1) ──── (Many) Week [enabled_by]
```

### Detailed Relationships

1. **Week → TimeSlot** (One-to-Many)
   - One week can have multiple time slots
   - Each time slot belongs to exactly one week
   - Cascade delete: Deleting a week removes all its time slots

2. **Administrator → Week** (One-to-Many via enabled_by)
   - One administrator can enable multiple weeks
   - Each enabled week tracks which administrator enabled it
   - Soft reference: Administrator deletion doesn't affect week history

3. **TimeSlot → Resource** (Many-to-One, polymorphic)
   - Each time slot references one resource (Class, Room, or Professional)
   - One resource can be scheduled in multiple time slots
   - Resource type determines which table to reference

### Database Schema Considerations

#### Current Implementation Status

- **Initial Schema Created:** Basic `week` table migration created with minimal fields
- **Schema Incomplete:** Missing TimeSlot, Class, Professional, and Administrator tables
- **Fields to Add:** Need to add `enabled_by`, `enabled_at`, `updated_at` fields to week table
- **Status Enum:** Need to implement week status enum constraint

#### Indexes (Planned)

- `week_start_date_idx`: Index on Week.start_date for efficient date queries
- `timeslot_week_day_idx`: Composite index on TimeSlot(week_id, day_of_week)
- `timeslot_resource_idx`: Composite index on TimeSlot(resource_type, resource_id)
- `administrator_email_idx`: Unique index on Administrator.email

#### Constraints (Planned)

- `week_date_range_check`: Ensure end_date > start_date
- `timeslot_time_check`: Ensure end_time > start_time
- `timeslot_capacity_check`: Ensure available_capacity <= capacity
- `timeslot_day_check`: Ensure day_of_week between 0-6

## System Architecture

### Frontend Architecture

- **SvelteKit** with file-based routing and server-side rendering
- **Component Structure:**
  - `WeekNavigator`: Navigation between weeks
  - `WeekView`: Display week schedule with time slots
  - `TimeSlotEditor`: Configure individual time slots
  - `ResourceSelector`: Choose classes, rooms, or professionals
  - `AdminControls`: Enable weeks and manage permissions

### Backend Architecture (Implemented)

- **API Layer**: RESTful endpoints (`+server.ts` files)
- **Authentication Layer**: Server-side authentication with Supabase
- **Session Management**: Centralized session handling in hooks with `setSession` approach
- **Data Access Layer**: Supabase client for database operations
- **Business Logic Layer**: Server-side validation and business rules
- **User Profile System**: Integrated profile data with Supabase profiles table

### Server-Side Rendering Strategy

- **Default Approach**: Server-side rendering for all pages using `+page.server.ts`
- **API Endpoints**: Server-side API routes using `+server.ts` files
- **Authentication**: Server-side session management with secure cookies
- **Data Loading**: Server-side data fetching for initial page loads
- **Progressive Enhancement**: Client-side interactivity where needed

### Key Design Patterns

#### State Management

- **Week Status State Machine:**
  ```
  FUTURE_DISABLED → FUTURE_ENABLED → CURRENT → PAST
  ```
- **Resource Assignment Pattern:** Polymorphic association for different resource types
- **Capacity Management Pattern:** Track total and available capacity separately
- **Session Management Pattern:** Automatic user session detection and profile data loading

#### User Profile System

- **Session Detection:** Automatic user session validation in server hooks
- **Profile Data Flow:** Server-side profile fetching and client-side availability
- **Conditional Navigation:** Dynamic header based on authentication status
- **Route Protection:** Automatic redirects for authenticated/unauthenticated users

#### Access Control Pattern

- **Time-based Permissions:** Past weeks are read-only regardless of user role
- **Role-based Access:** Different admin roles have different capabilities
- **Resource-level Security:** Admins can only modify resources they have access to

## Critical Implementation Paths

### Week Management Flow

1. System automatically updates week status based on current date
2. Administrators can enable future weeks for configuration
3. Once enabled, time slots can be created and configured
4. Past weeks become read-only automatically

### Time Slot Configuration Flow

1. Select enabled week
2. Choose day and time range
3. Select resource type (Class/Room/Professional)
4. Choose specific resource
5. Set capacity limits
6. Validate no conflicts exist
7. Save time slot configuration

### Data Validation Rules

- **Temporal Validation:** No modifications to past weeks
- **Capacity Validation:** Available capacity ≤ total capacity
- **Conflict Detection:** No overlapping time slots for same resource
- **Business Rules:** Enforce minimum/maximum durations, capacity limits

## Performance Considerations

- **Week-based Partitioning:** Consider partitioning time slots by week for better query performance
- **Caching Strategy:** Cache current and next week data for faster loading
- **Lazy Loading:** Load time slot details only when needed
- **Batch Operations:** Support bulk time slot creation for recurring schedules
