/**
 * ListingDetailScreen
 * Detailed view of a listing for buyers
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ImageView from 'react-native-image-viewing';
import {
  Heart,
  Location,
  Clock,
  Star1,
  TickCircle,
  Calendar,
  MessageText,
  DollarCircle,
  DocumentText,
  Profile,
  Truck,
  Notification,
  Save2,
  Warning2,
  Call,
  Sms,
  Global,
  ArrowDown2,
  ArrowUp2,
} from 'iconsax-react-native';
import { BackIcon, ShareIcon, ShareBottomSheet } from '../../components/common';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

interface ListingDetailScreenProps {
  onBack: () => void;
  onOpenChat?: () => void;
}

// Mock data - will be replaced with real data
const MOCK_LISTING = {
  id: '1',
  title: 'iPhone 13 Pro Max 256GB',
  price: 299.99,
  isNegotiable: true,
  condition: 'Like New',
  category: 'Electronics',
  quantity: 1,
  description: 'Barely used iPhone 13 Pro Max in excellent condition. Comes with original box, charger, and accessories. No scratches or dents. Battery health at 98%. Upgraded to newer model, so selling this one.',
  images: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    'https://images.unsplash.com/photo-1592286927505-2fd0d8e87b7c?w=800&q=80',
    'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=800&q=80',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80',
  ],
  location: {
    city: 'San Francisco',
    state: 'CA',
  },
  postedAt: '2 hours ago',
  seller: {
    name: 'John Doe',
    rating: 4.9,
    reviewCount: 156,
    avatar: 'https://i.pravatar.cc/150?img=12',
    isVerified: true,
    memberSince: 'Jan 2024',
    phoneNumber: '+1 (555) 123-4567',
  },
  isBusiness: false,
  businessInfo: {
    name: 'Tech Store Inc.',
    website: 'https://www.techstore.com',
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  },
  shipping: {
    localPickup: true,
    meetInPublic: true,
    shippingAvailable: true,
    shippingCost: 15,
  },
};

export const ListingDetailScreen: React.FC<ListingDetailScreenProps> = ({ onBack, onOpenChat }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showBusinessHours, setShowBusinessHours] = useState(false);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentImageIndex(index);
  };

  const imageViewerImages = MOCK_LISTING.images.map(uri => ({ uri }));

  return (
    <View style={styles.container}>
      {/* Image Gallery */}
      <View style={styles.imageGallery}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {MOCK_LISTING.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => {
                setCurrentImageIndex(index);
                setIsImageViewVisible(true);
              }}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {MOCK_LISTING.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentImageIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Floating Header Buttons */}
        <SafeAreaView edges={['top']} style={styles.floatingHeader}>
          <TouchableOpacity onPress={onBack} style={styles.floatingButton}>
            <BackIcon size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => setIsSaved(!isSaved)}
              style={styles.floatingButton}
            >
              <Heart
                size={24}
                color="#000000"
                variant={isSaved ? 'Bold' : 'Outline'}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.floatingButton}
              onPress={() => setShowShareSheet(true)}
            >
              <ShareIcon size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>${MOCK_LISTING.price.toFixed(2)}</Text>
          {MOCK_LISTING.isNegotiable && (
            <View style={styles.negotiableBadge}>
              <Text style={styles.negotiableText}>Negotiable</Text>
            </View>
          )}
        </View>

        {/* Title & Rating */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{MOCK_LISTING.title}</Text>
          <View style={styles.ratingRow}>
            <Star1 size={16} color="#F59E0B" variant="Bold" />
            <Text style={styles.rating}>
              {MOCK_LISTING.seller.rating} ({MOCK_LISTING.seller.reviewCount} reviews)
            </Text>
          </View>
        </View>

        {/* Location & Time */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Location size={18} color={theme.colors.primary.start} variant="Bold" />
            <Text style={styles.infoText}>
              {MOCK_LISTING.location.city}, {MOCK_LISTING.location.state}
            </Text>
          </View>
          <View style={styles.infoSeparator} />
          <View style={styles.infoItem}>
            <Clock size={18} color={theme.colors.primary.start} variant="Bold" />
            <Text style={styles.infoText}>{MOCK_LISTING.postedAt}</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Details Card */}
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Condition</Text>
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>{MOCK_LISTING.condition}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{MOCK_LISTING.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>{MOCK_LISTING.quantity} available</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Description */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <DocumentText size={20} color={theme.colors.primary.start} variant="Bold" />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          <Text 
            style={styles.description}
            numberOfLines={isDescriptionExpanded ? undefined : 3}
          >
            {MOCK_LISTING.description}
          </Text>
          <TouchableOpacity 
            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            style={styles.readMoreButton}
          >
            <Text style={styles.readMoreText}>
              {isDescriptionExpanded ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionDivider} />

        {/* Seller Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Profile size={20} color={theme.colors.primary.start} variant="Bold" />
            <Text style={styles.sectionTitle}>Seller Information</Text>
          </View>
          <View style={styles.sellerCard}>
            <Image source={{ uri: MOCK_LISTING.seller.avatar }} style={styles.avatar} />
            <View style={styles.sellerInfo}>
              <View style={styles.sellerNameRow}>
                <Text style={styles.sellerName}>{MOCK_LISTING.seller.name}</Text>
                {MOCK_LISTING.seller.isVerified && (
                  <TickCircle size={16} color="#10B981" variant="Bold" />
                )}
              </View>
              <View style={styles.sellerRating}>
                <Star1 size={14} color="#F59E0B" variant="Bold" />
                <Text style={styles.sellerRatingText}>
                  {MOCK_LISTING.seller.rating} ({MOCK_LISTING.seller.reviewCount} reviews)
                </Text>
              </View>
              <View style={styles.memberSince}>
                <Calendar size={14} color={theme.colors.text.secondary} />
                <Text style={styles.memberSinceText}>
                  Member since {MOCK_LISTING.seller.memberSince}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Business Information - Show only if business */}
        {MOCK_LISTING.isBusiness && MOCK_LISTING.businessInfo && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Global size={20} color={theme.colors.primary.start} variant="Bold" />
                <Text style={styles.sectionTitle}>Business Information</Text>
              </View>
              <View style={styles.businessCard}>
                <Text style={styles.businessName}>{MOCK_LISTING.businessInfo.name}</Text>
                {MOCK_LISTING.businessInfo.website && (
                  <TouchableOpacity style={styles.businessWebsite}>
                    <Global size={16} color={theme.colors.primary.start} />
                    <Text style={styles.websiteText}>{MOCK_LISTING.businessInfo.website}</Text>
                  </TouchableOpacity>
                )}
                
                {/* Business Hours */}
                <TouchableOpacity
                  style={styles.hoursToggle}
                  onPress={() => setShowBusinessHours(!showBusinessHours)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.hoursToggleText}>Hours of Operation</Text>
                  {showBusinessHours ? (
                    <ArrowUp2 size={20} color={theme.colors.text.primary} />
                  ) : (
                    <ArrowDown2 size={20} color={theme.colors.text.primary} />
                  )}
                </TouchableOpacity>

                {showBusinessHours && MOCK_LISTING.businessInfo.hours && (
                  <View style={styles.hoursContainer}>
                    {Object.entries(MOCK_LISTING.businessInfo.hours).map(([day, hours]) => (
                      <View key={day} style={styles.hourRow}>
                        <Text style={styles.dayText}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                        <Text style={styles.hoursText}>{hours}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.sectionDivider} />
          </>
        )}

        {/* Shipping & Pickup */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Truck size={20} color={theme.colors.primary.start} variant="Bold" />
            <Text style={styles.sectionTitle}>Shipping & Pickup</Text>
          </View>
          <View style={styles.shippingOptions}>
            {MOCK_LISTING.shipping.localPickup && (
              <View style={styles.shippingOption}>
                <TickCircle size={20} color="#10B981" variant="Bold" />
                <Text style={styles.shippingText}>Local pickup (Free)</Text>
              </View>
            )}
            {MOCK_LISTING.shipping.meetInPublic && (
              <View style={styles.shippingOption}>
                <TickCircle size={20} color="#10B981" variant="Bold" />
                <Text style={styles.shippingText}>Meet in public place</Text>
              </View>
            )}
            {MOCK_LISTING.shipping.shippingAvailable && (
              <View style={styles.shippingOption}>
                <TickCircle size={20} color="#10B981" variant="Bold" />
                <Text style={styles.shippingText}>
                  Shipping available (+${MOCK_LISTING.shipping.shippingCost})
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Get Notified Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.notificationCard} activeOpacity={0.8}>
            <View style={styles.notificationIcon}>
              <Notification size={24} color={theme.colors.primary.start} variant="Bold" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Get notified about similar items</Text>
              <Text style={styles.notificationSubtitle}>We'll let you know when new listings match your interests</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionDivider} />

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => setIsSaved(!isSaved)}
              activeOpacity={0.7}
            >
              <Save2 
                size={24} 
                color={isSaved ? theme.colors.primary.start : theme.colors.text.secondary} 
                variant={isSaved ? 'Bold' : 'Outline'}
              />
              <Text style={styles.quickActionText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} activeOpacity={0.7}>
              <Warning2 size={24} color={theme.colors.text.secondary} variant="Outline" />
              <Text style={styles.quickActionText}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => setShowShareSheet(true)}
              activeOpacity={0.7}
            >
              <ShareIcon size={24} color={theme.colors.text.secondary} />
              <Text style={styles.quickActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding for sticky buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <SafeAreaView edges={['bottom']} style={styles.bottomActions}>
        {/* Show Call button if phone number is available, otherwise show Chat */}
        {MOCK_LISTING.seller.phoneNumber ? (
          <TouchableOpacity style={styles.messageButton} activeOpacity={0.8}>
            <Call size={20} color={theme.colors.primary.start} variant="Bold" />
            <Text style={styles.messageButtonText}>Call</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.messageButton} 
            activeOpacity={0.8}
            onPress={onOpenChat}
          >
            <Sms size={20} color={theme.colors.primary.start} variant="Bold" />
            <Text style={styles.messageButtonText}>Chat</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.offerButton} 
          activeOpacity={0.8}
          onPress={onOpenChat}
        >
          <LinearGradient
            colors={theme.colors.primary.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.offerButtonGradient}
          >
            <DollarCircle size={20} color={theme.colors.text.white} variant="Bold" />
            <Text style={styles.offerButtonText}>Make Offer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Image Lightbox */}
      <ImageView
        images={imageViewerImages}
        imageIndex={currentImageIndex}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
      />

      {/* Share Bottom Sheet */}
      <ShareBottomSheet
        visible={showShareSheet}
        onClose={() => setShowShareSheet(false)}
        listingUrl={`https://nabsta.com/listing/${MOCK_LISTING.id}`}
        listingTitle={MOCK_LISTING.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  floatingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  imageGallery: {
    height: 400,
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  image: {
    width: width,
    height: 400,
    resizeMode: 'cover',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    backgroundColor: theme.colors.text.white,
    width: 24,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  price: {
    fontSize: 32,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.start,
  },
  negotiableBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: '#000000',
    borderRadius: theme.borderRadius.md,
  },
  negotiableText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#FFFFFF',
  },
  titleSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  rating: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  infoSeparator: {
    width: 1,
    height: 16,
    backgroundColor: theme.colors.ui.border,
    marginHorizontal: theme.spacing.md,
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  card: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  detailLabel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
  },
  detailValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  conditionBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: '#DBEAFE',
    borderRadius: theme.borderRadius.sm,
  },
  conditionText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#1E40AF',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },
  readMoreButton: {
    marginTop: theme.spacing.sm,
  },
  readMoreText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.start,
  },
  sellerCard: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
  },
  sellerInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  sellerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  sellerName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  sellerRatingText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  memberSinceText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  shippingOptions: {
    gap: theme.spacing.sm,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  shippingText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  // Business Info Styles
  businessCard: {
    padding: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
  },
  businessName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  businessWebsite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  websiteText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.start,
    textDecorationLine: 'underline',
  },
  hoursToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  hoursToggleText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  hoursContainer: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  dayText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    width: 100,
  },
  hoursText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  // Notification Card Styles
  notificationCard: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: '#F0F9FF',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  notificationSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },
  // Quick Actions Styles
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.sm,
  },
  quickActionButton: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  quickActionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
    gap: theme.spacing.md,
    ...theme.shadows.lg,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    backgroundColor: '#EFF6FF',
    borderRadius: theme.borderRadius.xl,
    gap: theme.spacing.xs,
  },
  messageButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.start,
  },
  offerButton: {
    flex: 1,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  offerButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  offerButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
});
