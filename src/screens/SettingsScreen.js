import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { useStore } from '../store';
import { storage } from '../utils/storage';
import { generateQRData } from '../utils/qrSync';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Card, CardHeader, CardContent } from '../components/Card';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import QRCode from 'react-native-qrcode-svg';

export default function SettingsScreen() {
  const { settings, updateSettings, hydrateState } = useStore();
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState('');
  const [pyqTarget, setPyqTarget] = useState(String(settings.dailyPYQTarget || 20));

  const handleExport = async () => {
    try {
      const data = await storage.exportAll();
      if (!data) { Alert.alert('Error', 'Could not export data'); return; }
      await Share.share({
        message: data,
        title: `gate_backup_${new Date().toISOString().split('T')[0]}.json`,
      });
    } catch (error) {
      Alert.alert('Export failed', error.message);
    }
  };

  const handleQR = async () => {
    const data = await generateQRData();
    if (!data) { Alert.alert('Error', 'Could not generate QR data'); return; }
    if (data.length > 2953) {
      Alert.alert('Data too large', 'Your data is too large for a single QR code. Use Export instead.');
      return;
    }
    setQrData(data);
    setShowQR(true);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset All Data',
      'This will permanently delete ALL your tasks, PYQs, formulas, and other data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Everything',
          style: 'destructive',
          onPress: async () => {
            await storage.resetAll();
            hydrateState({
              tasks: [], pyqLogs: [], mocks: [], formulas: [], errors: [],
              weeklyReviews: [], mastery: [], priorityBoard: [], reminders: [],
              milestones: [], notes: [],
            });
          },
        },
      ]
    );
  };

  const savePYQTarget = () => {
    updateSettings({ dailyPYQTarget: parseInt(pyqTarget) || 20 });
    Alert.alert('Saved', 'Daily PYQ target updated!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Target */}
      <Card style={styles.section}>
        <CardHeader><Text style={styles.sectionTitle}>🎯 Study Targets</Text></CardHeader>
        <CardContent>
          <Input
            label="Daily PYQ Target"
            value={pyqTarget}
            onChangeText={setPyqTarget}
            keyboardType="numeric"
          />
          <Button title="Save Target" onPress={savePYQTarget} variant="outline" size="sm" />
        </CardContent>
      </Card>

      {/* Backup */}
      <Card style={styles.section}>
        <CardHeader><Text style={styles.sectionTitle}>💾 Data & Backup</Text></CardHeader>
        <CardContent>
          <SettingRow
            icon="📤"
            title="Export as JSON"
            description="Share your data as a JSON file"
            onPress={handleExport}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="🔲"
            title="Generate QR Code"
            description="Sync with Ubuntu app via QR scan"
            onPress={handleQR}
          />
        </CardContent>
      </Card>

      {/* App Info */}
      <Card style={styles.section}>
        <CardHeader><Text style={styles.sectionTitle}>ℹ️ App Info</Text></CardHeader>
        <CardContent>
          <InfoRow label="Version" value="1.0.0" />
          <InfoRow label="Target" value="GATE EC 2027" />
          <InfoRow label="GATE Date" value="February 14, 2027" />
          <InfoRow label="Storage" value="AsyncStorage (Offline)" />
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card style={[styles.section, styles.dangerCard]}>
        <CardHeader><Text style={[styles.sectionTitle, { color: COLORS.accent.danger }]}>⚠️ Danger Zone</Text></CardHeader>
        <CardContent>
          <SettingRow
            icon="🗑️"
            title="Reset All Data"
            description="Permanently delete all data"
            onPress={handleReset}
            danger
          />
        </CardContent>
      </Card>

      {/* QR Modal */}
      <Modal visible={showQR} onClose={() => setShowQR(false)} title="Sync with Ubuntu" scrollable={false}>
        <View style={styles.qrContainer}>
          <Text style={styles.qrSubtext}>Show this QR code to your Ubuntu app to import data</Text>
          {qrData ? (
            <View style={styles.qrBox}>
              <QRCode value={qrData} size={220} color={COLORS.text.primary} backgroundColor={COLORS.bg.secondary} />
            </View>
          ) : null}
          <Text style={styles.qrNote}>QR code contains your exported data</Text>
          <Button title="Close" onPress={() => setShowQR(false)} variant="outline" style={{ marginTop: SPACING.base }} />
        </View>
      </Modal>
    </ScrollView>
  );
}

function SettingRow({ icon, title, description, onPress, danger }) {
  return (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.75}>
      <Text style={styles.settingIcon}>{icon}</Text>
      <View style={styles.settingBody}>
        <Text style={[styles.settingTitle, danger && { color: COLORS.accent.danger }]}>{title}</Text>
        <Text style={styles.settingDesc}>{description}</Text>
      </View>
      <Text style={styles.settingChevron}>›</Text>
    </TouchableOpacity>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  content: { padding: SPACING.base, paddingBottom: 120 },
  section: { marginBottom: SPACING.base },
  dangerCard: { borderColor: `${COLORS.accent.danger}30` },
  sectionTitle: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md, gap: SPACING.md },
  settingIcon: { fontSize: 20, width: 28 },
  settingBody: { flex: 1 },
  settingTitle: { fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.text.primary },
  settingDesc: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, marginTop: 2 },
  settingChevron: { fontSize: TYPOGRAPHY.sizes.xl, color: COLORS.text.muted },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.xs },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.sm },
  infoLabel: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary },
  infoValue: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.medium },
  qrContainer: { alignItems: 'center', paddingBottom: SPACING.base },
  qrSubtext: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, textAlign: 'center', marginBottom: SPACING.lg },
  qrBox: { backgroundColor: COLORS.bg.secondary, padding: SPACING.lg, borderRadius: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  qrNote: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, textAlign: 'center', marginTop: SPACING.md },
});
