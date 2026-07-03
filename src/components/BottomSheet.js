import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../styles/colors';

export default function BottomSheet({ 
  visible, 
  onClose, 
  children,
  title,
  snapPoints = ['50%', '90%']
}) {
  const { height: screenHeight } = Dimensions.get('window');
  
  if (!visible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <TouchableOpacity 
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />
      
      {/* Bottom sheet */}
      <View style={[styles.bottomSheet, { maxHeight: screenHeight * 0.9 }]}>
        {/* Handle bar */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        
        {/* Title */}
        {title && <Text style={styles.title}>{title}</Text>}
        
        {/* Content with scroll support */}
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    zIndex: 998
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.bg.elevated,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    zIndex: 999,
    maxHeight: Dimensions.get('window').height * 0.9
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20
  }
});
