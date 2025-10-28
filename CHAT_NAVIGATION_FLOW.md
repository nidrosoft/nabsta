# Chat Navigation Flow - Buyer vs Seller

## Overview
The chat system properly handles both **buyer** and **seller** contexts using the `conversationType` parameter.

## How It Works

### 1. **From Listing Detail (User is BUYING)**
When a user clicks "Make an Offer" or "Chat" on a listing detail page:

```typescript
conversationType: 'buying'
```

**What this means:**
- User is the **buyer**
- They are **messaging the seller**
- Header shows: **"Message to Seller"**
- They can make offers, ask questions, request photos

**Navigation Flow:**
```
Home → Listing Detail → [Make an Offer/Chat] → Chat Screen (buying mode)
```

### 2. **From Inbox (User is SELLING)**
When a user receives a message about their own listing:

```typescript
conversationType: 'selling'
```

**What this means:**
- User is the **seller**
- They are **responding to a buyer**
- Header shows: **"Message to Buyer"**
- They can accept/decline offers, answer questions, send photos

**Navigation Flow:**
```
Inbox → [Tap conversation] → Chat Screen (selling mode)
```

## Implementation Details

### Chat Screen Header
The header title dynamically changes based on `conversationType`:

```typescript
const headerTitle = conversationType === 'buying' 
  ? 'Message to Seller'  // User is buying
  : 'Message to Buyer';   // User is selling
```

### Make an Offer Button
Currently navigates to Chat with these parameters:

```typescript
navigation.navigate('Inbox', {
  screen: 'Chat',
  params: {
    conversationId: 'new',
    itemTitle: 'iPhone 13 Pro Max 256GB',
    itemPrice: 299.99,
    itemImage: '...',
    contactName: 'John Doe',
    contactAvatar: '...',
    contactRating: 4.9,
    contactLocation: 'San Francisco, CA',
    isVerified: true,
    conversationType: 'buying', // ← Key parameter
  },
});
```

## Key Points

✅ **Same Chat Screen, Different Context**
- We use ONE ChatScreen component
- The `conversationType` parameter determines the behavior
- No confusion between buyer/seller modes

✅ **Proper Navigation**
- Listing Detail → Chat uses `conversationType: 'buying'`
- Inbox → Chat uses `conversationType: 'selling'` (for seller's items)
- Inbox → Chat uses `conversationType: 'buying'` (for buyer's inquiries)

✅ **Future Backend Integration**
When connecting to a database:
- Check if the logged-in user is the listing owner
- Set `conversationType` accordingly
- `conversationType = user.id === listing.sellerId ? 'selling' : 'buying'`

## Testing

### Test as Buyer:
1. Go to Home
2. Click any listing
3. Click "Make an Offer" or "Chat"
4. ✓ Should see "Message to Seller" header
5. ✓ Should be able to make offers

### Test as Seller:
1. Go to Inbox
2. Click a conversation about YOUR listing
3. ✓ Should see "Message to Buyer" header
4. ✓ Should be able to accept/decline offers

## Status

✅ **FIXED** - "Make an Offer" now properly navigates to Chat
✅ **WORKING** - Buyer/Seller contexts are properly separated
✅ **READY** - For backend integration with real user/listing data
