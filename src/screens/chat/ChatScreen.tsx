/**
 * ChatScreen Component
 * Chat interface for messaging about a listing
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import {
  ArrowLeft2,
  Star1,
  Location,
  TickCircle,
  Send2,
  InfoCircle,
  CloseCircle,
  Warning2,
  TickSquare,
  Book,
  MessageQuestion,
  Danger,
  Lock1,
  Camera,
  Gallery,
  SearchNormal1,
} from 'iconsax-react-native';
import { ThreeDotsIcon } from '../../components/common';
import { InboxStackParamList } from '../../types/navigation';
import { theme } from '../../theme';

type ChatScreenRouteProp = RouteProp<InboxStackParamList, 'Chat'>;

const QUICK_MESSAGES = [
  "Is this still available?",
  "What's your best price?",
  "Can we meet today?",
  "Is the condition as described?",
];

interface Message {
  id: string;
  text: string;
  sender: 'buyer' | 'seller';
  timestamp: string;
  type?: 'text' | 'offer' | 'image';
  offerAmount?: number;
  offerStatus?: 'pending' | 'accepted' | 'declined' | 'countered';
  imageUri?: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hi! I'm interested in this item. Is it still available?",
    sender: 'buyer',
    timestamp: '10:30 AM',
    type: 'text',
  },
  {
    id: '2',
    text: "Yes, it's still available! It's in excellent condition.",
    sender: 'seller',
    timestamp: '10:32 AM',
    type: 'text',
  },
  {
    id: '3',
    text: "Great! Can you tell me more about it?",
    sender: 'buyer',
    timestamp: '10:33 AM',
    type: 'text',
  },
  {
    id: '4',
    text: "Sure! Everything works perfectly. I can show you when we meet.",
    sender: 'seller',
    timestamp: '10:35 AM',
    type: 'text',
  },
  {
    id: '5',
    text: "I'd like to make an offer",
    sender: 'buyer',
    timestamp: '10:37 AM',
    type: 'offer',
    offerAmount: 250,
    offerStatus: 'pending',
  },
  {
    id: '6',
    text: "Counter offer",
    sender: 'seller',
    timestamp: '10:40 AM',
    type: 'offer',
    offerAmount: 280,
    offerStatus: 'countered',
  },
  {
    id: '7',
    text: "Here are some additional photos",
    sender: 'seller',
    timestamp: '10:45 AM',
    type: 'image',
    imageUri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  },
  {
    id: '8',
    text: "Can you send a photo of the back?",
    sender: 'buyer',
    timestamp: '10:47 AM',
    type: 'text',
  },
];

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatScreenRouteProp>();
  
  // Get data from navigation params with fallback defaults
  const {
    itemTitle = 'iPhone 13 Pro Max 256GB',
    itemPrice = 299.99,
    itemImage = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    contactName = 'John Doe',
    contactAvatar = 'https://i.pravatar.cc/150?img=12',
    contactRating = 4.9,
    contactLocation = 'San Francisco, CA',
    isVerified = true,
    conversationType = 'buying',
    fromHome = false,
  } = route.params || {};
  
  // Determine header title based on conversation type
  const headerTitle = conversationType === 'buying' ? 'Message to Seller' : 'Message to Buyer';
  const [message, setMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showMessageActions, setShowMessageActions] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [readReceipts, setReadReceipts] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [showQuickMessages, setShowQuickMessages] = useState(messages.length === 0);
  const [isTyping, setIsTyping] = useState(false);

  const handleHelp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowMenu(false);
    setShowHelpModal(true);
  };

  const handleBlock = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowMenu(false);
    
    Alert.alert(
      'Block User',
      'Why do you want to block this user?',
      [
        {
          text: 'Spam or Scam',
          onPress: () => {
            Alert.alert('User Blocked', `${contactName} has been blocked for spam/scam.`);
          },
        },
        {
          text: 'Harassment',
          onPress: () => {
            Alert.alert('User Blocked', `${contactName} has been blocked for harassment.`);
          },
        },
        {
          text: 'Inappropriate Content',
          onPress: () => {
            Alert.alert('User Blocked', `${contactName} has been blocked for inappropriate content.`);
          },
        },
        {
          text: 'Other',
          onPress: () => {
            Alert.alert('User Blocked', `${contactName} has been blocked.`);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleReport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowMenu(false);
    
    Alert.alert(
      'Report User',
      'What would you like to report?',
      [
        {
          text: 'Scam or Fraud',
          onPress: () => {
            Alert.alert('Report Submitted', 'Thank you for reporting. We will review this case.');
          },
        },
        {
          text: 'Fake Listing',
          onPress: () => {
            Alert.alert('Report Submitted', 'Thank you for reporting. We will review this case.');
          },
        },
        {
          text: 'Harassment',
          onPress: () => {
            Alert.alert('Report Submitted', 'Thank you for reporting. We will review this case.');
          },
        },
        {
          text: 'Inappropriate Content',
          onPress: () => {
            Alert.alert('Report Submitted', 'Thank you for reporting. We will review this case.');
          },
        },
        {
          text: 'Other',
          onPress: () => {
            Alert.alert('Report Submitted', 'Thank you for reporting. We will review this case.');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'buyer' as const,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setShowQuickMessages(false);
    }
  };

  const handleQuickMessage = (quickMsg: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newMessage: Message = {
      id: Date.now().toString(),
      text: quickMsg,
      sender: 'buyer' as const,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
    setMessages([...messages, newMessage]);
    setShowQuickMessages(false);
  };

  const handleMakeOffer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowOfferModal(true);
  };

  const handleSubmitOffer = () => {
    if (offerAmount.trim() && !isNaN(parseFloat(offerAmount))) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const newOffer: Message = {
        id: Date.now().toString(),
        text: "I'd like to make an offer",
        sender: 'buyer' as const,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'offer',
        offerAmount: parseFloat(offerAmount),
        offerStatus: 'pending',
      };
      setMessages([...messages, newOffer]);
      setOfferAmount('');
      setShowOfferModal(false);
      Alert.alert('Offer Sent', `Your offer of $${offerAmount} has been sent to ${contactName}.`);
    }
  };

  const handleOfferAction = (messageId: string, action: 'accept' | 'decline' | 'counter') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (action === 'accept') {
      Alert.alert('Offer Accepted', 'Great! The seller has accepted your offer.');
    } else if (action === 'decline') {
      Alert.alert('Offer Declined', 'The seller has declined this offer.');
    } else if (action === 'counter') {
      setShowOfferModal(true);
    }
  };

  const handleViewItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('View Item', `Opening listing details for ${itemTitle}...`);
    // TODO: Navigate to listing detail screen
  };

  const handleImagePicker = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowImagePicker(true);
  };

  const handleSelectCamera = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowImagePicker(false);
    // Simulate camera capture
    setTimeout(() => {
      const newImageMessage: Message = {
        id: Date.now().toString(),
        text: "Photo from camera",
        sender: 'buyer' as const,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'image',
        imageUri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      };
      setMessages([...messages, newImageMessage]);
      Alert.alert('Photo Sent', 'Your photo has been sent!');
    }, 500);
  };

  const handleSelectGallery = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowImagePicker(false);
    // Simulate gallery selection
    setTimeout(() => {
      const newImageMessage: Message = {
        id: Date.now().toString(),
        text: "Photo from gallery",
        sender: 'buyer' as const,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'image',
        imageUri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      };
      setMessages([...messages, newImageMessage]);
      Alert.alert('Photo Sent', 'Your photo has been sent!');
    }, 500);
  };

  const handleImagePress = (imageUri: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Image Preview', 'Full-screen image viewer would open here');
    // TODO: Open full-screen image viewer
  };

  const handleLongPressMessage = (msg: Message) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedMessage(msg);
    setShowMessageActions(true);
  };

  const handleCopyMessage = () => {
    if (selectedMessage) {
      Clipboard.setString(selectedMessage.text);
      setShowMessageActions(false);
      Alert.alert('Copied', 'Message copied to clipboard');
    }
  };

  const handleDeleteMessage = () => {
    if (selectedMessage && selectedMessage.sender === 'buyer') {
      setMessages(messages.filter(m => m.id !== selectedMessage.id));
      setShowMessageActions(false);
      Alert.alert('Deleted', 'Message deleted');
    }
  };

  const handleReaction = (emoji: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowMessageActions(false);
    Alert.alert('Reaction Added', `Reacted with ${emoji}`);
    // TODO: Add reaction to message
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  };

  const handleShareLocation = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Share Location', 'Location sharing would open map picker here');
    // TODO: Integrate map picker
  };

  const handleSearchMessages = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowSearchBar(!showSearchBar);
  };

  const handleToggleMute = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsMuted(!isMuted);
    Alert.alert('Success', isMuted ? 'Notifications enabled' : 'Conversation muted');
  };

  const handleArchive = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Archived', 'Conversation archived');
    navigation.goBack();
  };

  const handleToggleReadReceipts = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setReadReceipts(!readReceipts);
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient extending to status bar */}
      <LinearGradient
        colors={theme.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={['top']} style={styles.header}>
          {/* Top Row: Back button, Title, Menu */}
          <View style={styles.headerTopRow}>
            <TouchableOpacity 
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                if (fromHome) {
                  // If we came from Home via "Make an Offer", go back to Home
                  navigation.navigate('Home' as any);
                } else {
                  // Otherwise, go back normally (to Inbox list)
                  navigation.goBack();
                }
              }} 
              style={styles.backButtonCircle}
            >
              <ArrowLeft2 size={20} color={theme.colors.text.primary} />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            
            <View style={styles.headerActions}>
              <TouchableOpacity 
                onPress={handleSearchMessages}
                style={styles.menuButtonCircle}
              >
                <SearchNormal1 size={20} color={theme.colors.text.primary} />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowMenu(true);
                }}
                style={styles.menuButtonCircle}
              >
                <ThreeDotsIcon size={20} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Search Bar */}
      {showSearchBar && (
        <View style={styles.searchBar}>
          <SearchNormal1 size={16} color={theme.colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor={theme.colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity onPress={() => {
            setShowSearchBar(false);
            setSearchQuery('');
          }}>
            <CloseCircle size={20} color={theme.colors.text.secondary} variant="Bold" />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Row: Seller info and Item preview */}
      <View style={styles.headerBottomRow}>
          {/* Left: Seller info */}
          <View style={styles.sellerInfoSection}>
            <Image source={{ uri: contactAvatar }} style={styles.sellerAvatar} />
            
            <View style={styles.sellerDetails}>
              <View style={styles.sellerNameRow}>
                <Text style={styles.sellerName}>{contactName}</Text>
                {isVerified && (
                  <TickCircle size={16} color="#10B981" variant="Bold" />
                )}
              </View>
              <View style={styles.sellerMeta}>
                <Star1 size={14} color="#F59E0B" variant="Bold" />
                <Text style={styles.ratingText}>{contactRating}</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Location size={14} color={theme.colors.primary.start} variant="Bold" />
                <Text style={styles.locationText}>{contactLocation}</Text>
              </View>
            </View>
          </View>

          {/* Right: Item preview - Tappable */}
          <TouchableOpacity 
            style={styles.itemPreview}
            onPress={handleViewItem}
            activeOpacity={0.7}
          >
            <Image source={{ uri: itemImage }} style={styles.itemImage} />
            <View style={styles.priceOverlay}>
              <Text style={styles.priceText}>${itemPrice}</Text>
            </View>
          </TouchableOpacity>
        </View>

      {/* Chat Area */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            // Empty State
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Send2 size={48} color={theme.colors.primary.start} variant="Bold" />
              </View>
              <Text style={styles.emptyTitle}>Start the conversation</Text>
              <Text style={styles.emptySubtitle}>
                Send a message to {contactName} about this item
              </Text>
            </View>
          ) : (
            // Messages
            messages.map((msg) => (
              <TouchableOpacity
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.sender === 'buyer' ? styles.buyerMessage : styles.sellerMessage,
                ]}
                onLongPress={() => handleLongPressMessage(msg)}
                activeOpacity={0.9}
                delayLongPress={500}
              >
                {msg.type === 'image' ? (
                  // Image Message
                  <View style={[
                    styles.imageMessageContainer,
                    msg.sender === 'buyer' ? styles.buyerImageMessage : styles.sellerImageMessage
                  ]}>
                    <TouchableOpacity 
                      onPress={() => handleImagePress(msg.imageUri!)}
                      activeOpacity={0.9}
                    >
                      <Image 
                        source={{ uri: msg.imageUri }} 
                        style={styles.messageImage}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    {msg.text && msg.text !== "Photo from camera" && msg.text !== "Photo from gallery" && (
                      <Text style={[
                        styles.imageCaption,
                        msg.sender === 'buyer' ? styles.buyerImageCaption : styles.sellerImageCaption
                      ]}>
                        {msg.text}
                      </Text>
                    )}
                    <Text style={[
                      styles.imageTimestamp,
                      msg.sender === 'buyer' ? styles.buyerImageTimestamp : styles.sellerImageTimestamp
                    ]}>
                      {msg.timestamp}
                    </Text>
                  </View>
                ) : msg.type === 'offer' ? (
                  // Offer Message
                  <View style={[
                    styles.offerCard,
                    msg.sender === 'buyer' ? styles.buyerOfferCard : styles.sellerOfferCard
                  ]}>
                    <View style={styles.offerHeader}>
                      <Text style={styles.offerLabel}>
                        {msg.sender === 'buyer' ? 'Your Offer' : 'Counter Offer'}
                      </Text>
                      <View style={[
                        styles.offerStatusBadge,
                        msg.offerStatus === 'pending' && styles.offerPending,
                        msg.offerStatus === 'accepted' && styles.offerAccepted,
                        msg.offerStatus === 'declined' && styles.offerDeclined,
                        msg.offerStatus === 'countered' && styles.offerCountered,
                      ]}>
                        <Text style={styles.offerStatusText}>
                          {msg.offerStatus === 'pending' && '⏳ Pending'}
                          {msg.offerStatus === 'accepted' && '✓ Accepted'}
                          {msg.offerStatus === 'declined' && '✗ Declined'}
                          {msg.offerStatus === 'countered' && '↔ Counter'}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.offerAmount}>${msg.offerAmount}</Text>
                    <Text style={styles.offerOriginalPrice}>
                      Original: ${itemPrice}
                    </Text>
                    
                    {msg.sender === 'seller' && msg.offerStatus === 'countered' && (
                      <View style={styles.offerActions}>
                        <TouchableOpacity 
                          style={styles.offerTextButton}
                          onPress={() => handleOfferAction(msg.id, 'accept')}
                        >
                          <Text style={styles.offerAcceptText}>Accept Offer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.offerTextButton}
                          onPress={() => handleOfferAction(msg.id, 'decline')}
                        >
                          <Text style={styles.offerDeclineText}>Decline Offer</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    
                    <Text style={styles.offerTimestamp}>{msg.timestamp}</Text>
                  </View>
                ) : msg.sender === 'buyer' ? (
                  // Regular Buyer Message
                  <LinearGradient
                    colors={theme.colors.primary.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buyerMessageGradient}
                  >
                    <Text style={styles.buyerMessageText}>
                      {msg.text}
                    </Text>
                    <View style={styles.messageFooter}>
                      <Text style={styles.buyerTimestamp}>
                        {msg.timestamp}
                      </Text>
                      <TickSquare size={14} color="rgba(255, 255, 255, 0.8)" variant="Bold" />
                    </View>
                  </LinearGradient>
                ) : (
                  // Regular Seller Message
                  <>
                    <Text style={styles.sellerMessageText}>
                      {msg.text}
                    </Text>
                    <Text style={styles.sellerTimestamp}>
                      {msg.timestamp}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            ))
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingIndicator}>
              <View style={styles.typingDot} />
              <View style={[styles.typingDot, styles.typingDot2]} />
              <View style={[styles.typingDot, styles.typingDot3]} />
              <Text style={styles.typingText}>{contactName} is typing...</Text>
            </View>
          )}
        </ScrollView>

        {/* Quick Messages */}
        {showQuickMessages && (
          <View style={styles.quickMessagesContainer}>
            <Text style={styles.quickMessagesTitle}>Quick messages:</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickMessages}
            >
              {QUICK_MESSAGES.map((quickMsg, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickMessageButton}
                  onPress={() => handleQuickMessage(quickMsg)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.quickMessageText}>{quickMsg}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Area */}
        <SafeAreaView edges={['bottom']} style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            {/* Make Offer Button */}
            <TouchableOpacity
              onPress={handleMakeOffer}
              style={styles.offerButton}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.offerButtonGradient}
              >
                <Text style={styles.offerButtonText}>💰</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Input with Image Picker Inside */}
            <View style={styles.inputContainer2}>
              <TouchableOpacity
                onPress={handleImagePicker}
                style={styles.imagePickerInsideButton}
                activeOpacity={0.7}
              >
                <Gallery size={20} color="#9CA3AF" variant="Linear" />
              </TouchableOpacity>
              
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                placeholderTextColor={theme.colors.text.secondary}
                maxLength={500}
              />
            </View>

            <TouchableOpacity
              onPress={handleSendMessage}
              style={[
                styles.sendButton,
                !message.trim() && styles.sendButtonDisabled,
              ]}
              disabled={!message.trim()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={message.trim() ? theme.colors.primary.gradient : ['#E5E7EB', '#E5E7EB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sendButtonGradient}
              >
                <Send2 
                  size={20} 
                  color={message.trim() ? '#FFFFFF' : '#9CA3AF'} 
                  variant="Bold" 
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* Menu Bottom Sheet */}
      <Modal visible={showMenu} transparent animationType="slide" onRequestClose={() => setShowMenu(false)}>
        <Pressable 
          style={styles.menuOverlay} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowMenu(false);
          }}
        >
          <Pressable style={styles.menuSheet} onPress={(e) => e.stopPropagation()}>
            <SafeAreaView edges={['bottom']}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Options</Text>
                <TouchableOpacity 
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowMenu(false);
                  }}
                >
                  <CloseCircle size={28} color={theme.colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.menuItem} 
                activeOpacity={0.7}
                onPress={() => {
                  setShowMenu(false);
                  setShowSettings(true);
                }}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
                  <InfoCircle size={22} color="#3B82F6" variant="Bold" />
                </View>
                <Text style={styles.menuItemText}>Conversation Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.menuItem} 
                activeOpacity={0.7}
                onPress={handleShareLocation}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(139, 92, 246, 0.15)' }]}>
                  <Location size={22} color="#8B5CF6" variant="Bold" />
                </View>
                <Text style={styles.menuItemText}>Share Location</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.menuItem} 
                activeOpacity={0.7}
                onPress={handleHelp}
              >
                <View style={[styles.menuIconContainer, styles.menuIconHelp]}>
                  <MessageQuestion size={22} color="#10B981" variant="Bold" />
                </View>
                <Text style={styles.menuItemText}>Help & Support</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.menuItem} 
                activeOpacity={0.7}
                onPress={handleBlock}
              >
                <View style={[styles.menuIconContainer, styles.menuIconBlock]}>
                  <Lock1 size={22} color="#F59E0B" variant="Bold" />
                </View>
                <Text style={styles.menuItemText}>Block User</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.menuItem} 
                activeOpacity={0.7}
                onPress={handleReport}
              >
                <View style={[styles.menuIconContainer, styles.menuIconReport]}>
                  <Danger size={22} color="#EF4444" variant="Bold" />
                </View>
                <Text style={styles.menuItemText}>Report</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Help Modal */}
      <Modal visible={showHelpModal} transparent animationType="slide" onRequestClose={() => setShowHelpModal(false)}>
        <Pressable 
          style={styles.menuOverlay} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowHelpModal(false);
          }}
        >
          <Pressable style={styles.helpSheet} onPress={(e) => e.stopPropagation()}>
            <SafeAreaView edges={['bottom']}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>How can we help?</Text>
                <TouchableOpacity 
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowHelpModal(false);
                  }}
                >
                  <CloseCircle size={28} color={theme.colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.helpOption} 
                activeOpacity={0.7}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowHelpModal(false);
                  // Navigate to support page (to be implemented)
                  Alert.alert('Support', 'Opening support chat...');
                }}
              >
                <View style={styles.helpIconContainer}>
                  <MessageQuestion size={24} color={theme.colors.primary.start} variant="Bold" />
                </View>
                <View style={styles.helpTextContainer}>
                  <Text style={styles.helpOptionTitle}>Contact Support</Text>
                  <Text style={styles.helpOptionDescription}>
                    Chat with our support team for assistance
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.helpOption} 
                activeOpacity={0.7}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowHelpModal(false);
                  // Open documentation (to be implemented)
                  Alert.alert('Documentation', 'Opening help documentation...');
                }}
              >
                <View style={styles.helpIconContainer}>
                  <Book size={24} color={theme.colors.primary.start} variant="Bold" />
                </View>
                <View style={styles.helpTextContainer}>
                  <Text style={styles.helpOptionTitle}>Help Documentation</Text>
                  <Text style={styles.helpOptionDescription}>
                    Browse guides and FAQs
                  </Text>
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Make Offer Modal */}
      <Modal visible={showOfferModal} transparent animationType="slide" onRequestClose={() => setShowOfferModal(false)}>
        <Pressable 
          style={styles.menuOverlay} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowOfferModal(false);
          }}
        >
          <Pressable style={styles.offerModal} onPress={(e) => e.stopPropagation()}>
            <SafeAreaView edges={['bottom']}>
              <View style={styles.offerModalHeader}>
                <Text style={styles.offerModalTitle}>Make an Offer</Text>
                <TouchableOpacity 
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowOfferModal(false);
                  }}
                >
                  <CloseCircle size={28} color={theme.colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.offerModalContent}>
                <Text style={styles.offerModalLabel}>Item Price: ${itemPrice}</Text>
                <Text style={styles.offerModalSubtext}>Enter your offer amount</Text>
                
                <View style={styles.offerInputContainer}>
                  <Text style={styles.offerCurrencySymbol}>$</Text>
                  <TextInput
                    style={styles.offerInput}
                    value={offerAmount}
                    onChangeText={setOfferAmount}
                    placeholder="0.00"
                    placeholderTextColor={theme.colors.text.secondary}
                    keyboardType="decimal-pad"
                    autoFocus
                  />
                </View>

                <TouchableOpacity
                  style={styles.submitOfferButton}
                  onPress={handleSubmitOffer}
                  disabled={!offerAmount.trim()}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={offerAmount.trim() ? theme.colors.primary.gradient : ['#E5E7EB', '#E5E7EB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.submitOfferGradient}
                  >
                    <Text style={[
                      styles.submitOfferText,
                      !offerAmount.trim() && styles.submitOfferTextDisabled
                    ]}>
                      Send Offer
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Image Picker Modal */}
      <Modal visible={showImagePicker} transparent animationType="slide" onRequestClose={() => setShowImagePicker(false)}>
        <Pressable 
          style={styles.menuOverlay} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowImagePicker(false);
          }}
        >
          <Pressable style={styles.imagePickerModal} onPress={(e) => e.stopPropagation()}>
            <SafeAreaView edges={['bottom']}>
              <View style={styles.imagePickerHeader}>
                <Text style={styles.imagePickerTitle}>Send Photo</Text>
                <TouchableOpacity 
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowImagePicker(false);
                  }}
                >
                  <CloseCircle size={28} color={theme.colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.imagePickerOptions}>
                <TouchableOpacity 
                  style={styles.imagePickerOption} 
                  activeOpacity={0.7}
                  onPress={handleSelectCamera}
                >
                  <View style={styles.imagePickerIconContainer}>
                    <Camera size={32} color={theme.colors.primary.start} variant="Bold" />
                  </View>
                  <Text style={styles.imagePickerOptionText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.imagePickerOption} 
                  activeOpacity={0.7}
                  onPress={handleSelectGallery}
                >
                  <View style={styles.imagePickerIconContainer}>
                    <Gallery size={32} color={theme.colors.primary.start} variant="Bold" />
                  </View>
                  <Text style={styles.imagePickerOptionText}>Choose from Gallery</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Message Actions Modal */}
      <Modal visible={showMessageActions} transparent animationType="fade" onRequestClose={() => setShowMessageActions(false)}>
        <Pressable 
          style={styles.menuOverlay} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowMessageActions(false);
          }}
        >
          <View style={styles.messageActionsModal}>
            {/* Reactions */}
            <View style={styles.reactionsRow}>
              {['👍', '❤️', '😊', '🎉'].map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={styles.reactionButton}
                  onPress={() => handleReaction(emoji)}
                >
                  <Text style={styles.reactionEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Actions */}
            <View style={styles.messageActionsList}>
              <TouchableOpacity style={styles.messageActionItem} onPress={handleCopyMessage}>
                <Text style={styles.messageActionText}>Copy</Text>
              </TouchableOpacity>
              {selectedMessage?.sender === 'buyer' && (
                <TouchableOpacity style={styles.messageActionItem} onPress={handleDeleteMessage}>
                  <Text style={[styles.messageActionText, styles.messageActionDanger]}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Conversation Settings Modal */}
      <Modal visible={showSettings} transparent animationType="slide" onRequestClose={() => setShowSettings(false)}>
        <Pressable 
          style={styles.menuOverlay} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowSettings(false);
          }}
        >
          <Pressable style={styles.settingsModal} onPress={(e) => e.stopPropagation()}>
            <SafeAreaView edges={['bottom']}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Conversation Settings</Text>
                <TouchableOpacity 
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowSettings(false);
                  }}
                >
                  <CloseCircle size={28} color={theme.colors.text.secondary} />
                </TouchableOpacity>
              </View>

              {/* Read Receipts Toggle */}
              <TouchableOpacity 
                style={styles.settingItem} 
                activeOpacity={0.7}
                onPress={handleToggleReadReceipts}
              >
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Read Receipts</Text>
                  <Text style={styles.settingDescription}>
                    Let others know when you've read their messages
                  </Text>
                </View>
                <View style={[styles.toggle, readReceipts && styles.toggleActive]}>
                  <View style={[styles.toggleThumb, readReceipts && styles.toggleThumbActive]} />
                </View>
              </TouchableOpacity>

              {/* Mute Toggle */}
              <TouchableOpacity 
                style={styles.settingItem} 
                activeOpacity={0.7}
                onPress={handleToggleMute}
              >
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Mute Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Stop receiving notifications from this conversation
                  </Text>
                </View>
                <View style={[styles.toggle, isMuted && styles.toggleActive]}>
                  <View style={[styles.toggleThumb, isMuted && styles.toggleThumbActive]} />
                </View>
              </TouchableOpacity>

              {/* Archive Button */}
              <TouchableOpacity 
                style={styles.settingButton} 
                activeOpacity={0.7}
                onPress={handleArchive}
              >
                <Text style={styles.settingButtonText}>Archive Conversation</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  headerGradient: {
    // Gradient covers status bar and top row
  },
  header: {
    backgroundColor: 'transparent',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: theme.spacing.md,
  },
  menuButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  headerBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
    ...theme.shadows.sm,
  },
  sellerInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.md,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  sellerName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  sellerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginLeft: 2,
  },
  dotSeparator: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginHorizontal: 4,
  },
  locationText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginLeft: 2,
  },
  itemPreview: {
    marginLeft: theme.spacing.md,
    position: 'relative',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.lg,
  },
  priceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl * 2,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    overflow: 'hidden',
  },
  buyerMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  buyerMessageGradient: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderBottomRightRadius: 4,
  },
  sellerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: 20,
    marginBottom: 4,
  },
  buyerMessageText: {
    color: theme.colors.text.white,
    fontSize: theme.typography.fontSize.md,
    lineHeight: 20,
    marginBottom: 4,
  },
  sellerMessageText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.md,
    lineHeight: 20,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: theme.typography.fontSize.xs,
    alignSelf: 'flex-end',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 2,
  },
  buyerTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: theme.typography.fontSize.xs,
  },
  sellerTimestamp: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.xs,
    alignSelf: 'flex-end',
  },
  quickMessagesContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  quickMessagesTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  quickMessages: {
    gap: theme.spacing.sm,
  },
  quickMessageButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: '#F3F4F6',
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
  },
  quickMessageText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  },
  inputContainer: {
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  inputContainer2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: theme.borderRadius.lg,
    paddingLeft: theme.spacing.xs,
  },
  imagePickerInsideButton: {
    padding: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 44,
    paddingRight: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuSheet: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    paddingTop: theme.spacing.lg,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  menuTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconHelp: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)', // Soft green
  },
  menuIconBlock: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)', // Soft yellow
  },
  menuIconReport: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)', // Soft red
  },
  menuItemText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.primary,
    flex: 1,
  },
  // Help Modal Styles
  helpSheet: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    marginTop: 'auto',
    maxHeight: '50%',
  },
  helpOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  helpIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpTextContainer: {
    flex: 1,
  },
  helpOptionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  helpOptionDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  // Offer Button (in input area)
  offerButton: {
    width: 44,
    height: 44,
  },
  offerButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerButtonText: {
    fontSize: 20,
  },
  // Offer Card (in messages)
  offerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary.start,
    ...theme.shadows.md,
  },
  buyerOfferCard: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  sellerOfferCard: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    borderColor: '#F59E0B',
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  offerLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
  },
  offerStatusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  offerPending: {
    backgroundColor: '#FEF3C7',
  },
  offerAccepted: {
    backgroundColor: '#D1FAE5',
  },
  offerDeclined: {
    backgroundColor: '#FEE2E2',
  },
  offerCountered: {
    backgroundColor: '#DBEAFE',
  },
  offerStatusText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
  },
  offerAmount: {
    fontSize: 32,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.start,
    marginVertical: theme.spacing.xs,
  },
  offerOriginalPrice: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textDecorationLine: 'line-through',
    marginBottom: theme.spacing.md,
  },
  offerActions: {
    flexDirection: 'column',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
    paddingTop: theme.spacing.md,
  },
  offerTextButton: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  offerAcceptText: {
    color: '#10B981',
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  offerDeclineText: {
    color: '#EF4444',
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  offerTimestamp: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.sm,
    textAlign: 'right',
  },
  // Offer Modal
  offerModal: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    marginTop: 'auto',
    maxHeight: '60%',
  },
  offerModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  offerModalTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  offerModalContent: {
    padding: theme.spacing.xl,
  },
  offerModalLabel: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  offerModalSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  offerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  offerCurrencySymbol: {
    fontSize: 32,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.sm,
  },
  offerInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing.lg,
  },
  submitOfferButton: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  submitOfferGradient: {
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  submitOfferText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  submitOfferTextDisabled: {
    color: '#9CA3AF',
  },
  // Image Messages
  imageMessageContainer: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    maxWidth: '75%',
  },
  buyerImageMessage: {
    alignSelf: 'flex-end',
  },
  sellerImageMessage: {
    alignSelf: 'flex-start',
  },
  messageImage: {
    width: 250,
    height: 250,
    borderRadius: theme.borderRadius.lg,
  },
  imageCaption: {
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
  },
  buyerImageCaption: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    color: theme.colors.text.primary,
  },
  sellerImageCaption: {
    backgroundColor: '#F3F4F6',
    color: theme.colors.text.primary,
  },
  imageTimestamp: {
    fontSize: theme.typography.fontSize.xs,
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
  },
  buyerImageTimestamp: {
    color: theme.colors.primary.start,
    textAlign: 'right',
  },
  sellerImageTimestamp: {
    color: theme.colors.text.secondary,
    textAlign: 'left',
  },
  // Image Picker Modal
  imagePickerModal: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    marginTop: 'auto',
    maxHeight: '40%',
  },
  imagePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  imagePickerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  imagePickerOptions: {
    flexDirection: 'row',
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  imagePickerOption: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
  },
  imagePickerIconContainer: {
    marginBottom: theme.spacing.sm,
  },
  imagePickerOptionText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  // Typing Indicator
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.text.secondary,
  },
  typingDot2: {
    opacity: 0.7,
  },
  typingDot3: {
    opacity: 0.4,
  },
  typingText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
    marginLeft: theme.spacing.xs,
  },
  // Message Actions Modal
  messageActionsModal: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    marginHorizontal: theme.spacing.xl,
    marginTop: 'auto',
    marginBottom: 'auto',
    ...theme.shadows.lg,
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  reactionButton: {
    padding: theme.spacing.sm,
  },
  reactionEmoji: {
    fontSize: 32,
  },
  messageActionsList: {
    paddingVertical: theme.spacing.sm,
  },
  messageActionItem: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  messageActionText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  messageActionDanger: {
    color: '#EF4444',
  },
  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  // Settings Modal
  settingsModal: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    marginTop: 'auto',
    maxHeight: '70%',
    paddingTop: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  settingTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: theme.colors.primary.start,
  },
  toggleThumb: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    ...theme.shadows.sm,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  settingButton: {
    marginHorizontal: theme.spacing.xl,
    marginVertical: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
  },
  settingButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#EF4444',
  },
});
