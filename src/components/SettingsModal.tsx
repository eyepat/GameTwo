import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n, {supportedLngs} from '../i18n/i18n';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const labels: Record<string, string> = {
  en: 'English',
  es: 'Español',
  sv: 'Svenska',
};

const flags: Record<string, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  sv: '🇸🇪',
};

export default function SettingsModal({visible, onClose}: Props) {
  const {t} = useTranslation();
  const current = (i18n.language || 'en').split('-')[0];
  const [open, setOpen] = useState(false);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{t('settings')}</Text>
          <Text style={styles.section}>{t('selectLanguage')}</Text>
          <View>
            <TouchableOpacity style={styles.select} onPress={() => setOpen(o => !o)}>
              <Text style={styles.flagOnly}>{flags[current] ?? '🏳️'}</Text>
              <Text style={styles.chevron}>▾</Text>
            </TouchableOpacity>
            {open ? (
              <View style={styles.dropdown}>
                {supportedLngs.map(code => (
                  <TouchableOpacity
                    key={code}
                    style={styles.option}
                    onPress={() => {
                      i18n.changeLanguage(code);
                      setOpen(false);
                    }}>
                    <Text style={styles.optionFlag}>{flags[code] ?? '🏳️'}</Text>
                    <Text style={styles.optionLabel}>{labels[code] ?? code.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
          <View style={{height: 12}} />
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>{t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  title: {fontSize: 18, fontWeight: '700'},
  section: {marginTop: 8, marginBottom: 4, fontWeight: '600'},
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  flagOnly: {fontSize: 22},
  chevron: {fontSize: 16, color: '#555'},
  dropdown: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  optionFlag: {fontSize: 18, marginRight: 8},
  optionLabel: {fontSize: 16},
  closeBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  closeText: {fontWeight: '600'},
});
