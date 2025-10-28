/**
 * AccountScreen
 * User account and settings
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft2,
  DollarCircle,
  Card,
  Heart,
  Home3,
  Notification,
  Setting2,
  Profile,
  Link,
  ArrowUp,
  Setting4,
  ShieldTick,
  InfoCircle,
  Star1,
  Camera,
  Sms,
  Call,
  TickCircle,
  Facebook,
  Location,
  MessageText,
  Wallet,
  Receipt,
  Shop,
  Gift,
  Chart,
  DocumentText,
  Lock,
  Eye,
  Logout,
  Moon,
  Global,
  People,
} from 'iconsax-react-native';
import { theme } from '../../theme';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, subtitle, onPress, showArrow = false }) => {
  return (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && (
        <ArrowLeft2 
          size={20} 
          color={theme.colors.text.secondary} 
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      )}
    </TouchableOpacity>
  );
};

export const AccountScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Account</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile & Stats Card */}
        <View style={styles.profileStatsCard}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Profile size={40} color={theme.colors.text.white} variant="Bold" />
              </View>
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={16} color={theme.colors.text.white} variant="Bold" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Black Panther</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star1 key={star} size={14} color="#D1D5DB" variant="Bold" />
                ))}
                <Text style={styles.ratingText}>(0)</Text>
              </View>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            {/* Followers Row */}
            <View style={styles.statsRow}>
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </TouchableOpacity>
              <View style={styles.statDivider} />
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Following</Text>
              </TouchableOpacity>
            </View>

            {/* Horizontal Separator */}
            <View style={styles.statsHorizontalDivider} />

            {/* Activity Row */}
            <View style={styles.statsRow}>
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Selling</Text>
              </TouchableOpacity>
              <View style={styles.statDivider} />
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Sold</Text>
              </TouchableOpacity>
              <View style={styles.statDivider} />
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>Bought</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Premium Banner */}
        <TouchableOpacity style={styles.premiumBanner}>
          <View style={styles.premiumLeft}>
            <View style={styles.premiumIcon}>
              <Star1 size={20} color="#8B5CF6" variant="Bold" />
            </View>
            <Text style={styles.premiumText}>Enjoy Premium benefits for FREE</Text>
          </View>
          <ArrowLeft2 
            size={20} 
            color={theme.colors.text.primary} 
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>

        {/* Verification Section */}
        <Text style={styles.sectionTitle}>Verify your account to build reputation</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<Sms size={24} color={theme.colors.text.primary} />}
            title="Verify Email"
            onPress={() => console.log('Verify Email')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Camera size={24} color={theme.colors.text.primary} />}
            title="Add Image"
            onPress={() => console.log('Add Image')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Call size={24} color={theme.colors.text.primary} />}
            title="Verify Phone"
            onPress={() => console.log('Verify Phone')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<TickCircle size={24} color={theme.colors.text.primary} />}
            title="Join TruYou"
            onPress={() => console.log('Join TruYou')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Facebook size={24} color="#1877F2" />}
            title="Connect Facebook"
            onPress={() => console.log('Connect Facebook')}
          />
        </View>
        <TouchableOpacity style={styles.learnMoreContainer}>
          <Text style={styles.learnMoreText}>Learn how reputation improves your profile</Text>
        </TouchableOpacity>

        {/* My Activity Section */}
        <Text style={styles.sectionTitle}>My Activity</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<Shop size={24} color={theme.colors.text.primary} />}
            title="My listings"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<DollarCircle size={24} color={theme.colors.text.primary} />}
            title="Purchases"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Receipt size={24} color={theme.colors.text.primary} />}
            title="Sales"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<MessageText size={24} color={theme.colors.text.primary} />}
            title="Messages"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Chart size={24} color={theme.colors.text.primary} />}
            title="My stats"
          />
        </View>

        {/* Saved & Alerts Section */}
        <Text style={styles.sectionTitle}>Saved & Alerts</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<Heart size={24} color={theme.colors.text.primary} />}
            title="Saved items"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Home3 size={24} color={theme.colors.text.primary} />}
            title="Saved rentals"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Notification size={24} color={theme.colors.text.primary} />}
            title="Search alerts"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<People size={24} color={theme.colors.text.primary} />}
            title="Following"
          />
        </View>

        {/* Payments & Wallet Section */}
        <Text style={styles.sectionTitle}>Payments & Wallet</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<Wallet size={24} color={theme.colors.text.primary} />}
            title="My wallet"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Card size={24} color={theme.colors.text.primary} />}
            title="Payment methods"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Receipt size={24} color={theme.colors.text.primary} />}
            title="Transaction history"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Gift size={24} color={theme.colors.text.primary} />}
            title="Credits & coupons"
          />
        </View>

        {/* Profile & Settings Section */}
        <Text style={styles.sectionTitle}>Profile & Settings</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<Profile size={24} color={theme.colors.text.primary} />}
            title="Edit profile"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Link size={24} color={theme.colors.text.primary} />}
            title="Custom profile link"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Location size={24} color={theme.colors.text.primary} />}
            title="Location"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Notification size={24} color={theme.colors.text.primary} />}
            title="Notifications"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Global size={24} color={theme.colors.text.primary} />}
            title="Language & region"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Moon size={24} color={theme.colors.text.primary} />}
            title="Appearance"
          />
        </View>

        {/* Privacy & Security Section */}
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<Lock size={24} color={theme.colors.text.primary} />}
            title="Privacy settings"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Eye size={24} color={theme.colors.text.primary} />}
            title="Who can see my profile"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<ShieldTick size={24} color={theme.colors.text.primary} />}
            title="Security"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<People size={24} color={theme.colors.text.primary} />}
            title="Blocked users"
          />
        </View>

        {/* Business Tools Section */}
        <Text style={styles.sectionTitle}>Business Tools</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<Star1 size={24} color="#8B5CF6" />}
            title="NABSTA Premium"
            subtitle="Try for FREE"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<ArrowUp size={24} color={theme.colors.text.primary} />}
            title="Promote listings"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Setting4 size={24} color={theme.colors.text.primary} />}
            title="Services posting"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<Chart size={24} color={theme.colors.text.primary} />}
            title="Business insights"
          />
        </View>

        {/* Support & Legal Section */}
        <Text style={styles.sectionTitle}>Support & Legal</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<InfoCircle size={24} color={theme.colors.text.primary} />}
            title="Help center"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<MessageText size={24} color={theme.colors.text.primary} />}
            title="Contact support"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<ShieldTick size={24} color={theme.colors.text.primary} />}
            title="Report a problem"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<DocumentText size={24} color={theme.colors.text.primary} />}
            title="Terms & Policies"
          />
          <View style={styles.separator} />
          <MenuItem
            icon={<InfoCircle size={24} color={theme.colors.text.primary} />}
            title="About NABSTA"
          />
        </View>

        {/* Account Actions Section */}
        <Text style={styles.sectionTitle}>Account Actions</Text>
        <View style={styles.card}>
          <MenuItem
            icon={<Logout size={24} color="#EF4444" />}
            title="Log out"
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background
  },
  gradientHeader: {
    // Gradient stops at header bottom
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  content: {
    flex: 1,
  },
  // Profile & Stats Card
  profileStatsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
  },
  // Profile Section
  profileSection: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#60A5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  ratingText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
  },
  // Stats Section
  statsSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statsHorizontalDivider: {
    height: 1,
    backgroundColor: theme.colors.ui.border,
    marginVertical: theme.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  statNumber: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.ui.border,
    marginVertical: theme.spacing.xs,
  },
  // Premium Banner
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
  },
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  premiumIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  // Learn More
  learnMoreContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  learnMoreText: {
    fontSize: theme.typography.fontSize.sm,
    color: '#10B981',
    fontWeight: theme.typography.fontWeight.semibold,
    textAlign: 'center',
  },
  // Section Title
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  // Card
  card: {
    backgroundColor: '#FFFFFF', // Pure white for cards
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: '#FFFFFF',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  menuItemSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: '#8B5CF6',
    fontWeight: theme.typography.fontWeight.semibold,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.ui.border,
    marginLeft: theme.spacing.md + 24 + theme.spacing.md, // Icon width + margins
  },
  bottomSpacing: {
    height: 100,
  },
});
