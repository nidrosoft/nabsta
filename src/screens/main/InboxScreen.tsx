/**
 * InboxScreen Component
 * Messages and conversations
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
  TextInput,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import {
  SearchNormal1,
  Star1,
  TickSquare,
  CloseCircle,
  Trash,
  Archive,
  MessageEdit,
} from 'iconsax-react-native';
import { ThreeDotsIcon } from '../../components/common';
import { InboxStackParamList } from '../../types/navigation';
import { theme } from '../../theme';

type InboxNavigationProp = NativeStackNavigationProp<InboxStackParamList, 'InboxMain'>;

type FilterTab = 'all' | 'buying' | 'selling';

interface Conversation {
  id: string;
  itemTitle: string;
  itemPrice: number;
  itemImage: string;
  contactName: string;
  contactAvatar: string;
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
  unreadCount: number;
  isStarred: boolean;
  isPinned: boolean;
  isDelivered: boolean;
  type: 'buying' | 'selling';
}

// Mock data with realistic conversations
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    itemTitle: 'iPhone 13 Pro Max 256GB',
    itemPrice: 299.99,
    itemImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    contactName: 'John Doe',
    contactAvatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'That sounds good! When can we meet?',
    timestamp: '2h ago',
    isRead: true,
    unreadCount: 0,
    isStarred: true,
    isPinned: true,
    isDelivered: true,
    type: 'buying',
  },
  {
    id: '2',
    itemTitle: 'MacBook Pro M2 14"',
    itemPrice: 899,
    itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    contactName: 'Sarah Smith',
    contactAvatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Is this still available? I\'m very interested!',
    timestamp: '5h ago',
    isRead: false,
    unreadCount: 2,
    isStarred: false,
    isPinned: false,
    isDelivered: false,
    type: 'selling',
  },
  {
    id: '3',
    itemTitle: 'Sony WH-1000XM5 Headphones',
    itemPrice: 199,
    itemImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',
    contactName: 'Mike Johnson',
    contactAvatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Perfect! I\'ll take them. Can you ship?',
    timestamp: '1d ago',
    isRead: true,
    unreadCount: 0,
    isStarred: false,
    isPinned: false,
    isDelivered: true,
    type: 'selling',
  },
  {
    id: '4',
    itemTitle: 'Nintendo Switch OLED',
    itemPrice: 249,
    itemImage: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&q=80',
    contactName: 'Emily Chen',
    contactAvatar: 'https://i.pravatar.cc/150?img=9',
    lastMessage: 'Would you accept $230?',
    timestamp: '1d ago',
    isRead: false,
    unreadCount: 1,
    isStarred: true,
    isPinned: false,
    isDelivered: false,
    type: 'buying',
  },
  {
    id: '5',
    itemTitle: 'Canon EOS R6 Camera',
    itemPrice: 1499,
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
    contactName: 'David Lee',
    contactAvatar: 'https://i.pravatar.cc/150?img=13',
    lastMessage: 'Thanks for the quick response!',
    timestamp: '2d ago',
    isRead: true,
    unreadCount: 0,
    isStarred: false,
    isPinned: false,
    isDelivered: true,
    type: 'buying',
  },
  {
    id: '6',
    itemTitle: 'iPad Air 5th Gen',
    itemPrice: 449,
    itemImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
    contactName: 'Lisa Wang',
    contactAvatar: 'https://i.pravatar.cc/150?img=10',
    lastMessage: 'Can I see more photos?',
    timestamp: '3d ago',
    isRead: true,
    unreadCount: 0,
    isStarred: false,
    isPinned: false,
    isDelivered: true,
    type: 'selling',
  },
  {
    id: '7',
    itemTitle: 'PS5 Console + 2 Controllers',
    itemPrice: 399,
    itemImage: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80',
    contactName: 'Tom Brown',
    contactAvatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'Great! I\'ll pick it up tomorrow.',
    timestamp: '1w ago',
    isRead: true,
    unreadCount: 0,
    isStarred: false,
    isPinned: false,
    isDelivered: true,
    type: 'selling',
  },
];

export const InboxScreen: React.FC = () => {
  const navigation = useNavigation<InboxNavigationProp>();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterUnread, setFilterUnread] = useState(false);
  const [filterStarred, setFilterStarred] = useState(false);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const searchWidth = useRef(new Animated.Value(36)).current; // Start with button size

  // Count conversations by type
  const buyingCount = conversations.filter(c => c.type === 'buying').length;
  const sellingCount = conversations.filter(c => c.type === 'selling').length;

  const handleSearchToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (isSearchExpanded) {
      // Collapse
      Animated.timing(searchWidth, {
        toValue: 36,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsSearchExpanded(false);
        setSearchQuery('');
      });
    } else {
      // Expand
      setIsSearchExpanded(true);
      Animated.timing(searchWidth, {
        toValue: 250,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleConversationPress = (conversation: Conversation) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Chat', {
      conversationId: conversation.id,
      itemTitle: conversation.itemTitle,
      itemPrice: conversation.itemPrice,
      itemImage: conversation.itemImage,
      contactName: conversation.contactName,
      contactAvatar: conversation.contactAvatar,
      contactRating: 4.9,
      contactLocation: 'San Francisco, CA',
      isVerified: true,
      conversationType: conversation.type,
    });
  };

  const handleLongPressConversation = (conversation: Conversation) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Conversation Actions',
      `Manage conversation with ${conversation.contactName}`,
      [
        {
          text: 'Mark as Read',
          onPress: () => {
            setConversations(conversations.map(c => 
              c.id === conversation.id ? { ...c, isRead: true, unreadCount: 0 } : c
            ));
            Alert.alert('Success', 'Marked as read');
          },
        },
        {
          text: conversation.isStarred ? 'Unstar' : 'Star',
          onPress: () => {
            setConversations(conversations.map(c => 
              c.id === conversation.id ? { ...c, isStarred: !c.isStarred } : c
            ));
            Alert.alert('Success', conversation.isStarred ? 'Removed star' : 'Added star');
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteConversation(conversation.id),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleDeleteConversation = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setConversations(conversations.filter(c => c.id !== id));
    Alert.alert('Deleted', 'Conversation deleted');
  };

  const handleArchiveConversation = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setConversations(conversations.filter(c => c.id !== id));
    Alert.alert('Archived', 'Conversation archived');
  };

  const handleMarkAllRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setConversations(conversations.map(c => ({ ...c, isRead: true, unreadCount: 0 })));
    Alert.alert('Success', 'All conversations marked as read');
  };

  // Filter conversations based on active tab, search query, and advanced filters
  const filteredConversations = conversations.filter((conv) => {
    // Filter by tab
    const matchesTab = activeTab === 'all' || conv.type === activeTab;
    
    // Filter by search query
    const matchesSearch = searchQuery.trim() === '' || 
      conv.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Advanced filters
    const matchesUnread = !filterUnread || !conv.isRead;
    const matchesStarred = !filterStarred || conv.isStarred;
    
    return matchesTab && matchesSearch && matchesUnread && matchesStarred;
  });

  // Group conversations by time
  const groupedConversations = () => {
    const today: Conversation[] = [];
    const thisWeek: Conversation[] = [];
    const older: Conversation[] = [];

    // Sort pinned items first
    const sorted = [...filteredConversations].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

    sorted.forEach((conv) => {
      if (conv.timestamp.includes('h ago') || conv.timestamp.includes('m ago')) {
        today.push(conv);
      } else if (conv.timestamp.includes('d ago') && !conv.timestamp.includes('w ago')) {
        thisWeek.push(conv);
      } else {
        older.push(conv);
      }
    });

    const sections = [];
    if (today.length > 0) sections.push({ title: 'Today', data: today });
    if (thisWeek.length > 0) sections.push({ title: 'This Week', data: thisWeek });
    if (older.length > 0) sections.push({ title: 'Older', data: older });

    return sections;
  };

  const renderConversationCard = (conversation: Conversation) => (
    <TouchableOpacity
      key={conversation.id}
      style={[
        styles.conversationCard,
        !conversation.isRead && styles.unreadCard,
        conversation.isPinned && styles.pinnedCard,
      ]}
      activeOpacity={0.7}
      onPress={() => handleConversationPress(conversation)}
      onLongPress={() => handleLongPressConversation(conversation)}
      delayLongPress={500}
    >
      {conversation.isPinned && (
        <LinearGradient
          colors={theme.colors.primary.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.pinnedAccent}
        />
      )}

      <View style={styles.cardContent}>
        {/* Item Image */}
        <Image source={{ uri: conversation.itemImage }} style={styles.itemThumbnail} />

        {/* Conversation Details */}
        <View style={styles.conversationDetails}>
          {/* Top Row: Item Title & Price */}
          <View style={styles.topRow}>
            <Text
              style={[styles.itemTitle, !conversation.isRead && styles.unreadText]}
              numberOfLines={1}
            >
              {conversation.itemTitle}
            </Text>
            <Text style={styles.itemPrice}>${conversation.itemPrice}</Text>
          </View>

          {/* Middle Row: Contact & Time */}
          <View style={styles.middleRow}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{conversation.contactName}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.timestamp}>{conversation.timestamp}</Text>
            </View>
            {conversation.isStarred && (
              <Star1 size={16} color="#F59E0B" variant="Bold" />
            )}
          </View>

          {/* Bottom Row: Last Message */}
          <Text
            style={[styles.lastMessage, !conversation.isRead && styles.unreadMessage]}
            numberOfLines={1}
          >
            {conversation.lastMessage}
          </Text>

          {/* Status Row */}
          <View style={styles.statusRow}>
            {conversation.isRead && conversation.isDelivered && (
              <View style={styles.deliveryStatus}>
                <TickSquare size={14} color="#10B981" variant="Bold" />
                <Text style={styles.deliveryText}>Read</Text>
              </View>
            )}
            {!conversation.isRead && conversation.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>
                  {conversation.unreadCount} new {conversation.unreadCount === 1 ? 'message' : 'messages'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={theme.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={['top']} style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Inbox</Text>
            <View style={styles.headerActions}>
              {/* Animated Search */}
              <Animated.View style={[styles.searchContainer, { width: searchWidth }]}>
                {isSearchExpanded ? (
                  <View style={styles.searchInputContainer}>
                    <SearchNormal1 size={16} color={theme.colors.text.secondary} />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search conversations..."
                      placeholderTextColor={theme.colors.text.secondary}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      autoFocus
                    />
                    <TouchableOpacity onPress={handleSearchToggle}>
                      <CloseCircle size={20} color={theme.colors.text.secondary} variant="Bold" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.headerButton} onPress={handleSearchToggle}>
                    <SearchNormal1 size={20} color={theme.colors.text.primary} />
                  </TouchableOpacity>
                )}
              </Animated.View>
              
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  handleMarkAllRead();
                }}
              >
                <MessageEdit size={20} color={theme.colors.text.primary} variant="Bold" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowAdvancedFilters(!showAdvancedFilters);
                }}
              >
                <ThreeDotsIcon size={20} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterTabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'all' && styles.activeTab]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveTab('all');
              }}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'buying' && styles.activeTab]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveTab('buying');
              }}
            >
              <View style={styles.tabContent}>
                <Text style={[styles.tabText, activeTab === 'buying' && styles.activeTabText]}>
                  Buying
                </Text>
                {buyingCount > 0 && (
                  <View style={[styles.countBadge, activeTab === 'buying' && styles.countBadgeActive]}>
                    <Text style={[styles.countBadgeText, activeTab === 'buying' && styles.countBadgeTextActive]}>
                      {buyingCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'selling' && styles.activeTab]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveTab('selling');
              }}
            >
              <View style={styles.tabContent}>
                <Text style={[styles.tabText, activeTab === 'selling' && styles.activeTabText]}>
                  Selling
                </Text>
                {sellingCount > 0 && (
                  <View style={[styles.countBadge, activeTab === 'selling' && styles.countBadgeActive]}>
                    <Text style={[styles.countBadgeText, activeTab === 'selling' && styles.countBadgeTextActive]}>
                      {sellingCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <View style={styles.advancedFilters}>
              <TouchableOpacity
                style={[styles.filterChip, filterUnread && styles.filterChipActive]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setFilterUnread(!filterUnread);
                }}
              >
                <Text style={[styles.filterChipText, filterUnread && styles.filterChipTextActive]}>
                  Unread Only
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filterChip, filterStarred && styles.filterChipActive]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setFilterStarred(!filterStarred);
                }}
              >
                <Star1 
                  size={16} 
                  color={filterStarred ? '#FFFFFF' : theme.colors.text.secondary} 
                  variant={filterStarred ? 'Bold' : 'Linear'}
                />
                <Text style={[styles.filterChipText, filterStarred && styles.filterChipTextActive]}>
                  Starred
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </LinearGradient>

      {/* Conversations List */}
      <SectionList
        sections={groupedConversations()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderConversationCard(item)}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background like account screen
  },
  headerGradient: {
    // Gradient covers status bar and header
  },
  header: {
    backgroundColor: 'transparent',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  searchContainer: {
    height: 36,
    overflow: 'hidden',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: 18,
    paddingHorizontal: theme.spacing.sm,
    gap: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    paddingVertical: 0,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  tab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeTab: {
    backgroundColor: theme.colors.background.primary,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  tabText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeTabText: {
    color: theme.colors.text.primary,
  },
  countBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeActive: {
    backgroundColor: theme.colors.primary.start,
  },
  countBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  countBadgeTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  sectionHeader: {
    paddingVertical: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  conversationCard: {
    backgroundColor: '#FFFFFF', // Pure white for cards like account screen
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  unreadCard: {
    ...theme.shadows.md,
  },
  pinnedCard: {
    // Pinned styling handled by gradient accent
  },
  pinnedAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  itemThumbnail: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  conversationDetails: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  itemTitle: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.sm,
  },
  unreadText: {
    fontWeight: theme.typography.fontWeight.bold,
  },
  itemPrice: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.start,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactName: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
  },
  dot: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  timestamp: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  lastMessage: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  unreadMessage: {
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryText: {
    fontSize: theme.typography.fontSize.xs,
    color: '#10B981',
    fontWeight: theme.typography.fontWeight.medium,
  },
  unreadBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  unreadBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: '#EF4444',
    fontWeight: theme.typography.fontWeight.semibold,
  },
  // Advanced Filters
  advancedFilters: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary.start,
    borderColor: theme.colors.primary.start,
  },
  filterChipText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
});
