# Inbox & Chat Navigation Flow

## Current Setup (CORRECT)

### 1. **Inbox Tab Structure**
```
Inbox Tab (MainTabNavigator)
  └── InboxStackNavigator
      ├── InboxMain (List of conversations)
      └── Chat (Individual conversation)
```

### 2. **Navigation Flows**

#### **Flow A: From Homepage → Make an Offer**
```
Home Tab
  ↓ User clicks listing
Listing Detail Screen
  ↓ User clicks "Make an Offer"
Navigate to: Inbox Tab → Chat Screen
  ↓ Shows: "Message to Seller" header
  ↓ conversationType: 'buying'
```

#### **Flow B: From Inbox → View Conversation**
```
Inbox Tab
  ↓ Shows: InboxMain (list of conversations)
User clicks a conversation
  ↓
Navigate to: Chat Screen
  ↓ Shows: "Message to Seller" OR "Message to Buyer"
  ↓ conversationType: depends on who owns the listing
```

### 3. **Back Button Behavior**

#### **From Chat Screen:**
- **Tap Back Arrow** → Goes to InboxMain (list of conversations)
- Uses `navigation.goBack()`

#### **From InboxMain:**
- **Tap Back** → Should stay in Inbox (it's the root of the stack)
- Or switch to another tab

### 4. **Conversation Types**

#### **When conversationType = 'buying':**
- Header: **"Message to Seller"**
- User is the BUYER
- They are messaging about someone else's listing
- Can make offers, ask questions

#### **When conversationType = 'selling':**
- Header: **"Message to Buyer"**
- User is the SELLER
- They are responding about THEIR listing
- Can accept/decline offers, answer questions

## How to Test

### Test 1: Make an Offer Flow
1. ✅ Go to **Home** tab
2. ✅ Click any **listing**
3. ✅ Click **"Make an Offer"**
4. ✅ Should navigate to **Chat screen**
5. ✅ Header shows **"Message to Seller"**
6. ✅ Click **back arrow**
7. ✅ Should go to **InboxMain** (list of conversations)
8. ✅ Should see the new conversation in the list

### Test 2: Inbox Navigation
1. ✅ Tap **Inbox** tab
2. ✅ Should show **InboxMain** (list of conversations)
3. ✅ Click any **conversation**
4. ✅ Opens **Chat screen**
5. ✅ Header shows **"Message to Seller"** or **"Message to Buyer"**
6. ✅ Click **back arrow**
7. ✅ Returns to **InboxMain** (list)

### Test 3: Tab Switching
1. ✅ From **Chat screen**, tap **Home** tab
2. ✅ Goes to Home
3. ✅ Tap **Inbox** tab again
4. ✅ Should show **InboxMain** (NOT the chat you were in)

## Known Issues & Solutions

### Issue: "Inbox tab goes straight to Chat instead of list"
**Cause:** Navigation state is preserved when switching tabs
**Solution:** This is CORRECT behavior in React Navigation
- When you leave a stack and come back, it remembers where you were
- To reset: The user can tap the Inbox tab again (double-tap) to go to root

### Issue: "Back button goes to Home instead of Inbox list"
**Cause:** If navigation stack is incorrect
**Solution:** Ensure Chat is always pushed onto InboxStack, not Root stack

## Current Implementation Status

✅ **InboxStackNavigator** - Correctly set up with InboxMain → Chat
✅ **ChatScreen** - Uses navigation.goBack() for back button
✅ **conversationType** - Properly switches header between buyer/seller
✅ **Make an Offer** - Navigates to Inbox → Chat with buying context
✅ **Back Navigation** - Returns to InboxMain from Chat

## Future Enhancements

When connecting to backend:
1. Determine `conversationType` based on:
   ```typescript
   conversationType = currentUser.id === listing.sellerId ? 'selling' : 'buying'
   ```

2. Filter conversations in InboxMain:
   - Show both buying and selling conversations
   - Use tabs or filters to separate them
   - Current mock data already has `type: 'buying' | 'selling'`

3. Sync conversation list:
   - When creating new conversation from "Make an Offer"
   - Add it to the InboxMain list
   - Show unread count
