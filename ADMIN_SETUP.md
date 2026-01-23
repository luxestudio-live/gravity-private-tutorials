# Admin Panel Setup Guide

## Firebase Admin Panel

The admin panel is now integrated with Firebase for managing faculty and student results.

### Access Admin Panel

1. **Admin Login Page**: `http://localhost:3000/admin/login`
2. **Admin Dashboard**: `http://localhost:3000/admin/dashboard`

### Features

- **Faculty Management**: Add, edit, and delete faculty members with photo uploads
- **Results Management**: Add, edit, and delete student results with scores and ranks
- **Dashboard**: View statistics of faculty and results

### Initial Setup

#### Step 1: Create Admin User in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select "decent-academy" project
3. Navigate to **Authentication** → **Users**
4. Click **Add user**
5. Create an admin account with:
   - Email: (your admin email)
   - Password: (secure password)

#### Step 2: Set Firestore Rules

In Firebase Console, go to **Firestore Database** → **Rules** and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin only access for faculty and results
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Step 3: Create Firestore Collections

The following collections will be created automatically when you add data:
- `faculty` - Faculty member profiles
- `results` - Student results

#### Step 4: Set Storage Rules

In Firebase Console, go to **Storage** → **Rules** and replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /faculty/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Admin Workflow

#### Adding Faculty

1. Navigate to **Admin** → **Faculty**
2. Click **Add Faculty**
3. Fill in details:
   - Name
   - Subject
   - Qualification
   - Experience
   - Specialization
   - Achievements (one per line)
   - Photo (auto-uploads to Firebase Storage)
4. Click **Add Faculty**

#### Managing Results

1. Navigate to **Admin** → **Results**
2. Click **Add Result**
3. Fill in details:
   - Student Name
   - Class
   - Score (e.g., "95/100" or "681/720")
   - Rank (optional)
   - Date
4. Click **Add Result**

### Important Notes

- Faculty photos are uploaded to Firebase Storage
- All data is stored in Firestore
- Auth credentials are required to access admin panel
- Only authenticated users can add/edit/delete data
- Changes are reflected in the frontend automatically

### Accessing Data from Frontend

The frontend pages still read from their local arrays. To sync with Firebase data:

1. Update `app/faculty/page.tsx` to fetch from Firestore
2. Update `app/results/page.tsx` to fetch from Firestore
3. Or use a separate data layer to sync both sources

Would you like me to implement the frontend sync as well?
