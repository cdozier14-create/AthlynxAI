import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

// Mock highlight data
const MOCK_HIGHLIGHTS: { id: number; title: string; views: number; date: string; thumbnail: string | null }[] = [
  { id: 1, title: "Game Winning TD", views: 1247, date: "Dec 15", thumbnail: null },
  { id: 2, title: "4.52 40-Yard Dash", views: 892, date: "Dec 10", thumbnail: null },
  { id: 3, title: "Highlight Reel 2024", views: 3421, date: "Nov 28", thumbnail: null },
];

export default function HighlightsScreen() {
  const insets = useSafeAreaInsets();
  const [highlights, setHighlights] = useState(MOCK_HIGHLIGHTS);
  const [uploading, setUploading] = useState(false);

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setUploading(true);
        // Simulate upload
        setTimeout(() => {
          const newHighlight = {
            id: highlights.length + 1,
            title: "New Highlight",
            views: 0,
            date: "Just now",
            thumbnail: result.assets[0].uri,
          };
          setHighlights([newHighlight, ...highlights]);
          setUploading(false);
        }, 2000);
      }
    } catch (e) {
      console.log("Error picking video:", e);
    }
  };

  const getTotalViews = () => highlights.reduce((sum, h) => sum + h.views, 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 Highlights</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickVideo}>
          <Text style={styles.uploadButtonText}>+ Upload</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{highlights.length}</Text>
            <Text style={styles.statLabel}>Highlights</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{getTotalViews().toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Views</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Shares</Text>
          </View>
        </View>

        {/* Upload CTA */}
        {uploading ? (
          <View style={styles.uploadingCard}>
            <Text style={styles.uploadingText}>⏳ Uploading your highlight...</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadCTA} onPress={pickVideo}>
            <Text style={styles.uploadCTAIcon}>📹</Text>
            <Text style={styles.uploadCTATitle}>Upload New Highlight</Text>
            <Text style={styles.uploadCTASubtitle}>
              Upload game film and we'll help you create coach-ready highlights
            </Text>
          </TouchableOpacity>
        )}

        {/* AI Highlight Creator */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <Text style={styles.aiIcon}>🤖</Text>
            <Text style={styles.aiTitle}>AI Highlight Creator</Text>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>COMING SOON</Text>
            </View>
          </View>
          <Text style={styles.aiDescription}>
            Upload raw game film and our AI will automatically find YOUR plays and create a 60-second highlight reel in minutes!
          </Text>
        </View>

        {/* Highlights Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Highlights</Text>
          
          {highlights.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎥</Text>
              <Text style={styles.emptyTitle}>No highlights yet</Text>
              <Text style={styles.emptySubtitle}>Upload your first highlight to get noticed by coaches!</Text>
            </View>
          ) : (
            <View style={styles.highlightsGrid}>
              {highlights.map((highlight) => (
                <TouchableOpacity key={highlight.id} style={styles.highlightCard}>
                  <View style={styles.thumbnailContainer}>
                    {highlight.thumbnail ? (
                      <Image source={{ uri: highlight.thumbnail }} style={styles.thumbnail} />
                    ) : (
                      <View style={styles.thumbnailPlaceholder}>
                        <Text style={styles.thumbnailIcon}>▶️</Text>
                      </View>
                    )}
                    <View style={styles.viewsBadge}>
                      <Text style={styles.viewsText}>👁 {highlight.views}</Text>
                    </View>
                  </View>
                  <Text style={styles.highlightTitle} numberOfLines={1}>{highlight.title}</Text>
                  <Text style={styles.highlightDate}>{highlight.date}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Share Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share Your Highlights</Text>
          <View style={styles.shareOptions}>
            <TouchableOpacity style={styles.shareOption}>
              <Text style={styles.shareIcon}>📧</Text>
              <Text style={styles.shareLabel}>Email to Coach</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareOption}>
              <Text style={styles.shareIcon}>📱</Text>
              <Text style={styles.shareLabel}>Social Media</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareOption}>
              <Text style={styles.shareIcon}>🔗</Text>
              <Text style={styles.shareLabel}>Copy Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareOption}>
              <Text style={styles.shareIcon}>📄</Text>
              <Text style={styles.shareLabel}>Export PDF</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Highlight Tips for Diamonds</Text>
          <Text style={styles.tipItem}>• Keep highlights under 3 minutes</Text>
          <Text style={styles.tipItem}>• Put your best plays first (coaches are busy)</Text>
          <Text style={styles.tipItem}>• Include your name, position, and contact info</Text>
          <Text style={styles.tipItem}>• Show variety - not just one type of play</Text>
          <Text style={styles.tipItem}>• Update regularly with new footage</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a2e",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  uploadButton: {
    backgroundColor: "#00d4ff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  uploadButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00d4ff",
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
  uploadingCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    alignItems: "center",
  },
  uploadingText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#0a0a1a",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#00d4ff",
  },
  uploadCTA: {
    backgroundColor: "#0d2137",
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00d4ff55",
    borderStyle: "dashed",
  },
  uploadCTAIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  uploadCTATitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  uploadCTASubtitle: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
  },
  aiCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ffd70055",
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  aiIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  aiTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  aiBadge: {
    backgroundColor: "#ffd700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiBadgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
  aiDescription: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
  },
  highlightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  highlightCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
  },
  thumbnailContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1a1a2e",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d2137",
  },
  thumbnailIcon: {
    fontSize: 32,
  },
  viewsBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  viewsText: {
    color: "#fff",
    fontSize: 12,
  },
  highlightTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  highlightDate: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 2,
  },
  shareOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareOption: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },
  shareIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  shareLabel: {
    color: "#94a3b8",
    fontSize: 11,
    textAlign: "center",
  },
  tipsCard: {
    backgroundColor: "#22c55e15",
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#22c55e33",
  },
  tipsTitle: {
    color: "#22c55e",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tipItem: {
    color: "#22c55e",
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
});
