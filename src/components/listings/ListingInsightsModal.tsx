/**
 * ListingInsightsModal
 * Shows performance metrics and insights for a listing
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Eye,
  Heart,
  MessageText1,
  TrendUp,
  Clock,
  People,
  Chart,
} from 'iconsax-react-native';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

interface ListingInsightsModalProps {
  visible: boolean;
  onClose: () => void;
  listing: {
    title: string;
    views: number;
    saves: number;
    messages: number;
    postedDate: string;
  };
}

export const ListingInsightsModal: React.FC<ListingInsightsModalProps> = ({
  visible,
  onClose,
  listing,
}) => {
  // Mock data for charts and insights
  const viewsData = [12, 18, 15, 24, 30, 28, 35];
  const maxViews = Math.max(...viewsData);
  
  // Calculate metrics
  const conversionRate = ((listing.messages / listing.views) * 100).toFixed(1);
  const saveRate = ((listing.saves / listing.views) * 100).toFixed(1);
  const avgResponseTime = '2.5 hours';
  const uniqueViewers = Math.floor(listing.views * 0.75); // 75% unique

  // Performance tips based on metrics
  const tips = [];
  if (listing.views < 50) {
    tips.push({
      icon: '📸',
      text: 'Add more photos to increase visibility',
    });
  }
  if (parseFloat(conversionRate) < 5) {
    tips.push({
      icon: '💰',
      text: 'Consider lowering price by 10% to boost interest',
    });
  }
  if (listing.saves > 5 && listing.messages < 3) {
    tips.push({
      icon: '✍️',
      text: 'Update description with more details',
    });
  }
  if (tips.length === 0) {
    tips.push({
      icon: '🎉',
      text: 'Great job! Your listing is performing well',
    });
  }

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    subtitle,
    color,
  }: {
    icon: any;
    label: string;
    value: string | number;
    subtitle?: string;
    color: string;
  }) => (
    <View style={styles.metricCard}>
      <View style={[styles.metricIconContainer, { backgroundColor: color + '20' }]}>
        <Icon size={24} color={color} variant="Bold" />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.handle} />
            <Text style={styles.title}>Listing Performance</Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {listing.title}
            </Text>
          </View>

          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Main Metrics */}
            <View style={styles.metricsGrid}>
              <MetricCard
                icon={Eye}
                label="Total Views"
                value={listing.views}
                color="#3B82F6"
              />
              <MetricCard
                icon={Heart}
                label="Saves"
                value={listing.saves}
                subtitle={`${saveRate}% save rate`}
                color="#EF4444"
              />
              <MetricCard
                icon={MessageText1}
                label="Messages"
                value={listing.messages}
                subtitle={`${conversionRate}% conversion`}
                color="#10B981"
              />
              <MetricCard
                icon={People}
                label="Unique Viewers"
                value={uniqueViewers}
                color="#F59E0B"
              />
            </View>

            {/* Views Over Time Chart */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Chart size={20} color={theme.colors.text.primary} variant="Bold" />
                <Text style={styles.sectionTitle}>Views Over Time</Text>
              </View>
              <View style={styles.chartContainer}>
                <View style={styles.chart}>
                  {viewsData.map((views, index) => {
                    const height = (views / maxViews) * 100;
                    return (
                      <View key={index} style={styles.barContainer}>
                        <View style={styles.barWrapper}>
                          <LinearGradient
                            colors={theme.colors.primary.gradient}
                            style={[styles.bar, { height: `${height}%` }]}
                          />
                        </View>
                        <Text style={styles.barLabel}>
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <Text style={styles.chartHint}>
                  Peak views on {viewsData.indexOf(maxViews) === 0 ? 'Monday' : 
                    viewsData.indexOf(maxViews) === 1 ? 'Tuesday' :
                    viewsData.indexOf(maxViews) === 2 ? 'Wednesday' :
                    viewsData.indexOf(maxViews) === 3 ? 'Thursday' :
                    viewsData.indexOf(maxViews) === 4 ? 'Friday' :
                    viewsData.indexOf(maxViews) === 5 ? 'Saturday' : 'Sunday'}
                </Text>
              </View>
            </View>

            {/* Additional Stats */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendUp size={20} color={theme.colors.text.primary} variant="Bold" />
                <Text style={styles.sectionTitle}>Additional Stats</Text>
              </View>
              <View style={styles.statsList}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Conversion Rate</Text>
                  <Text style={styles.statValue}>{conversionRate}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Save Rate</Text>
                  <Text style={styles.statValue}>{saveRate}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Avg Response Time</Text>
                  <Text style={styles.statValue}>{avgResponseTime}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Posted</Text>
                  <Text style={styles.statValue}>{listing.postedDate}</Text>
                </View>
              </View>
            </View>

            {/* Tips to Improve */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={20} color={theme.colors.text.primary} variant="Bold" />
                <Text style={styles.sectionTitle}>Tips to Improve</Text>
              </View>
              <View style={styles.tipsList}>
                {tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Text style={styles.tipIcon}>{tip.icon}</Text>
                    <Text style={styles.tipText}>{tip.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    maxHeight: '90%',
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.ui.border,
    borderRadius: 2,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  metricCard: {
    width: (width - theme.spacing.md * 2 - theme.spacing.sm) / 2,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  metricValue: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  metricSubtitle: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
  },
  chartContainer: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: theme.spacing.sm,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    width: '80%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    marginTop: 4,
  },
  chartHint: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  statsList: {
    gap: theme.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
  },
  statValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  tipsList: {
    gap: theme.spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    lineHeight: 20,
  },
  closeButton: {
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary.start,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  closeText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
});
